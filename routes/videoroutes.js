const express = require('express');
const router =  express.Router();
const Video = require('../models/video');
const Formation = require('../models/formation')
const multer = require('multer');



var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null,  Date.now()+ '-' +file.originalname );
  }
});

var uploadvideo = multer({ storage : storage,
  limits: {
  fileSize: 1000000000 // 10000000 Bytes = 10 MB
  },});

//getting all videos
router.get('/videos', (req, res) => {
    Video.find({})
    .then(result =>res.status(200).json(result) )
    .catch(err => res.status(500).json(err)); 
  });
 

  //add video to formation
  router.post('/add/:idf', uploadvideo.single('video') ,async function(req,res)
  {
    let idform = req.params.idf;
     try {
       let lienVideo = `${req.protocol}://${req.headers.host}/uploads/${req.file.filename}`;
     const video = new Video({...req.body,lienVideo});
     const resVideo =   await video.save();
     const resFormation = await Formation.findByIdAndUpdate(
      idform,{  $push: { listVideo: resVideo._id }}
      ,{new : true}
    )
  
     res.status(201).json(resFormation)
     } catch (error) {
     res.status(500).json(error)
     }
     }); 
 
 
    //get one video
    router.get('/details/:id', (req, res) =>
    Video.findOne({
       _id: req.params.id
       }) .then(result =>res.status(200).json(result) )
       .catch(err => res.status(500).json(err))
       );

  //delete video
  router.delete('/delete/:id', (req, res) => {
    Video.findOneAndRemove({
      _id: req.params.id
    }).then(result =>res.json({message : "video removed with success"}) )
      .catch(err => res.json(err) ); 
  });


//update video
router.put('/update/:id',uploadvideo.single('video') , (req, res) =>
{ 
  const body = req.body;
  const name = body.name;
  const dure = body.dure;
  const description= body.description
  
  const updates = {
      name,
      dure,
      description
  };
  if (req.file) {
      const video = req.file.filename;
      updates.lienVideo = video;
  }
Video.findOneAndUpdate({_id: req.params.id},{
  $set: updates
  },
 {new : true})
  .then(result => res.json(result) )
.catch(err => res.status(500).json(err))
}
);


module.exports = router;