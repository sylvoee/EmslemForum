const mongoose = require('mongoose');

    const dislikeCommentSchema = new mongoose.Schema({

    dislikeComment: Number ,
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

const dislikeCommentModel = mongoose.model('dislikeComment', dislikeCommentSchema);
module.exports = dislikeCommentModel;

