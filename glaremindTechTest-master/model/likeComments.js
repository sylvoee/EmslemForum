const mongoose = require('mongoose');

    const likeCommentSchema = new mongoose.Schema({

    user :{
        ref:'User',
        required:true,
        type:mongoose.Schema.Types.ObjectId
    },
    
    commentID :{
        ref:'Comment',
        type:mongoose.Schema.Types.ObjectId
    },

    postID :{
        ref:'BlogPost',
        type:mongoose.Schema.Types.ObjectId
    },


    createdAt: {type: Date, default: Date.now},

});

const likeCommentModel = mongoose.model('likeComment', likeCommentSchema);
module.exports = likeCommentModel;

