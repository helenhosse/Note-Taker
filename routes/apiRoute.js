const router = require('express').Router();

const saveNoteData = require('../db/saveNote');

router.get('./notes', function (req, res) {
    saveNoteData.retrieveNotes().then(notes => res.json(notes)).catch(err => res.status(500).json(err));
});

router.post('./notes', (req, res) => {
    saveNoteData.saveNote(req.body).then((note) => res.json(note)).catch(err => res.status(500).json(err));
});

router.delete('./notes/:id', function (req, res) {
    saveNoteData.deleteNote(req.params.id).then(() => res.json({ ok: true })).catch(err => res.status(500).json(err));
});

module.exports = router;