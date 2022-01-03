const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuizSchema = new Schema({
    id:{
        type:String,
        required:[true,'name field is required']
    },
    quizzTitle:{
        type:String,
        required:[true,'name field is required']
    },
    questions:[{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'question', 
       required: false
    }],
    answered:{
        type:boolean,
        required:[true,'name field is required']
    }
},
{ timestamps: true ,versionKey: false });




const Quiz = mongoose.model('quiz', QuizSchema);

module.exports=(Quiz);


