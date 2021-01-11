const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(express.static('uploads'));
//Import Routes
const authRoute = require ('./routes/auth'); 
const profileRoute = require ('./routes/profile');
const typefieldRoute = require ('./routes/typefield');
const workerRoute = require('./routes/workers');
const materialRoute = require('./routes/material');
const fieldRoute = require('./routes/field');
const postRoute = require('./routes/post');
const jobRoute = require('./routes/job');
const notifRoute = require('./routes/notification');

dotenv.config();

//Connection to DataBase
mongoose.connect(
    process.env.DB_CONNECT,
    {useNewUrlParser: true, useUnifiedTopology: true},
    ()=>console.log('connected to database')
);

//MiddleWares
app.use(express.json());



//Route MiddleWares 
app.use('/api/user', authRoute);
app.use('/api/profile',profileRoute);
app.use('/api/typefield',typefieldRoute);
app.use('/api/worker',workerRoute);
app.use('/api/material',materialRoute);
app.use('/api/field', fieldRoute);
app.use('/api/post', postRoute);
app.use('/api/job', jobRoute);
app.use('/api/notification', notifRoute);

//Server Listener
app.listen(3000, ()=> console.log("Server Running"));

