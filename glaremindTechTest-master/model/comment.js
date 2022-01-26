const mongoose = require('mongoose');

    const commentSchema = new mongoose.Schema({

    comment: Array ,
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

const commentModel = mongoose.model('Comment', commentSchema);
module.exports = commentModel;

