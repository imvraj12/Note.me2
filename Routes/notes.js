const express = require('express');
const router = express.Router();
const Notes = require('../Models/Notes');
const { body, validationResult } = require('express-validator');
var fetchuser = require("../Middleware/fetchuser");

// Route 1: Get all notes of a user by GET: "/api/notes/fetchall". Login required
router.get('/fetchall', fetchuser, async (req, res) => {
    const notes = await Notes.find({user: req.user.id})
    res.json(notes)
})

// Route 2: Add new notes by using POST: "/api/notes/createnote". Login required
router.post('/createnote', fetchuser, [
    // We will add all the validations here
    // Title must not be empty
    body('title', 'Enter title').exists(),
    // Description cannot be empty
    body('description', 'Add some content').exists() ], 
    async (req, res) => {
        const {title, description, tag} = req.body;

        // If there are errors, return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Notes({
            title, description, tag, user: req.user.id
        })

        const savedNote = await note.save();
        res.json(savedNote)
})

// Route 3: Update an existing note using POST: '/api/notes/updatenote'. Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
        const {title, description, tag} = req.body;
        // Create a newNote object
        const newNote = {}
        if(title){newNote.title = title}
        if(description){newNote.description = description}
        if(tag){newNote.tag = tag}

        // Find the note to be updated
        let note = await Notes.findById(req.params.id)
        if(!note){return res.status(404).send("Note not found")}

        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not allowed");
        }

        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})
        res.json({note})
})

// Route 4: Delete a note using DELETE: '/api/notes/deletenote'. Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    // Find the note to be deletede
    let note = await Notes.findById(req.params.id)
    if(!note){return res.status(404).send("Note not found")}

    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not allowed");
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({"Success": "Note has been deleted successfully"});
})

module.exports = router;