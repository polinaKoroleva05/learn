import express from 'express';
import * as fs from 'fs';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import fileUpload from 'express-fileupload';
import * as https from 'https'
import cors from 'cors';
import { Server } from 'socket.io';


const corsOptions = {
    'credentials': true,
    'origin': true,
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'allowedHeaders': 'Authorization,X-Requested-With,X-HTTP-Method-Override,Content-Type,Cache-Control,Accept,Access-Control-Allow-Origin',
};


const privateKey = fs.readFileSync(path.resolve("src/routes/example.key"), 'utf-8');
const certificate = fs.readFileSync(path.resolve("src/routes/example.csr"), 'utf-8');

const credentials = { key: privateKey, cert: certificate };

const app = express();

const httpsServer = https.createServer(credentials, app);

const io = new Server(httpsServer, { cors: corsOptions });

io.on("connection", (socket) => {
    socket.on("join", (msg) => {
        socket.name = msg.name;
        socket.join(msg.num)
        socket.num = msg.num;
        console.log("joined", msg.num);
        console.log("joined by", msg.name);
    });

    socket.on("leave", (msg) => {
        socket.leave(msg.num)
        console.log("leaved", msg.num);
        console.log("leaved by", msg.name);
    });

/*    socket.on("conn", (msg) => {
        let time = (new Date()).toLocaleTimeString();
        socket.name = msg.name;
        socket.emit("msg", { "message": `${time} Привет ${socket.name}` });
        socket.broadcast.emit("msg", { "message": `${time} Вошел ${socket.name}!` });
    });*/

    socket.on("msg", (msg) => {
        let time = (new Date()).toLocaleTimeString();
        console.log("ssend to", socket.num);
        const messageObj = { "time": time, "name": socket.name, "msg": msg.value };
        socket.emit("msg", messageObj); // Отправка "обратно"
        socket.to(socket.num).emit("msg", messageObj); 
        const msgs = JSON.parse(fs.readFileSync(path.resolve("src/routes/messages.json")), "utf8");
        msgs[socket.num].push(messageObj);
        fs.writeFileSync('src/routes/messages.json', JSON.stringify(msgs), 'utf8', (err) => {
            if (err) throw err;
        });
    });
});

httpsServer.listen(1338, () => {
    console.log('server is running');
})

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));


import { router } from './routes.js'
app.use('/', router);

app.use(logger('dev'));

app.use(cookieParser());                                //обработка куки
app.use(fileUpload());                                  //загрузка файлов на сервер
app.use(express.static("webpack/dist"));
