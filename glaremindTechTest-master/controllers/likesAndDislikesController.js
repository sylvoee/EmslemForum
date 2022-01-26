const userModel = require('../model/user');
const blogPostModel = require('../model/blogPost');
const  commentModel = require('../model/comment');
const likesModel = require('../model/likes');
const likeCommentModel = require('../model/likeComments');
const dislikesModel = require('../model/dislikes');
const dislikeCommentModel = require('../model/dislikeComment');


// Post dislikes
let duplicateDislike = ""
module.exports = dislikes = (req, res, next)=>{
  const{postID} = req.body;
  const user = req.session.user._id;
  // console.log(postID)

  dislikesModel.find({}).exec((err, data)=>{
 if(err){
   console.log("err");
 }
 if(data){ 
// loop though each data
data.forEach(dt => {
  if(dt.postID == postID && dt.user == user){
    duplicateDislike = "exist";
  }else if(dt.postID != postID && dt.user != user){
   duplicateDislike = "noExist";
  }
});
 }
 console.log(duplicateDislike);
  });

    // Check if it is dulicated before posting
    if(duplicateDislike == "exist" || duplicateDislike != ""){
    res.redirect('back');
    console.log("Data exist ok");
    }else if(duplicateDislike == "noExist" || duplicateDislike == "" ){
    const aDislike = new dislikesModel({postID : postID, user:user });
      aDislike.save((err, data)=>{
       if(err){
           // console.log(err);
       }
       if(data){
         //  console.log(data)
        
       }
      });
      console.log("Data does not exist");
      res.redirect('back');
      next();
   }
      
    }

// Post likes
let duplicateLike = ""
module.exports = likes = (req, res, next)=>{
  const{postID} = req.body;
  const user = req.session.user._id;
  // console.log(postID)

  likesModel.find({}).exec((err, data)=>{
 if(err){
   console.log("err");
 }
 if(data){ 
// loop though each data
data.forEach(dt => {
  if(dt.postID == postID && dt.user == user){
    duplicateLike = "exist";
  }else if(dt.postID != postID && dt.user != user){
   duplicateLike = "noExist";
  }
});
 }
 console.log(duplicateLike);
  });

    // Check if it is dulicated before posting
    if(duplicateLike == "exist" || duplicateLike != ""){
    res.redirect('back');
    console.log("Data exist ok");
    }else if(duplicateLike == "noExist" || duplicateLike == "" ){
    const aLike = new likesModel({postID : postID, user:user });
      aLike.save((err, data)=>{
       if(err){
           // console.log(err);
       }
       if(data){
         //  console.log(data)
        
       }
      });
      console.log("Data does not exist");
      res.redirect('back');
      next();
   }
      
    }
 


// get read all likes on post
module.exports = allLikes = (req, res, next)=>{

  likesModel.find({}).populate('user').populate('postID').exec((err, docs)=>{
      if(err){
          res.send({err:err})
          console.log(err)
      }
      if(docs){
           req.likes = docs
      // console.log(docs);
      }

  });
  next();
}


// get read all dislikes on post
module.exports = allDislikes = (req, res, next)=>{
 
  // read likes from database
  dislikesModel.find({}).populate('user').populate('postID').exec((err, docs)=>{
      if(err){
         
          console.log(err)
      }
      if(docs){
           req.dislikes = docs;
      // console.log(docs);
      }

  });
  next();
}


// likeComment
let duplicateLikeComment = ""
module.exports = likeAComment = (req, res, next)=>{
  const{ commentID, postID} = req.body;
  let user = req.session.user._id
  // console.log(commentID)
 const aLike = new likeCommentModel({commentID:commentID,postID:postID, user :user });

 likeCommentModel.find({}).exec((err, data)=>{
 if(err){
   console.log("err");
 }
 if(data){ 
// loop though each data
data.forEach(dt => {
  if(dt.commentID == commentID && dt.user == user){
    duplicateLikeComment = "exist";
  }else if(dt.commentID != commentID && dt.user != user){
   duplicateLikeComment = "noExist";
  }
});
 }
 console.log(duplicateLikeComment);
  });

    // Check if it is dulicated before posting
    if(duplicateLikeComment == "exist" || duplicateLikeComment != ""){
    res.redirect('back');
    console.log("Data exist ok");
    }else if(duplicateLikeComment == "noExist" || duplicateLikeComment == "" ){
    const aLike = new likeCommentModel({commentID : commentID, user:user });
      aLike.save((err, data)=>{
       if(err){
           // console.log(err);
       }
       if(data){
         //  console.log(data)
        
       }
      });
      console.log("Data does not exist");
      res.redirect('back');
      next();
   }
      
    }



  
// get read all likes on comments
module.exports = allLikeComments = (req, res, next)=>{
 
  // read likes from database
  likeCommentModel.find({}).populate('user').populate('commentID').exec((err, docs)=>{
      if(err){
          console.log(err)
      }
      if(docs){
           req.likeComments = docs;
           // console.log(docs.length)
      }

  });
  next();
}


 

// dislikeAComment
let dDislikeComment = ""
module.exports = dislikeAComment = (req, res, next)=>{
  const{ commentID, postID} = req.body;
  let user = req.session.user._id
  console.log(commentID)
 const aDislike = new dislikeCommentModel({commentID:commentID,postID:postID, user :user });

 dislikeCommentModel.find({}).exec((err, data)=>{
 if(err){
   console.log("err");
 }
 if(data){ 
// loop though each data
data.forEach(dt => {
  if(dt.commentID == commentID && dt.user == user){
    dDislikeComment = "exist";
  }else if(dt.commentID != commentID && dt.user != user){
   dDislikeComment = "noExist";
  }
});
 }
 console.log(dDislikeComment);
  });

    // Check if it is dulicated before posting
    if(dDislikeComment == "exist" || dDislikeComment != ""){
    res.redirect('back');
    console.log("Data exist ok");
    }else if(dDislikeComment == "noExist" || dDislikeComment == "" ){
    const aDislike = new dislikeCommentModel({commentID : commentID, user:user });
    aDislike.save((err, data)=>{
       if(err){
           // console.log(err);
       }
       if(data){
         //  console.log(data)
        
       }
      });
      console.log("Data does not exist");
      res.redirect('back');
      next();
   }
      
    }






// get read all dislikes on comments
module.exports = allDisLikeComments = (req, res, next)=>{
  // read likes from database
  dislikeCommentModel.find({}).populate('user').populate('commentID').exec((err, docs)=>{
      if(err){
          res.send({err:err})
          console.log(err)
      }
      if(docs){
           req.dislikeComments = docs
     
      }

  });
  next();
}

 