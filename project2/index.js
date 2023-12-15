const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { routes } = require('./routes.js');

const prisma = new PrismaClient()
const app = express();

const PORT = 3000;

app.use(express.json());
app.use("", routes);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
});