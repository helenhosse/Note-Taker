const express = require ('express');
const fs = require('fs');
const path = requrie('path');
const JSON_PATH = "./db/db.json"

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './public/index.html'))
});

app.get('/api/notes', function (req, res) {
    let rawdata = fs.readFileSync(JSON_PATH);
    let data = JSON.parse(rawdata);
    data = data.map((row, idx) => {
        row.id = idx + 1;
        return row;
    })

    res.json(data);
});


app.get('/api/notes', function (req, res) {
    let rawdata = fs.readFileSync(JSON_PATH);
    const data = JSON.parse(rawdata);
    data.push(req.body);

    fs.writeFileSync(JSON_PATH, JSON.stringify(data));

    res.json(req.body);
});

app.delete('/api/notes/:id', function (req, res) {
    let rawdata = fs.readFileSync(JSON_PATH);
    const data = JSON.parse(rawdata);

    const idx = req.params.id - 1;
    data.splice(idx, 1);

    fs.writeFileSync(JSON_PATH, JSON.stringify(data));

    res.json(req.body);
})


require('./Develop/routes/htmlroute')(app);

app.listen(PORT, () => function() {
    console.log("App listening to PORT: " + PORT);
});