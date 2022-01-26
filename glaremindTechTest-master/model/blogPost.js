const mongoose = require('mongoose');

    const postBlogSchema = new mongoose.Schema({

    category:  String,
    commentStatus: String ,
    title: {type: String},
    image: {type: Array},

    blog:{
        type: String, 
        // required: [true, "Blog field can not be blank"]
        },
    createdAt: {type: Date, default: Date.now},

    user :{
        ref:'User',
        required:true,
        type:mongoose.Schema.Types.ObjectId,
    },

    comments :{
        ref:'Comment',
        type:mongoose.Schema.Types.ObjectId
    },
});


const postBlogModel = mongoose.model('BlogPost', postBlogSchema);
module.exports = postBlogModel;

