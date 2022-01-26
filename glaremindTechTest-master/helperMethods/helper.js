// set Login
let setLogin;

// check login function
module.export = checkLogin = (req, res, next)=>{
    if(typeof aUser !='undefined'){
      res.redirect('/all-blog');
      console.log("SESSION INFO " + aUser);
        next();
    }else if(typeof aUser =='undefined'){
        res.redirect('/login');
        console.log("SESSION INFO " + aUser);
        next();
    }
 
} 



// page not allow when login
module.exports = notAllowedWhenLogin = (req, res, next)=>{
  if(setLogin == false){
    next();
  }else{
    req.session.destroy(()=>{
      res.cookie({maxAge: 0});
         res.redirect('/');
         setLogin = false
  console.log("Login is " + setLogin);
     });
    
  }
}

module.exports = authorised = (req, res, next)=>{
 if(typeof req.session.user != "undefined"){
   if(req.session.user.status == "osaz@forum" ){
    next();
   }else{res.redirect('/unauthorised')}
 }else{
   res.redirect('/');
   console.log(req.session.user);
 }

}

    // send mail
    var nodemailer = require('nodemailer');
const { render } = require('ejs');
     let sendMail = (receiver, subject, HTMLmsg)=>{
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'glareminds@gmail.com',
              pass: 'sylvicglareminds88'
            }
          });
          
          var mailOptions = {
            from: 'glareminds@gmail.com',
            to: receiver,
            subject: subject,
            html: HTMLmsg
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
     }