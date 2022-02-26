/*
 * Cody Chaplin - 100557080
 * Logan Morris - 100795796
 * 25/02/2022
 */

(function(core)
{
    /**
     * User Class can create object User with Name, Email Address, UserName and Password
     * @class 
    */
    class User
    {
        /**
         * Constructor takes the following arguments creating an object of type User
         * @constructor
         * @param firstName takes in the users First name
         * @param lastName takes in the users last name
         * @param emailAddress takes in the users email address
         * @param username takes in the users username
         * @param password takes in the users password
         * 
         */
        constructor(firstName = "", lastName = "", emailAddress = "", username = "", password = "")
        {
            this.FirstName = firstName;
            this.LastName = lastName;
            this.EmailAddress = emailAddress;
            this.Username = username;
            this.Password = password;
        }

        /**
         * Gets users first name
         * @returns {string}
         */
         get FirstName() { return this.m_firstName; }

         /**
          * Sets the Users first name to string given
          * @param {string} firstName
          */
         set FirstName(firstName) { this.m_firstName = firstName; }
 
         /**
          * Gets users last name
          * @returns {string}
          */
         get LastName() { return this.m_lastName; }

         /**
          * Sets the users last name to string given
          * @param {string} lastName
          */
         set LastName(lastName) { this.m_lastName = lastName; }
 
         /**
          * Gets users email address
          * @returns {string}
          */
         get EmailAddress() { return this.m_emailAddress; }

         /**
          * sets users email address to string given
          * @param {string} emailAddress
          */
         set EmailAddress(emailAddress) { this.m_emailAddress = emailAddress; }
 
         /**
          * Gets users username
          * @returns {string}
          */
         get Username() { return this.m_username; }

         /**
          * Sets users username to the string given
          * @param {string} username
          */
         set Username(username) { this.m_username = username; }
 
         /**
          * Gets users password
          * @returns {string}
          */
         get Password() { return this.m_password; }
 
         /**
          * Sets users password to the string given
          * @param {string} password
          */
         set Password(password) { this.m_password = password; }
 
         /**
          * Gets users information neatly and ready to be printed
          * @returns {string}
          */
         toString()
         {
             return `Name: ${this.FirstName} ${this.LastName}\nEmail Adress: ${this.EmailAddress}\nUsername: ${this.Username}`;
         }

         /**
         * Function takes in a User argument and converts from a JSON to "This" Users variables (left side of period)
         * @param {User} data 
         */
        fromJSON(data)
        {
            this.FirstName = data.FirstName;
            this.LastName = data.LastName;
            this.EmailAddress = data.EmailAddress;
            this.Username = data.Username;
            this.Password = data.Password;
        }
        
        /**
         * Ensures no variables are empty before executing.
         * All users variables in a string format seperated by commas
         * @returns {string}
         */
        serialize()
        {
            if (this.FirstName !== "" && this.LastName !== "" && this.EmailAddress !== "" && this.Username !== "")
            {
                return `${this.FirstName},${this.LastName},${this.EmailAddress},${this.Username}`;
            }

            console.error("One or more properties of the user are missing or invalid");
            return null;
        }

        /**
         * A string is given and all variables are seperated by commas and placed into an array then assigned to a user
         * @param {string} data 
         */
        deserialize(data) // assume data in in CSV format
        {
            // parameterized data is split into array and used to set properties
            let propertyArray = data.split(",");
            this.FirstName = propertyArray[0];
            this.LastName = propertyArray[1];
            this.EmailAddress = propertyArray[2];
            this.Username = propertyArray[3];
        }
    }

    core.User = User;
})(core || (core={}));

