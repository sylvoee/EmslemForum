const mongoose = require('mongoose');

    const profileSchema = new mongoose.Schema({
        // _id : {type:mongoose.Schema.Types.ObjectId},
    // name: {type: String, lowercase: true}
  DOB : Date,
  place: String,
  person: String,
  maritalStatus: String,
  institute:String,
  occupation: String,
  hobby:String,
  info:String,
  sex:String,
  purpose:String,
  quote:String,
  issue:String,
  facebook:String,
  instagram:String,
  profileImage: String,

  user:{
      ref:'User',
      type:mongoose.Schema.Types.ObjectId, 
      unique:true
  },
    createdAt: {type: Date, default: Date.now}

});



const profileModel = mongoose.model('Profile', profileSchema);
module.exports = profileModel;

