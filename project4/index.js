const express = require('express');
const { userRoutes } = require('./routes/userRoute')
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const { dataRoutes } = require('./routes/dataRoute');
const { notesRoutes } = require('./routes/notesRoute');

dotenv.config();

const app = express()

app.use(express.json())
app.use(cookieParser());
app.use("/user", userRoutes);
app.use("/data", dataRoutes);
app.use("/notes", notesRoutes);


app.listen(3000, () => {
    console.log(`Server is running on port: 3000`)
});