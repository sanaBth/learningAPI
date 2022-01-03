const express = require('express');
const router =  express.Router();

const Commande = require('../models/commande');
const {User }= require('../models/user');



 
 //add commandes
router.post('/add/:idu', async function(req,res){
    const user = await User.findOne({_id: req.params.idu})
    
    try {
    const commande = new Commande(req.body);
    console.log(req.body);
    commande.iduser = user._id;
const rescommande =   await commande.save();
    user.cours = req.body.idformation;
    const resuser =   await user.save();
    res.status(201).json(rescommande,resuser)
    } 
    catch (error) {
    res.status(500).json(error)
    }
    });


  //get one commande
  router.get('/details/:id', (req, res) =>
  Commande.findOne({
    _id: req.params.id
    }).populate("idformation")
    .populate("iduser")
    .then(result =>res.status(200).json(result) )
    .catch(err => res.status(500).json(err))
    
    );

 //getting all commandes
router.get('/all', (req, res) => {
    Commande.find() 
    .populate("idformation")
    .populate("iduser")
    .then(result =>res.status(200).json(result) )
    .catch(err => res.status(500).json(err)); 
  });

    //addformation to user
    router.put('/addf/:idf', async function(req,res){
      const formation = await formation.findOne({_id: req.params.idf})
      
      try {
    
      User.cours = formation._id;
      

      const rescommande =   await commande.save();
      res.status(201).json(rescommande)
      } 
      catch (error) {
      res.status(500).json(error)
      }
      }); 



 //delete commande
router.delete('/delete/:id', (req, res) => {
  Commande.findOneAndRemove({
    _id: req.params.id
  }).then(result =>res.json({message : "commande removed with success"}) )
    .catch(err => res.json(err) ); 
});
 
module.exports = router;