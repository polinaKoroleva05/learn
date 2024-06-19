var express = require('express');
var router = express.Router();

const urlencodedParser = express.urlencoded({ extended: false });

router.get('/', (req, res, next) => {
    const base = require("./base.json");
    if (req.headers['sec-fetch-mode'] === 'cors') {
        let baseArray = Object.entries(base);
        switch (req.query.sort) {
            case 'ishere':
                baseArray = baseArray.filter(item => item[1].ishere);
                break;
            case 'until':
                baseArray = baseArray.filter(item => !item[1].ishere);
                baseArray.sort(comp);
                break;
        }
        res.json(baseArray);
    }
    else {
        res.render('index', { books: base });
    }
});

router.get('/book/:id', (req, res, next) => { //http://localhost:3000/book/1
    const id = req.params.id;
    const base = require("./base.json");
    res.charset = 'utf-8';
    res.render('book', base[id]);
});

router.get('/book', (req, res) => {
    res.render('newBook');
})


router.get('/book/:id/edit', (req, res) => {
    const id = req.params.id;
    const base = require("./base.json");
    res.render('edit', base[id]);
})

router.post('/book', urlencodedParser,(req, res) => {
    let base = require("./base.json");
    const id = writeInBase(base, req.body);
    save(base);
    res.redirect('/book/' + id);
})

router.post('/book/:id/edit', urlencodedParser, (req, res) => {
    const id = req.params.id;
    const base = require("./base.json");
    writeInBase(base, req.body, id);
    save(base);
    res.redirect('/book/' + id);
})

router.delete('/book/:id', (req, res) => {
    console.log("delete book started");
    const id = req.params.id;
    const base = require("./base.json");
    delete base[id];
    save(base);
    //req.method = 'GET';
    res.sendStatus(200);
})
function writeInBase(base, newBook, id = '') {
    let number = 0;
    if (!id) {
        for (i in base) {
            if (number <= +i) {
                number = +i + 1;
            }
        }
    }
    let newid = id ? id : '' + number;
    base[newid] = {};
    base[newid].title = newBook.title ?? "";
    base[newid].author = newBook.author ?? "";
    base[newid].year = newBook.year ?? "";
    base[newid].ishere = newBook.ishere ? true : false;
    base[newid].reader = newBook.reader ?? "";
    base[newid].until = newBook.until ?? "";
    return newid;
}

function save(base) {
    const fs = require("fs");
    fs.writeFileSync('./routes/base.json', JSON.stringify(base), (err) => {
        if (err) throw err;
    });
}

function comp(a, b) {
    let date1 = new Date(a[1].until);
    let date2 = new Date(b[1].until);
    if (date1 > date2) {
        return 1;
    }
    if (date1 < date2) {
        return -1;
    }
    return 0;
}
//app.get('/', (req, res) => {
//    res.send('<h1>Hey<h1>')
//    //res.sendFile(path.resolve(__dirname, 'routes', 'index.html'))
//})



module.exports = router;