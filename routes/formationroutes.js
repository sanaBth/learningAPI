const express = require('express');
const router =  express.Router();
const Video = require('../models/video');
const multer = require('multer');
const Formation = require('../models/formation');

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './uploads');
    },
    filename: function (req, file, callback) {
      callback(null,  Date.now()+ '-' +file.originalname );
    }
});

    var upload = multer({ storage : storage,
    limits: {
    fileSize: 1000000000 // 10000000 Bytes = 10 MB
    },});

    router.post('/uploadvid',upload.array('video'),async function(req,res){
    let listVideo = []
    req.files.forEach(file => {
    listVideo.push(file.filename);
    });
    try {
    const formation = new Formation({...req.body,listVideo});

    const resFormation =   await formation.save();

    res.status(201).json(resFormation)
    } catch (error) {
    res.status(500).json(error)
    }
    });



    //getting all formations
router.get('/getformation', (req, res) => {
    Formation.find() 
    .then(result =>res.status(200).json(result) )
    .catch(err => res.status(500).json(err)); 
  });
    module.exports = router;