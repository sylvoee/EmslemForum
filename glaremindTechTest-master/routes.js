
const express = require('express');
const router = express.Router();

// importing controllers
const userController = require('./controllers/userControllers');
const postBlogController = require('./controllers/postBlogController');
const commentController = require('./controllers/commentController');
const indexController = require('./controllers/indexController');
const profileController = require('./controllers/profileController');
const likesAndDislikesController = require('./controllers/likesAndDislikesController');
const helpers = require('./helperMethods/helper');


// making routes
router.get('/profile', checkLogin, profileController);
router.get('/user',checkLogin, dashboard);
router.get('/signUp' ,notAllowedWhenLogin , signUp);
router.post('/signUp', signUp);
router.get('/login', notAllowedWhenLogin, login);
router.post('/login', login);
router.get('/logout', signOut);
router.get('/confirm-email',notAllowedWhenLogin, confirmEmail);
router.post('/confirm-email', confirmEmail);
router.get('/change-password', changePassword)
router.put('/change-password', changePassword);
router.post('/reset-id', getId );
router.get('/unauthorised', unauthorised);
router.get('/login-admin', loginAdmin);
router.post('/login-admin', login);
router.get('/admin-dashboard', authorised ,adminDashboard);

router.put('/edit-complete-profile-status', editCompleteProfileStatus);

// profile routes
router.get('/view-profile', viewProfile );
router.get('/view-a-profile/:id', viewAProfile );
router.get('/get-create-profile', createProfileForm);
router.post('/create-profile', createProfile, editCompleteProfileStatus);
router.get('/edit-my-profile/:id',  editProfileForm  );
router.put('/edit-profile-image/:id' , upload.single('image'), editProfileImage);
router.put('/edit-my-profile',editProfile);

// PostBlog routes
router.get('/post-blog', authorised, postBlog);
router.post('/post-blog', upload.single('image') ,  postBlog);
router.get('/all-blog', authorised, allBlog);
router.get('/moderator', authorised, moderator);

router.get('/all-blog-post', allComment, allBlogPost);
router.delete('/delete-blog', deletePost)
router.get('/edit-post/:id', authorised, editPost);
router.get('/trending', trendingArticles);
router.put('/edit-post/:id', upload.single('image'), authorised, editPosts);
router.get('/viewPost/:id',trendingArticles , allComment, allCommentComment, allLikes, allDislikes,  allLikeComments , allDisLikeComments, viewAPost);

// comment routes
router.get('/all-comment', allComment)
router.post('/post-comment', postComment);
router.put('/edit-comment', editComment);
router.delete('/delete-comment', deleteComment);

// comment Comment routes
router.get('/all-comment-comment', allCommentComment)
router.post('/post-comment-comment', postCommentComment);


// router.delete('/rc/:id', removeComment);
// router.put('/edit-comment-comment/:id', editCommentComment);
// router.delete('/delete-comment-comment/:id', deleteCommentComment);


// likes and dislikes post controllers
router.post('/like-post', likes);
router.post('/dislike-post', dislikes);
router.get('/all-likes, allLikes');
router.get('/all-dislikes, allDislikes');

// like and dislike comment
router.post('/like-comment', likeAComment);
router.post('/dislike-comment', dislikeAComment);
router.get('/all-like-comments', allLikeComments);
router.get('/all-dislike-comments', allDisLikeComments);

router.get('/',trendingArticles, index);
// router.get('/about', aboutController);

router.get('/abc', abc);
router.get('/abcd', abcd);



module.exports = router;

