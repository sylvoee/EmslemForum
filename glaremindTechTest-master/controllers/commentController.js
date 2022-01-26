const userModel = require('../model/user');
const blogPostModel = require('../model/blogPost');
const  commentModel = require('../model/comment');
const commentCommentModel = require('../model/commentComment');
const likeCommentModel = require('../model/likeComments');
const dislikeCommentModel = require('../model/dislikeComment');
const mongoose = require('mongoose');


 // post comment
module.exports = postComment = (req, res)=>{
    const {comment, postID, user} = req.body;
    // console.log("This is a post ID " + postID);
    let aComment = new commentModel({
         comment ,  postID, user
    });

    // saving blog
    if(comment != ''){
        aComment.save((err, data)=>{
            if(data){
            res.redirect('/viewPost/' + postID);
             // console.log({msg: "comment has been made successfully"})
            }
            if(err){
             //    res.render(commentModel, {err: err});
            
             console.log({err :err});
     
            }
         });
    }
   
}

// get read all comment
module.exports = allComment = async(req, res, next)=>{
  
    
    // read comments from database
    await commentModel.find({}).populate('postID').populate('user').then((data)=>{
        let docs = data;
        req.comments = docs;
    });


    next();
}

// delete a comment
module.exports = deleteComment =(req, res)=>{
    // console.log("This is the ID " + req.body.id);
    const{id} = req.body;
    commentModel.findByIdAndDelete({"_id":id}, (err, success)=>{
        if(err){
         res.send(err);
         console.log(err);
        }
        if(success){
        //    res.render('deleteComment', {msg:"Post has been sucessfully deleted"});
      
        //console.log("comment deleted");
        }

    });

    // Delete comment on comment
    commentCommentModel.deleteMany({commentID:id}, (err, success)=>{
        if(err){
         console.log(err);
        }
        if(success){
           //console.log({msg:"Comment Comment has been sucessfully deleted"});
        }

    });

    // Delete likes
    likeCommentModel.deleteMany({commentID:id}, (err, success)=>{
        if(err){
         console.log(err);
        }
        if(success){
           // console.log({msg:"like Comment has been sucessfully deleted"});
        }

    });

    // Delete disikes on comment
    dislikeCommentModel.deleteMany({commentID:id}, (err, success)=>{
        if(err){
         console.log(err);
        }
        if(success){
           // console.log({msg:"Dislike Comment has been sucessfully deleted"});
        }

    });


   res.redirect('back');
}

// To Edit comment
module.exports = editComment = async (req, res)=>{
   const{comment, id} = req.body;

   let eCom = await commentModel.findById(id);
   eCom.comment = comment

   try {
    eCom = await eCom.save(); 
    console.log("Comment Successfully updated");
   } catch (error) {
      console.log(error) 
   }
  
res.redirect('back');
}

// post comment comment
module.exports = postCommentComment = (req, res, next)=>{
    const{commentID, commentComment, postID} = req.body;
    let user = req.session.user._id;
    const aCommentComment = new commentCommentModel(
        {commentID: commentID, postID:postID, commentComment:commentComment, user : user });
             // Saving comment commets
            aCommentComment.save((err, data)=>{
            // console.log("I just made a comment commetn")
            if(data){
               
            }
            if(err){
                console.log(err);
            }
    });
   res.redirect('back');
   next();
   
}

// get read all comment comment
module.exports = allCommentComment = async (req, res, next)=>{
   
   // read comments from database
   await commentCommentModel.find({}).populate('user').sort({id: -1}).then((data)=>{
    let docs = data;
    req.commentComment = docs;
});
    next();
}




