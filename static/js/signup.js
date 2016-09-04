$(function() {

    $("#signUpForm input,#signUpForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            // Prevent spam click and default submit behaviour
            //$("#btnSubmit").attr("disabled", true);
            event.preventDefault();
            
            // get values from FORM
            var user_name = $("input#signup_name").val();
            var user_email = $("input#signup_email").val();
            var user_password = $("input#signup_password").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
                
            var regUsers = JSON.parse(localStorage.getItem("reg_users"));
            var userExists = false;
            
            for(var index in regUsers) {
                  
                if(regUsers[index].email.toString() == user_email.toString()){
                      userExists = true;
                  }
            }
            $('#signup_success').html('');
            
            if(userExists){
                $('#signup_success').html("<div class='alert alert-danger'>");
                $('#signup_success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                .append("</button>");
                $('#signup_success > .alert-danger').append("<strong>Sorry, this email already exists! Please try again with a different email</strong>");
                $('#signup_success > .alert-danger').append('</div>');
                 //clear all fields
                //$('#signUpForm').trigger("reset");
                
                return;
            }            
            
            var newUser = {
                'name': user_name,
                'email': user_email,
                'password': user_password
            }

            
            regUsers.push(newUser); // push a new student inside of it
            localStorage.setItem("reg_users", JSON.stringify(regUsers));
            
            $('#signup_success').html("<div class='alert alert-success'>");
            $('#signup_success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
            $('#signup_success > .alert-success').append("<strong>Account created successfully!</strong>");
            $('#signup_success > .alert-success').append('</div>');
            
            window.setInterval(function(){
                localStorage.setItem("user_auth",user_email);
                window.scrollTo(0, 0);
                window.location.reload();
            }, 4000);
                
            
//            localStorage['reg_users'].push(
//                {name:user_name , email: user_email, password: user_password}
//            );
            
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
$('#signup_email').focus(function() {
    $('#signup_success').html('');
});
