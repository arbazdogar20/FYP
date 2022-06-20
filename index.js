require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const databaseConnection = require('./database/db');
const authRoute = require('./routes/auth.route');
const productRouter = require('./routes/product.route');
const medicineRouter = require('./routes/medicine.route');
const pharmacyRouter = require('./routes/pharmacy.route');

databaseConnection();
app.use(express.json());
app.use(cors());

const PORT = process.env.SERVER_PORT || 5000;

// Routes
app.use('/api/auth',authRoute);
app.use('/api/pharmacy/medicine',medicineRouter);
app.use('/api/pharmacy',pharmacyRouter);

// Error Caught Middleware
app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something Went Wrong";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    });
});

app.listen(PORT,()=>{
    console.log(`Server Is Running On Port: ${PORT}`);
});