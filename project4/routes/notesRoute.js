const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { noteSchema } = require('../validator/notesValidator');
const { verifyToken } = require('../middleWares/verifyToken');

const notesRoutes = express.Router();
const prisma = new PrismaClient();


notesRoutes.get("/", verifyToken, async (req, res) => {
    try {
        const data = await prisma.notes.findMany({
            where: {
                authorId: req.userId
            }
        });
        res.status(200).json({ "Notes": data });
    } catch (err) {
        console.log("error from notesroutes get");
        res.status(500).json({ "message": "There was a server side error" })
    }
})

notesRoutes.get("/:id", verifyToken, async (req, res) => {
    try {
        const data = await prisma.notes.findMany({
            where: {
                id: parseInt(req.params.id),
                authorId: req.userId
            }
        });

        if (data.length == 0) {
            return res.status(404).json({ "message": "The note is not found" });
        }
        res.status(200).json({ "Notes": data[0] });
    } catch (err) {
        console.log("error from notesroutes get id");
        res.status(500).json({ "message": "There was a server side error" })
    }
})

notesRoutes.post("/", verifyToken, async (req, res) => {
    try {
        newNote = noteSchema.parse(req.body);
        console.log(newNote);
        const savedNote = await prisma.notes.create({
            data: {
                title: newNote.title,
                body: newNote.body,
                authorId: req.userId
            }
        });
        res.status(200).json({ "message": "Note created successfully", "note": savedNote })
    } catch (err) {
        console.log("error from notesroutes post");
        res.status(500).json({ "message": "There was a server side error" })
    }
})

notesRoutes.put("/:id", verifyToken, async (req, res) => {
    try {
        newNote = noteSchema.parse(req.body);
        const savedNote = await prisma.notes.update({
            where: {
                id: parseInt(req.params.id),
                authorId: req.userId
            },
            data: {
                title: newNote.title,
                body: newNote.body,
            }
        });
        res.status(200).json({ "message": "Note updated successfully", "note": savedNote })
    } catch (err) {
        console.log("error from notesroutes put");
        res.status(500).json({ "message": "There was a server side error" })
    }
});

notesRoutes.delete("/:id", verifyToken, async (req, res) => {
    try {
        const deletedNote = await prisma.notes.delete({
            where: {
                id: parseInt(req.params.id),
                authorId: req.userId
            }
        });

        if (!deletedNote) {
            return res.status(404).json({ "message": "The note to delete was not found" });
        }

        res.status(200).json({ "message": "Note deleted successfully", "note": deletedNote });
    } catch (err) {
        console.log("error from notesroutes delete");
        res.status(500).json({ "message": "There was a server side error" });
    }
});



module.exports = { notesRoutes };