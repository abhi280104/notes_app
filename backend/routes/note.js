const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Notes = require('../models/Notes');
const fetchUser = require("../middleware/fetchUser");
const { body, validationResult } = require('express-validator');

// Route to get all notes
router.get('/getallnotes', fetchUser, async (req, res) => {
    try {
        const book = await Notes.find({ user: req.user });  
        res.status(200).send(book);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred while fetching notes' });
    }
});

// Route to add a note
router.post('/addnote', fetchUser, [
    body('title').isLength({ min: 4 }).withMessage('Title must be at least 4 characters long'),
    body('description').isLength({ min: 4 }).withMessage('Description must be at least 4 characters long')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { title, description, tag } = req.body;
        const db_note = new Notes({ title, description, tag, user: req.user });  // Assuming req.user contains user object with _id
        await db_note.save();
        res.status(201).send(db_note);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred while saving the note' });
    }
});


router.put('/updatenote/:id',fetchUser,async (req,res)=>{
    try {

        const {title,description,tag}=req.body
        const newnote={}
        if(title){newnote.title=title};
        if(description){newnote.tdescription =description};
        if(tag){newnote.tag=tag};



        let note=await Notes.findById(req.params.id)
        if(!note)
        {
            return res.status(404).send("notfound")
        }

        if(note.user.toString() !== req.user)
        {
            return res.status(401).send("chalaki nahi")
        }

        note=await Notes.findByIdAndUpdate(req.params.id,{$set:newnote},{new :true})
        res.json(note)


        
        
    } catch (error) {
        
    }


    

})



router.delete('/deletenote/:id',fetchUser,async (req,res)=>{
    try {

        let note=await Notes.findById(req.params.id)
        if(!note)
        {
            return res.status(404).send("notfound")
        }

        if(note.user.toString() !== req.user)
        {
            return res.status(401).send("chalaki nahi")
        }

        note=await Notes.findByIdAndDelete(req.params.id)
        res.json("has been deleted")


        
        
    } catch (error) {
        
    }
})



module.exports = router;
