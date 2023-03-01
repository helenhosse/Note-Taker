const express = require ('express');
const fs = require('fs');
const path = requrie('path');
const JSON_PATH = "./Note-Taker/Develop/db/db.json";
const cuid = require('cuid');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

dbLocation = path.join(__dirname, 'db/db.json');

let notesArray = [];

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'Develop/public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'Develop/public/notes.html')));


// this is the function that will read the db file and give us the saved notes into JSON format
app.get('/api/notes', (req, res) => {
    fs.readFile(dbLocation, function read(err, data) {
        if (err) {
            throw err;
        }
        notesArray = JSON.parse(data);
        res.json(notesArray);

    });
    });

// this function will allow us to save a new note on to the server

app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    let id = cuid();
    newNote.id = id;

    fs.readFile(dbLocation, function read(err, data) {
        if (err) {
            throw err;
        }

        notesArray = JSON.parse(data);
        notesArray = [...notesArray, newNote];

        fs.writeFile(dbLocation, JSON.stringify(notesArray), (err) => {
            if (err) throw err;

            console.log('This note has been saved to db file.');
            res.json(notesArray);
        });
    });
});

//this function will be able to modify the note 
app.patch('/api/notes', (req, res) => {
    const newNote = req.body;

    fs.readFile(dbLocation, function read(err, data) {
        if (err) {
            throw err;
        }

        notesArray = JSON.parse(data);

        for (i=0, i < notesArray.length; i++;) {
            if (notesArray[i].id === newNote.id) {
                notesArray[i].title = newNote.title;
                notesArray[i].text = newNote.text;
            }
        }

        fs.writeFile(dbLocation, JSON.stringify(notesArray), (err) => {
            if (err) throw err; 
            console.log('You have saved the modified note to the db file.');
            res.json(notesArray);
        });
    });
});

// this function will delete the notes

app.delete('/api/notes/:id', (req, res) => {
    const deleteId = req.params.id;

    fs.readFile(dbLocation, function read(err, data) {
        if (err) {
            throw err;
        }
        notesArray = JSON.parse(data);

        function checkId(record) {
            return record.id != deleteId;
        }

    newNotesArray = notesArray.filter(checkId);

    fs.writeFile(dbLocation, JSON.stringify(newNotesArray), (err) => {
        if (err) throw err;
        console.log(`Note ID: ${deleteId} has been removed and the file has been saved.`);
        res.json(newNotesArray);
    });
    });
});



require('./Develop/routes/htmlroute')(app);

app.listen(PORT, () => function() {
    console.log("App listening to PORT: " + PORT);
});