const mongoose = require('mongoose');

    const likesSchema = new mongoose.Schema({

    user :{
        ref:'User',
        required:true,
        type:mongoose.Schema.Types.ObjectId
    },
    
    postID :{
        ref:'BlogPost',
        type:mongoose.Schema.Types.ObjectId
    },

    createdAt: {type: Date, default: Date.now},

});

const likesModel = mongoose.model('likes', likesSchema);
module.exports = likesModel;

