const userModel = require('../model/user');
const postBlogModel = require('../model/blogPost');
const likesModel = require('../model/likes');
const commentModel = require('../model/comment');
const dislikesModel = require('../model/dislikes');
const likeCommentModel  = require('../model/likeComments');
const dislikeCommentModel = require('../model/dislikeComment');
const commentCommentModel = require('../model/commentComment');


// package for image upload
const multer = require('multer');
module.exports = upload =  multer({ dest: './public/uploads' })

// delete image from post function
function deleteImage(){
    const fs = require('fs');
    const path = './public/uploads/'+ imageName; 

    try {
    fs.unlinkSync(path)
   console.log("file removed");
    } catch(err) {
    console.error(err)
    }
}

// Get blogPost
module.exports = postBlog = (req, res)=>{
    // res.render('blog');
    res.render('post-blog', {aUser:req.session.user, title:"Create Blog"})
   // console.log("A just Post a Record " + req.session.user)
   
  }

  
  // post postBlog
module.exports = postBlog = (req, res)=>{
    if(typeof req.body != 'undefined'){
    const {category, commentStatus, title, image , blog} = req.body;
    // console.log("From image " + req.file.filename);
var myPost = {
    category, commentStatus ,title, blog, 
     image: req.file, 
     user: req.session.user._id,   
}
    postBlog = new postBlogModel(myPost);

    // saving blog
    if(typeof title != "undefined" || typeof blog != 'undefined'){
        postBlog.save((error, data)=>{
            if(error){
                res.render('post-blog', {error: error});
           
            // res.send(error);
             console.log({error :error});
     
            }
            if(data){
            //   res.send("post has been succesfully made");
             res.render('post-blog', {aUser: req.session.user});
             //console.log({msg: "post has been made successfully"});

            }
            
         });
    }else{
        res.render('post-blog', {aUser: req.session.user});
    }
        
    }
   
}

// get read all blog Admin
module.exports = allBlog = (req,res)=>{
    // read from database
    postBlogModel.find({}).sort({createdAt: -1}).populate('user', 'comments').exec((error, data)=>{
        if(error){
           
            // res.render('allBlogs', {error:error});
            res.render('allBlogs', {error:error});
            console.log(error)
        }
        if(data){
         res.render('allBlogs', {data: data, aUser:req.session.user, title:"Edit Blog"});
        
        }

    });
}

// get read all blog
module.exports = allBlogPost = async (req, res, next)=>{

    // read from database

     await postBlogModel.find({}).sort({createdAt: -1}).populate('user').then((data)=>{
           let docs =  data
           res.render('allBlogPost', {data:docs, comments: req.comments, aUser:req.session.user, title:"All Blog Post"});
     });

   
}


// trending articles
module.exports = trendingArticles = (req,res, next)=>{
    // read from database
    postBlogModel.find({}).limit(6).populate('user').exec((error, data)=>{
        if(error){

            res.render('allBlogs', {error:error});
            console.log(error)
        }
        if(data){
        req.trendingArticles  = data;
       // console.log(req.trendingArticles);
    next();
         
        }

    });

}

// delete a post
module.exports = deletePost =(req, res)=>{
    const{id, imageName} = req.body;
    postBlogModel.findByIdAndDelete({_id:id}, (error, success)=>{
        if(error){
         console.log(error);
        }
        if(success){
        console.log("post deleted");
        }

    });

    // delete image from post function

    const fs = require('fs');
    const path = './public/uploads/'+ imageName; 
    try {
    fs.unlinkSync(path)
   // console.log("file removed");
    } catch(err) {
    console.error(err)
    }


    // Delete comment
    commentModel.deleteMany({postID:id}, (err, success)=>{
        if(err){
         res.send(err);
         console.log(err);
        }
        if(success){
        // res.render('deleteComment', {msg:"Post has been sucessfully deleted"})
        console.log("comment deleted");

    // Delete comment on comment
    commentCommentModel.deleteMany({postID:id}, (err, success)=>{
        if(err){
         console.log(err);
        }
        if(success){
           console.log({msg:"Comment Comment has been sucessfully deleted"});
        }

    });

    // Delete likes
    likeCommentModel.deleteMany({postID:id}, (err, success)=>{
        if(err){
         console.log(err);
        }
        if(success){
         console.log({msg:"like Comment has been sucessfully deleted"});
        }

    });

    // Delete disikes on comment
    dislikeCommentModel.deleteMany({postID:id}, (err, success)=>{
        if(err){
         console.log(err);
        }
        if(success){
            console.log({msg:"Dislike Comment has been sucessfully deleted"});
        }

    });

        }

    });


// Delete likes on post
    likesModel.deleteMany({postID:id}, (err, success)=>{
        if(err){
         console.log(err);
        }
        if(success){
        // res.render('deleteComment', {msg:"Post has been sucessfully deleted"});
        console.log("comment deleted");
        }
    });


    // Delete dislike post
    dislikesModel.deleteMany({postID:id}, (err, success)=>{
        if(err){
         console.log(err);
        }
        if(success){
           //console.log({msg:"Comment Comment has been sucessfully deleted"});
           console.log("Dislikes on post deleted");
        }

    });

    // Delete comment on comment
 res.redirect('back');
//  res.send("Success")

}

// Get Edit Post
module.exports = editPost = (req, res)=>{
    postBlogModel.findById({"_id": req.params.id}).exec((error, data)=>{
        if(error){
             res.render('editPost', {error :error});
             console.log(error)
        }
        if(data){
            res.render('editPost', {data:data, aUser:req.session.user});
             console.log("Edit post Form");
        }
    });
}

// To Edit post
module.exports = editPosts = async (req, res)=>{

    let blog = await postBlogModel.findById(req.params.id);
   
    blog.title = req.body.title;
    blog.category = req.body.category;
    // blog.image = req.file;
    blog.blog = req.body.blog;

    try{
        blog = await blog.save();
        res.redirect('/all-blog');
        console.log("sucessfully edited");
         // console.log(req.file);
    }
    catch(error){
         console.log(error);
    }


  }

  // view a post
  module.exports = viewAPost = async (req, res)=>{
     
    postBlogModel.findById({_id: req.params.id}).populate('user').then((data)=>{
     let aPost = data;
     
     res.render('aPost',
     {  aPost: aPost,
        trendingArticles: req.trendingArticles,
        comments: req.comments,
        likes: req.likes, 
        dislikes: req.dislikes,
        likeComments: req.likeComments,
        dislikeComments: req.dislikeComments,
        commentComment: req.commentComment,
        aUser:req.session.user,
        title:aPost.title
});
    });

    
    }


