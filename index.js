require('dotenv').config();
const userRouter = require('./Router/userRoute');
const systemRoute = require('./Router/systemRoute');
const authRoute = require('./Router/authRoute');
const watertankRoute = require('./Router/watertankRoute');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

const  handelStatus  = require('./utils/handelStatus');
const { error } = require('jsend');
const url = process.env.MONGO_URL;


const connectDB = async () => {
    try {
        await mongoose.connect(url, { 
            //useNewUrlParser: true, 
            //useUnifiedTopology: true 
        });
        console.log('MongoDB connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};


connectDB();


app.use(express.json());
app.use(cors());


app.use('/api/user', userRouter);
app.use('/api/auth', authRoute);
app.use('/api/watertank', watertankRoute);
app.use('/api/system', systemRoute);


app.get('/', (req, res, next) => {
    res.status(200).json({ 
        message: "Server run" 
    });
});


app.use((error, req, res, next) => {
    const statusCode = error.statuscode || 500;
    const statusTxt = error.statustxt || handelStatus.ERROR;
    const errorMessage = error.message || 'Internal Server Error';
    
    res.status(statusCode).json({
        status: statusTxt,
        message: errorMessage,
    });
});


app.listen(process.env.PORT || 5001, () => {
    console.log(`Listening on port: ${process.env.PORT || 5001}`);
});
