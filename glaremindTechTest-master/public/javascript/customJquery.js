// $(document).ready(function(){
//     $("button").click(function(){
//       $(this).hide();
//     });
//   });


  $(()=>{
          $document.read(function(){
             
            $.ajax({
              type: 'GET',
                url: 'http://localhost:8000/all-blog-post',
                 contentType: 'application/json',
                success: function(response){
                let aPost = $(".aPost");
              //   container.html("");
                container.append("All i do is win");;
                }
            })
    });

          });


          $(()=>{
            $document.read(function(){
               
              $.ajax({
                type: 'GET',
                  url: 'http://localhost:8000/post-blog',
                   contentType: 'application/json',
                  success: function(response){
                  let body = $("body");
                //   container.html("");
                  body.append(response);;
                  }
              })
      });
  
            });

          