const mongoose = require('mongoose');

    const userSchema = new mongoose.Schema({
        // _id : {type:mongoose.Schema.Types.ObjectId},
    name: {type: String, lowercase: true,  required: [true, "name field can not be blank"]},
    password: {require:true, type:String},
    status:{type:String}, 
    profileStatus: String,   
    email: {type: String, lowercase: true, unique:true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+@/, 'is invalid'], index: true},
    createdAt: {type: Date, default: Date.now}

});



const userModel = mongoose.model('User', userSchema);
module.exports = userModel;

