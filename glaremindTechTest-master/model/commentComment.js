const mongoose = require('mongoose');

    const commentCommentSchema = new mongoose.Schema({
        commentComment: String,

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

const commentCommentModel = mongoose.model('commentComment', commentCommentSchema);
module.exports = commentCommentModel;

