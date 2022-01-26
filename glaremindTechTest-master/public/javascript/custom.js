
let confirmEmailBtn = document.querySelector('.confirm-email');
let email = document.querySelector('.email');


confirmEmailBtn.addEventListener('click', ()=>{
    if(email.value == ''){
        alert("You can not submit an empty string")
    }else if(email.value.length != ''){
        alert("A link has been sent to your mail. Click on it to rest password")
    }
});

let deletelLikeBtn = document.querySelector('.delete-like');
let postlLikeBtn = document.querySelector('.post-like');

deletelLikeBtn.addEventListener('click', ()=>{
   console.log("You click me") ;
   style.display ='none'
});