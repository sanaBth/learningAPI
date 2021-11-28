const express = require('express');
const router =  express.Router();
const Video = require('../models/video');
const multer = require('multer');
const Formation = require('../models/formation');



//getting all videos
router.get('/videos', (req, res) => {
    console.log('getting all videos');
    Video.find({})
    .then(result =>res.status(200).json(result) )
    .catch(err => res.status(500).json(err)); 
  });

  //post video
  router.post('/video', (req, res) => {
    let newvideo = new Video();
    newvideo.name = req.body.name;
    newvideo.dure=req.body.dure;
    newvideo.description = req.body.description;
    newvideo.link = req.body.link;
  //console.log(newvideo);
   newvideo.save()
      .then(result =>res.status(201).json(result) )
      .catch(err => res.status(500).json(err)); 
  
  });

  //delete video
  router.delete('videos/:id', (req, res) => {
    Video.findOneAndRemove({
      _id: req.params.id
    }).then(result =>res.json({message : "removed with success"}) )
      .catch(err => res.json(err) ); 
  });


 /* //add formation without video
router.post('/formation', (req, res) => {
  let newFormation = new Formation();
  newFormation.nom = req.body.nom;
  newFormation.imagef = req.body.imagef;
  newFormation.dure = req.body.dure;
  newFormation.nomformateur = req.body.nomformateur;
  newFormation.description = req.body.description;
  newFormation.notes = req.body.notes;
  newFormation.prix = req.body.prix;
  
console.log(newFormation);
 newFormation.save()
    .then(result =>res.status(201).json(result) )
    .catch(err => res.status(500).json(err)); 

}); */


module.exports = router;