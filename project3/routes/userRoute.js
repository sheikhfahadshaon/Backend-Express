const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { signUpSchema, loginSchema, updatePasswordSchema } = require('../validator/validator');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../middleWares/verifyToken');

const userRoutes = express.Router();
const prisma = new PrismaClient();

userRoutes.use(cookieParser());

userRoutes.post("/signup", async (req, res) => {
    try {
        const newData = signUpSchema.parse(req.body);

        const hashedPassword = await bcrypt.hash(newData.password, 10);

        const newUser = await prisma.user.create({
            data: {
                phone: newData.phone,
                password: hashedPassword,
                name: newData.name,
                university: newData.university,
                District: newData.District,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        });

        const token = jwt.sign({ id: newUser.id, phone: newUser.phone }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        //console.log(token);
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 3600000 // 1 hour in milliseconds
        });

        res.status(200).json(newUser);
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: "Invalid data" });
    }
});

userRoutes.post("/login", async (req, res) => {
    try {

        const token = req.cookies.token;

        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            const { id, phone } = decoded;
            const currentUser = await prisma.user.findMany({
                where: {
                    id,
                    phone
                }
            });
            return res.status(200).json({ message: "User is already logged in", data: currentUser[0] });
        }
        const credentials = loginSchema.parse(req.body);

        const { phone, password } = credentials;

        //verify the user
        const user = await prisma.user.findUnique({
            where: {
                phone,
            }
        });

        if (!user) {
            return res.status(401).json({ error: "Invalid Credentials" });
        }

        const passMatch = await bcrypt.compare(password, user.password)
        if (!passMatch) {
            return res.status(401).json({ error: "Invalid Credentials" });
        }

        //set token
        newToken = jwt.sign({ id: user.id, phone: user.phone }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

        //set cookie
        res.cookie('token', newToken, {
            httpOnly: true,
            maxAge: 3600 * 100,
        });

        return res.status(200).json({ message: "Login Successful", data: user });
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: "Invalid Credentials" });
    }
});

userRoutes.get("/logout", verifyToken, (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ message: "Logged out successfully" }); // Send response here
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Logout failed" });
    }
});



userRoutes.put("/change-password", verifyToken, async (req, res) => {
    try {
        const newData = updatePasswordSchema.parse(req.body);
        const userData = await prisma.user.findUnique({
            where: {
                id: req.userId,
            }
        });
        const isCorrect = await bcrypt.compare(newData.currentPassword, userData.password);
        if (!isCorrect) {
            res.send(401).json({ err: "You current password is not correct" });
        }

        const hashedPassword = await bcrypt.hash(newData.newPassword, 10);

        const updatedData = await prisma.user.update({
            where: {
                id: req.userId,
            },
            data: {
                password: hashedPassword,
                updatedAt: new Date()
            },
        });

        res.status(200).json({ message: "Password updated succesfully" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "An error has occured" });
    }
})


module.exports = { userRoutes };
