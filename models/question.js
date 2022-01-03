const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    textQuestion:{
        type:String,
        required:[true,'name field is required']
    },
    indexOfBonneReponse:{
        type:number,
        required:[true,'name field is required']
    },
    suggestions:[{
        type:String,
        required:[true,'name field is required']
    }],
    indexOfUserReponse:{
        type:number,
        required:[false]
    }
},
{ timestamps: true ,versionKey: false });




const Question = mongoose.model('question', QuestionSchema);

module.exports=(Question);

