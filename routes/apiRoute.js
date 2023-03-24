const router = require('express').Router();

const saveNotesData = require('../db/saveNote');

router.get('/notes', function (req, res) {
    saveNotesData.retrieveNotes().then(notes => res.json(notes)).catch(err => res.status(500).json(err));
});

router.post('/notes', (req, res) => {
    saveNotesData.saveNote(req.body).then((note) => res.json(note)).catch(err => res.status(500).json(err));
});

router.delete('/notes/:id', function (req, res) {
    saveNotesData.deleteNote(req.params.id).then(() => res.json({ ok: true })).catch(err => res.status(500).json(err));
});

module.exports = router;