require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const databaseConnection = require('./database/db');
const authRouter = require('./routes/auth.route');
const userRouter = require('./routes/user.route');
const medicineRouter = require('./routes/medicine.route');
const pharmacyRouter = require('./routes/pharmacy.route');
const doctorRouter = require('./routes/doctor.route');
const customerRouter = require('./routes/customer.route');
const laboratoryRouter = require('./routes/laboratory.route');
const contactRouter = require('./routes/contact.route');

databaseConnection();
app.use(express.json());
app.use(cors());
app.use("/images",express.static(path.join(__dirname,"/images")));

// Image Storage
const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,"images");
    },
    filename: (req,file,cb)=>{
        cb(null,req.body.name);
    }
});

const upload = multer({storage: storage});
app.post('/api/upload',upload.single('file'),(req,res)=>{
    res.status(200).json({message: "File is Uploaded Successfully"});
})

// PORT Number
const PORT = process.env.SERVER_PORT || 5000;

// Routes
app.use('/api/auth',authRouter);
app.use('/api/users',userRouter);
app.use('/api/medicine',medicineRouter);
app.use('/api/pharmacy',pharmacyRouter);
app.use('/api/doctor',doctorRouter);
app.use('/api/user',customerRouter);
app.use('/api/laboratory',laboratoryRouter);
app.use('/api/contact',contactRouter);

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