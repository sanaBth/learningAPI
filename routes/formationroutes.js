const express = require('express');
const router =  express.Router();

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
var uploadimage = multer({ storage : storage, limits: {
  fileSize: 100000000 // 1000000 Bytes = 1 MB
},});
 

   


    router.post('/add', uploadimage.single('image') ,async function(req,res){
   /* let listVideo = []
    req.files.forEach(file => {
    listVideo.push(file.filename);
    }); 
    console.log(req.file); */
  
    try {
      let imagef = req.file.filename
    const formation = new Formation({...req.body,imagef});
 
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