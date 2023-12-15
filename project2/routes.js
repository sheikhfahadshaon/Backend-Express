const express = require('express')
const { PrismaClient } = require('@prisma/client')
const { UserSchema } = require('./validator.js')

const routes = express.Router()
const prisma = new PrismaClient()

// routes.get("/:id", (req, res) => {
//     ty
// }) 


routes.post("/", async (req, res) => {
    try {
        const { name, university, District } = req.body;
        console.log(UserSchema.parse({ name: name, university: university, District: District }));
        const newUser = await prisma.User.create({
            data: {
                name,
                university,
                District,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        });
        res.status(200).json(newUser);
    } catch (error) {
        res.status(400).json({ error: "Invalid data provided" });
    }
});

routes.get("/", async (req, res) => {
    try {
        const userData = await prisma.User.findMany();
        res.status(200).json(userData);
    } catch (err) {
        res.status(404).json({ error: "No user found" });
    }
})

routes.get("/:id", async (req, res) => {
    const userData = await prisma.User.findMany({
        where: { id: parseInt(req.params.id) },
    });
    if (userData.length === 0) {
        res.status(404).send("No user found");
    }
    else res.status(200).json(userData[0]);

})

routes.put("/:id", async (req, res) => {
    try {
        const { name, university, District } = req.body;
        console.log(UserSchema.parse({ name: name, university: university, District: District }));
        const updatedData = await prisma.User.update({
            where: { id: parseInt(req.params.id) },
            data: {
                name,
                university,
                District,
                updatedAt: new Date()
            }
        })
        res.status(200).send(updatedData)
    } catch (err) {
        res.status(400).json({ error: "Invalid data provided or no user found" });
    }
})

routes.delete("/:id", async (req, res) => {
    try {
        const userData = await prisma.User.delete({
            where: { id: parseInt(req.params.id) },
        });
        res.status(200).json("data delted successfully");
    } catch (err) {
        res.status(404).json({ error: "No user found" });
    }
})


module.exports = { routes };

