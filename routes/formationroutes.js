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
 
 //add formation
router.post('/add', uploadimage.single('image') ,async function(req,res){
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

    //get one formation
    router.get('/details/:id', (req, res) =>
    Formation.findOne({
       _id: req.params.id
       }).populate("listVideo")
       .then(result =>res.status(200).json(result) )
       .catch(err => res.status(500).json(err))
       
       );

//update formation
  router.put('/update/:id',uploadimage.single('image') , (req, res) =>

  Formation.findOneAndUpdate({
    _id: req.params.id
    },
   
    req.body,req.file.imagef,{new : true},
    )
    .then(result => res.json(result))
  .catch(err => res.status(500).json(err))
  
);

router.put('/todo/:id', (req, res) =>
  Todo.findByIdAndUpdate(
    req.params.id,req.body,{new : true}
   ).then(result => res.status(201).json(result) )
  .catch(err =>  res.status(500).json(err))
  
);

//delete formation
router.delete('/delete/:id', (req, res) => {
  Formation.findOneAndRemove({
    _id: req.params.id
  }).then(result =>res.json({message : "removed with success"}) )
    .catch(err => res.json(err) ); 
});
    module.exports = router;