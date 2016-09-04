$(function() {

    $("#loginForm input,#loginForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            // Prevent spam click and default submit behaviour
            $("#btnSubmit").attr("disabled", true);
            event.preventDefault();
            
            // get values from FORM
            var user_email = $("input#login_email").val();
            var user_password = $("input#login_password").val();
            
            var valid_user = false;
            var valid_password = false;
            
            var regUsers = JSON.parse(localStorage.getItem("reg_users"));
            
            for(var index in regUsers) {
                  
                if(regUsers[index].email.toString() == user_email.toString()){
                      valid_user = true;
                      
                      if(regUsers[index].password.toString() == user_password.toString()){
                          valid_password = true;
                      }
                  }
              }
              
              if(valid_user && valid_password){
                  
                  localStorage.setItem("user_auth",user_email);
                  window.scrollTo(0, 0);
                  window.location.reload();
              }
              else{                  
                $('#login_success').html("<div class='alert alert-danger'>");
                $('#login_success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                .append("</button>");
                $('#login_success > .alert-danger').append("<strong>Invalid username or password!</strong>");
                $('#login_success > .alert-danger').append('</div>');
                
              }
            
//            $.ajax({
//                url: "././mail/signup.php",
//                type: "POST",
//                data: {
//                    name: name,
//                    email: email,
//                    password: password
//                },
//                cache: false,
//                success: function() {
//                    // Enable button & show success message
//                    $("#btnSignupSubmit").attr("disabled", false);
//                    $('#signup_success').html("<div class='alert alert-success'>");
//                    $('#signup_success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
//                        .append("</button>");
//                    $('#signup_success > .alert-success')
//                        .append("<strong>Your message has been sent. </strong>");
//                    $('#signup_success > .alert-success')
//                        .append('</div>');
//
//                    //clear all fields
//                    $('#signUpForm').trigger("reset");
//                },
//                error: function() {
//                    // Fail message
//                    $('#signup_success').html("<div class='alert alert-danger'>");
//                    $('#signup_success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
//                        .append("</button>");
//                    $('#signup_success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that the server is not responding. Please try again later!");
//                    $('#signup_success > .alert-danger').append('</div>');
//                    //clear all fields
//                    $('#signUpForm').trigger("reset");
//                },
//            });
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

// When clicking on Full hide fail/success boxes
$('#name').focus(function() {
    $('#success').html('');
});
