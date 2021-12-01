const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const VideoSchema = new Schema({
    name:{
        type:String,
        required:[true,'name field is required']
    },
    dure:{
        type:String,
        required:[true,'dure field is required']
    },
    description:{
      type:String,
      required:[true,'description field is required']
    },
    lienVideo:{
     type:String,
     required:[true,'video field is required']
}
},
{ timestamps: true ,versionKey: false });




const Video = mongoose.model('Video', VideoSchema);

module.exports=(Video);