"use strict";
(function()
{
    /**
     * Uses AJAX to return data to callback function
     *
     * @param {string} method
     * @param {string} url
     * @param {Function} callback
     */
    function AjaxRequest(method, url, callback)
    {
        // create XHR object and add event listener
        let XHR = new XMLHttpRequest();
        XHR.addEventListener("readystatechange", () =>
        {
            if (XHR.readyState === 4 && XHR.status === 200)
            {
                callback(XHR.responseText);
            }
        });

        XHR.open(method, url); // open request
        XHR.send(); // send request
    }

    /**
     * Loads navbar from header file and injects header/html into page
     * @param {String} data
     */
    function LoadHeader(data)
    {
        $("header").html(data);
        $(`li>a:contains(${document.title})`).addClass("active");

        CheckLogin();
    }

    /**
     * DisplayHome is called when the user opens the home page, finding a button from home.html then adds EventListener to redirect them to about.html on click
     */
     function DisplayHome()
     {
         console.log("Home Page");
 
         // redirects to about.html on button click
         document.getElementById("AboutUsButton").addEventListener("click", () =>
         {
             location.href = "about.html";
         });
     }
 
     /**
      * DisplayAboutPage is called when the user opens the About page all page logic will reside in this function
      */
     function DisplayAboutPage()
     {
         console.log("About Us Page");
     }
 
     /**
      * DisplayProjecsPage is called when the user opens the Projects page all page logic will reside in this function
      */
     function DisplayProjectsPage()
     {
         console.log("Projects Page");
     }
 
     /**
      * DisplayServicesPage is called when the user opens the Services page all page logic will reside in this function
      */
     function DisplayServicesPage()
     {
         console.log("Services Page");
     }

     /**
     * Calls ValidateField function for each of the register page Fields
     */
    function ContactFormValidation()
    {
        // validate using full name regex
        ValidateField("fullName", /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]{1,})+([\s|,|-]([A-Z][a-z]{1,}))*$/,
            "Please enter a valid name");
    
        // validate using phone number regex
        ValidateField("contactNumber", /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]?\d{4}$/,
            "Please enter a valid contact number");

        // validate using email address regex
        ValidateField("emailAddress", /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/,
            "Please enter a valid email address");
    }

    /**
     * DisplayContactPage is called when the user opens the Contact Page and ensures any inputted data conforms to our standards 
     */
    function DisplayContactPage()
    {
        console.log("Contact Us Page");

        ContactFormValidation(); // validate input

        let sendButton = document.getElementById("sendButton");
        
        sendButton.addEventListener("click", function(event)
        {
            event.preventDefault(); // allow printing to console

            // creates new contact and logs information to console
            let contact = new core.Contact(fullName.value, contactNumber.value, emailAddress.value);
            console.log(contact.toString());

            // after 3 seconds, user is redirected to home page
            setTimeout(() =>
            {
                location.href = "index.html";
            }, 3000);
        });
    }

    /**
     * DisplayLoginPage is called when the user opens the login Page and ensures Users UserName/Password is correct otherwise page prompts en error message 
     */
    function DisplayLoginPage()
    {
        console.log("Login page");

        let messageArea = $("#messageArea");
        messageArea.hide();

        $("#loginButton").on("click", function()
        {
            // set success to false by default and create new empty User object
            let success = false;
            let newUser = new core.User();

            // get data from JSON file
            $.get("./Data/users.json", function(data)
            {
                // for each user in data
                for (const user of data.users)
                {
                    // if user exists, update newUser, set success to true, and break
                    if (username.value == user.Username && password.value == user.Password)
                    {
                        newUser.fromJSON(user);
                        success = true;
                        break;
                    }
                }

                // if username and password match, success
                if (success)
                {
                    // add user to session storage
                    sessionStorage.setItem("user", newUser.serialize());
                    messageArea.removeAttr("class").hide();

                    location.href = "index.html";
                }
                else
                {
                    // on fail, trigger focus and select on username field and show error message
                    $("#username").trigger("focus").trigger("select");
                    messageArea.addClass("alert alert-danger").text("Error: Invalid login credentials").show();
                }
            });
        });

        // on cancel, reset form
        $("#cancelButton").on("click", function()
        {
            messageArea.removeAttr("class").hide();
            document.forms[0].reset();
        });
    }

    /**
     * CheckLogin is called when the header loads and appends their uername to the NavBar and changes "Login" to "Logout"
     */
    function CheckLogin()
    {
        // if user is logged in
        if (sessionStorage.getItem("user"))
        {
            let name = sessionStorage.getItem("user").split(",")[3];
            let navItem = $(`<p>${name}</p>`)
            navItem.addClass("navbar-text");
            $("#usernameNavItem").append(navItem);

            // update "login" link to "logout"
            $("#login").html(`<a id="logout" class="nav-link" href="#"><i class="fas fa-sign-out-alt"></i> Logout</a>`);

            // on remove, clear (user) from session storage and redirect to login page
            $("#logout").on("click", function()
            {
                sessionStorage.clear();

                location.href = "login.html";
            });
        }
    }

    /**
     * Validates an input text field in the form and displays an error in the message area
     *
     * @param {string} inputFieldID
     * @param {RegExp} regex
     * @param {string} errorMessage
     */
     function ValidateField(inputFieldID, regex, errorMessage)
     {
        let messageArea = $("#ErrorMessage").hide();

        $("#" + inputFieldID).on("blur", function()
        {
            let inputFieldText = $(this).val();
            if (!regex.test(inputFieldText))
            {
                $(this).trigger("focus").trigger("select");
                messageArea.show().addClass("alert alert-danger").text(errorMessage);
            }
            else
            {
                messageArea.removeAttr("class").hide();
            }
        });
     }

     /**
      * RegisterFormValidation Calls ValidateField for all fields in the register page with ID, RegExpression and an error message
      */
    function RegisterFormValidation()
    {
        // validate using first name regex
        ValidateField("firstName", /^[A-Z][a-z]{1,}$/,
        "Please enter a valid first name");

        // validate using last name regex
        ValidateField("lastName", /^([A-Z][a-z]{1,})*$/,
        "Please enter a valid last name");

        // validate using email address regex
        ValidateField("emailAddress", /^(([a-zA-Z0-9._-]{8,})+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10})$/,
            "Please enter a valid email address");
            
        // validate using password regex
        ValidateField("password", /^[a-zA-Z0-9!@#$&()\\-`.+,/\"]{6,}$/,
        "Password must be at least 6 characters long");
    }

    /**
     * DisplayRegisterPage is called when the Register Page loads this calls the RegisterFormValidation function to ensure input is accurate 
     * then stops the default submission of the Register button and checks if the password fields match and if they dont a corresponding error message is revealed
     * if no errors occur A new User variable is created with their inputted data
     */
    function DisplayRegisterPage()
    {
        console.log("Register page");

        let div = document.createElement('div');
        $("#registerForm").prepend(div);
        div.setAttribute("class", "alert alert-danger");
        div.setAttribute("id","ErrorMessage");

        let messageArea = $("#ErrorMessage");
        messageArea.hide();
        
        RegisterFormValidation();

        // gets reference to submit button
        let submitButton = document.getElementById("submitButton");

        submitButton.addEventListener("click", function(event)
        {
            event.preventDefault();
            
            // gets values from form
            let firstName = $("#firstName").val();
            let lastName = $("#lastName").val();
            let emailAddress = $("#emailAddress").val();
            let password = $("#password").val();
            let confirmPassword = $("#confirmPassword").val();
            
            if (password != confirmPassword)
            {
                $(this).trigger("focus").trigger("select");
                messageArea.show().addClass("alert alert-danger").text("Passwords do not match");
            }
            else
            {
                messageArea.removeAttr("class").hide();
            }

             // if no error message
            if (messageArea.is(":hidden"))
            {
                let username = lastName.toLowerCase() + firstName.charAt(0).toLowerCase();
                let user = new core.User(firstName, lastName, emailAddress, username, password);
                
                console.log(user.toString());
                 
                document.forms[0].reset(); // reset form
            }
        });
    }

    /**
     * Start is called when wondow loads and uses the above display functions to display the page info for each page depending on the title of the current document
     */
    function Start()
    {
        console.log("App Started");

        AjaxRequest("GET", "header.html", LoadHeader);

        switch(document.title)
        {
            case "Home":
                DisplayHome();
                break;
            case "About Us":
                DisplayAboutPage();
                break;
            case "Projects":
                DisplayProjectsPage();
                break;
            case "Services":
                DisplayServicesPage();
                break;
            case "Contact Us":
                DisplayContactPage();
                break;
            case "Login":
                DisplayLoginPage();
                break;
            case "Register":
                DisplayRegisterPage();
                break;
        }
    }

    // adds Start function as event listener to Load event
    window.addEventListener("load", Start);

})();
