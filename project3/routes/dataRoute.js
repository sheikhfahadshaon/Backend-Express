const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { updateSchema } = require('../validator/validator');
const { verifyToken } = require('../middleWares/verifyToken');


const dataRoutes = express.Router();
const prisma = new PrismaClient();

dataRoutes.get("/", verifyToken, async (req, res) => {
    const userData = await prisma.user.findUnique({
        where: {
            id: req.userId,
        }
    });
    res.status(200).json(userData);
});

dataRoutes.put("/", verifyToken, async (req, res) => {


    try {
        const newData = updateSchema.parse(req.body);
        const { name, university, District } = newData;
        const updatedData = await prisma.user.update({
            where: {
                id: req.userId,
            },
            data: {
                name,
                university,
                District,
                updatedAt: new Date(),
            }
        });
        res.status(200).json({ message: "Updated successfully", data: updatedData });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Data is not updated" })
    }
})


module.exports = { dataRoutes };