require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const databaseConnection = require('./database/db');
const authRoute = require('./routes/auth.route');
const medicineRouter = require('./routes/medicine.route');

databaseConnection();
app.use(express.json());
app.use(cors());

const PORT = process.env.SERVER_PORT || 5000;

// Routes
app.use('/api/auth',authRoute);
app.use('/api/medicine',medicineRouter);


app.listen(PORT,()=>{
    console.log(`Server Is Running On Port: ${PORT}`);
});