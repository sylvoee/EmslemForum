
const profileModel = require('../model/profile');
const userModel = require('../model/user');

module.exports =  index = (req, res, next)=>{
   // read all trening article
  
   res.render('index', {trendingArticles: req.trendingArticles, 
      aUser:req.session.user});
   // console.log(req.trendingArticles)
   // console.log(req.name);

   next();

}


// let someProduct = [
//    {name: "James Bull", age:12, location: "Ikeja"},
//    {name: "James madisson", age:29, location: "Leicester"},
//    {name: "Mark Henry", age:32, location: "London"}
// ]

module.exports = abc = (req, res)=>{
res.render('abc',{someProduct:someProduct, data:"Some data here"});
}

module.exports = abcd = (req, res)=>{
   res.render('abcd');
   }

