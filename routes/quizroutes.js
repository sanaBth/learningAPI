const express = require('express');
const router =  express.Router();

const Quiz = require('../models/quiz');
 
 //add formation
router.post('/add',async function(req,res){
    try {
      
    const quiz = new Quiz({req.body});
 
    const resQuiz =   await quiz.save();

    res.status(201).json(resQuiz)
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