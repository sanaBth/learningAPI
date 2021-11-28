const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const FormationSchema = new Schema({
    nom:{
        type:String,
        required:[true,'name field is required']
    },imagef:{
        type:String,
        required:[true,'name field is required']
    },dure:{
        type:String,
        required:[true,'name field is required']
    },nomformateur:{
        type:String,
        required:[true,'name field is required']
    },
    description:{
        type:String,
        required:[true,'name field is required']
    },notes:{
        type:Number,
        required:[false]
    },prix:{
        type:Number,
        required:[true,'name field is required']
    },listVideo:{
        type:Array,
        required:[false ]
    }
    /* categorie:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Categorie', 
       required: true
    }
    listVideo:[{
         type: mongoose.Schema.Types.ObjectId, 
         ref: 'Video', 
        required: true
     }], */
},
{ timestamps: true ,versionKey: false });




const Formation = mongoose.model('formation', FormationSchema);

module.exports=(Formation);
