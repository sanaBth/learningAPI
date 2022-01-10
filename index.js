const express = require ('express');

var morgan = require('morgan');


const cors = require("cors");

const mongoose = require('mongoose');
var config = require('./config/database');

var bodyParser = require('body-parser');
const app = express();
app.use(morgan("dev"));
const userApi = require('./routes/authroutes');
const formationApi = require('./routes/formationroutes');
const videoApi = require('./routes/videoroutes');
const commandeApi = require('./routes/commanderoutes');
//local database
/*
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/formation');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 4001;

app.listen(port,()=>{
  console.log(`started up at port ${port}`);
});

*/
mongoose.Promise = require('bluebird');
mongoose.connect(config.database, { promiseLibrary: require('bluebird') })
.then(() =>  console.log('connection succesfullllllllllllllllllll!'))
.catch((err) => console.error(err));
const port = process.env.PORT || 4001;
app.listen(port,()=>{
  console.log(`started up at port ${port}`);
});
require("dotenv").config();

const cookieParser=require('cookie-parser');
app.use(cookieParser());


app.use(cors());

app.use(bodyParser.json());
app.use('/uploads',express.static(__dirname + '/uploads'));

//api login et register
app.use('/apiuser',userApi);
//api gestion formation
app.use('/formation',formationApi);
app.use('/video',videoApi);

//api gestion commande
app.use('/commande',commandeApi);
// index.js
app.use('/order',commandeApi);

