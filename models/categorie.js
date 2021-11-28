const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CategorieSchema = new Schema({
    name:{
        type:String,
        required:[true,'name field is required']
    },
    description:{
      type:String,
      required:[true,'description field is required']
  }
},
{ timestamps: true ,versionKey: false });




const Categorie = mongoose.model('Categorie', CategorieSchema);

module.exports=(Categorie);
