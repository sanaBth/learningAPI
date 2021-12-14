const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CommandeSchema = new Schema({
  
    iduser:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user', 
       required: true
    }, 
    idformation:
    [{
        type: mongoose.Schema.Types.ObjectId, 
    ref: 'formation', 
   required: true
    }],
     sommetotal:
    {
        type:Number,
        required:[false]
    },
   
},
{ timestamps: true ,versionKey: false });



const Commande = mongoose.model('commande', CommandeSchema);

module.exports=(Commande);