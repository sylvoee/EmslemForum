const mongoose = require('mongoose');

    const dislikesSchema = new mongoose.Schema({
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

const dislikesModel = mongoose.model('dislikes', dislikesSchema);
module.exports = dislikesModel;

