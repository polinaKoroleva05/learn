import express from 'express';
import path from 'path';
import * as fs from 'fs';
import multer from 'multer';

const long_storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve("public/images"));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const now_storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve("webpack/dist"));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});


const long_upload = multer({ storage: long_storage })
const now_upload = multer({ storage: now_storage })

var router = express.Router();
const PATH = path.resolve('webpack/dist');

console.log(PATH)

router.get("/", (req, res) => {
    switch (req.query.type) {
        case "friends":
            res.sendFile(`${PATH}/friends.html`);
            break;
        case "friendsNews":
            res.sendFile(`${PATH}/friendsNews.html`);
            break;
        case "theUser":
            res.sendFile(`${PATH}/theUser.html`);
            break;
        default:
            res.sendFile(`${PATH}/users.html`);
            break;
    }
})


router.get("/getData", (req, res) => {
    const base = JSON.parse(fs.readFileSync(path.resolve("src/routes/dataBase.json")), "utf8");
    let data = base;
    const id = req.query.id;
    switch (req.query.type) {
        case "friends":
            data = friendsHandler(base, id);
            break;
        case "friendsNews":
            data = friendsNewsHandler(base, id);
            break;
        case "theUser":
            data = theUserHandler(base, id);
            break;
        case "chats":
            data = chatsHandler(base, id);
            break;
        case "messages":
            const msgs = JSON.parse(fs.readFileSync(path.resolve("src/routes/messages.json")), "utf8");
            data = msgs[req.query.num];
            break;
    }
    res.json(data);
})

function UploadTwoDirect(req, res, next) {
    long_upload.single('photo')(req, res, next);
    now_upload.single('photo')(req, res, next);
}

router.post("/", UploadTwoDirect, (req, res) => {
    const id = req.query.id;
    const base = JSON.parse(fs.readFileSync(path.resolve("src/routes/dataBase.json")), "utf8");
    console.log(req.file);
    console.log(req.body);
    switch (req.query.type) {
        case "theUser":
            console.log("редактирование");
            const file = req.file ? req.file.originalname : '';
            writeInBase(base, req.body, id, file);
            break;
        case "theUserAddNews":
            console.log("добавление новости");
            writeInBaseNews(base, req.body, id);
            break;
        case "addUser":
            console.log("создание пользователя");
            createUser(base, req.body);
            break;
            

    }
    save(base);
    res.json(theUserHandler(base, id));
    //res.redirect(`/?type=theUser&id=${id}`);    //Поменяла для 4й лабы
})

router.post("/auth", (req, res) => {
    console.log(req.body);
    let result = 0;
    const base = JSON.parse(fs.readFileSync(path.resolve("src/routes/dataBase.json")), "utf8");
    let user = base.find(user => user.name === req.body.name);
    if (user) {
        if (user.password === req.body.password) {
            result = user.id;
        }
    }
    console.log(result);
    res.json({ "res": result});
})

function friendsHandler(base, id) {
    const friends = base.find(user => user.id === id).friends; //узнали список друзей пользователя
    let dataFriends = [];
    friends.forEach((name) => {
        const friend = base.find(user => user.name === name); //берем всю инфорацию о друге, добавляем в результат
        dataFriends.push(friend);
    });
    return dataFriends;
}

function friendsNewsHandler(base, id) {
    const friends = friendsHandler(base, id);
    let news = [];
    friends.forEach((friend) => {
        friend.news.forEach(note => {
            news.push({
                "name": friend.name,
                "news": note,
                "photo": friend.photo
            });
        })
    });
    return news;
}

function theUserHandler(base, id) {
    return base.find(user => user.id === id);
}

function chatsHandler(base, id) {
    const user = base.find(user => user.id === id);
    return { "user": user.name, "chats": user.chats };
}

function writeInBase(base, newData, id, file) {

    let updId = base.findIndex(user => user.id === id);

    if (newData.name[0]) base[updId].name = newData.name[0];
    if (newData.bday[0]) base[updId].birthday = newData.bday[0];
    if (newData.email[0]) base[updId].email = newData.email[0];
    base[updId].role = newData.role ? "admin" : "user";
    if (newData.status) base[updId].status = newData.status[0];
    if (newData.password) base[updId].password = newData.password[0];
    if (file) {
        base[updId].photo = file;
    };
}

function writeInBaseNews(base, news, id) {
    let updId = base.findIndex(user => user.id === id);
    if (news.note) base[updId].news.push(news.note);
}

function createUser(base, newData) {
    let number = 0;
    let updId = base.length;
    for (let user of base) {
        if (number <= +user.id) {
            number = +user.id + 1;
        }
    }
    base.push({
        "id": '' + number,
        "friends": [],
        "news": [],
        "chats": []
    });
    console.log("finded id", number);
    console.log(base.at(-1));
    console.log("Новые данные");
    console.log(newData);

    base.at(-1).name = newData.name;
    base.at(-1).birthday = newData.birthday;
    base.at(-1).email = newData.email;
    base.at(-1).role = newData.role;
    base.at(-1).status = newData.status;
    base.at(-1).password = newData.password;    
}
function save(base) {
    //console.log("before saved");
    fs.writeFileSync('src/routes/dataBase.json', JSON.stringify(base), 'utf8', (err) => {
        if (err) throw err;
    });
    //console.log("after saved");
}

export { router, theUserHandler };