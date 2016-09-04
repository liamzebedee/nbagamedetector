var users = [                
                {username: "admin",password:"admin"},
                {username: "aakash",password:"aakash"}                
            ];
            
            console.log(users);
            
            $('#btnLogin').click(function(e){
               e.preventDefault();
               
               var username = $('#txtUser').val();
               var password = $('#txtPassword').val();
               
               var valid_user = false;
               var valid_password = false;
               
              for(var index in users) {
                    //alert(data.dates[key].timeStamp); 
                  console.log(index);
                  
                  if(users[index].username.toString() == username.toString()){
                      valid_user = true;
                      
                      if(users[index].password.toString() == password.toString()){
                          valid_password = true;
                      }
                  }
              }
              
              if(valid_user && valid_password){
                  //alert('Login successfull!');    
                  var currentURL = window.location.href;
                  //console.log(currentURL.replace('index','home'));
                  window.location.href = currentURL.replace('index','home');
              }
              else{                  
                  alert('Invalid username and password!');
              }
              
            });
                
