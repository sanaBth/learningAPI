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
      
      let imagef = `${req.protocol}://${req.headers.host}/uploads/${req.file.filename}`;
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

 //get one formation with listvideos
    router.get('/details/:id', (req, res) =>
    Formation.findOne({
       _id: req.params.id
       }).populate("listVideo")
       .then(result =>res.status(200).json(result) )
       .catch(err => res.status(500).json(err))
       );

//get one formation without listvideo
    router.get('/detailv/:id', (req, res) =>
    Formation.findOne({
       _id: req.params.id
       })//.populate("listVideo")
       .then(result =>res.status(200).json(result) )
       .catch(err => res.status(500).json(err))
       );



//update formation
  router.put('/update/:id',uploadimage.single('image') , (req, res) =>
  { 
    const body = req.body;
    const nom = body.nom;
    const dure = body.dure;
    const nomformateur = body.nomformateur;
    const description= body.description
    const prix= body.prix
    const updates = {
        nom,
        dure,
        nomformateur,
        description,
        prix
    };
    if (req.file) {
        const image = req.file.filename;
        updates.imagef = image;
    }
  Formation.findOneAndUpdate({_id: req.params.id},{
    $set: updates
    },
   {new : true})
    .then(result => res.json(result) )
  .catch(err => res.status(500).json(err))
  }
);
 

//delete formation
router.delete('/delete/:id', (req, res) => {
  Formation.findOneAndRemove({
    _id: req.params.id
  }).then(result =>res.json({message : "removed with success"}) )
    .catch(err => res.json(err) ); 
});
    module.exports = router;