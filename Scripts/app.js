// IIFE - Immediately Invoked Function Expession
// OR Anonymous self-executing function
"use strict";
(function()
{
    function DisplayHome()
    {
        console.log("Home Page");

        // redirects to about.html on button click
        document.getElementById("AboutUsButton").addEventListener("click", () =>
        {
            location.href = "about.html";
        });
        
        // adds content to page
        $("main").append(`<p id="MainParagraph" class="mt-3">The is the main paragraph</p>`);
        $("body").append(`<article class="container"><p id="ArticleParagraph" class="mt-3">This is the article paragraph</p></article>`);

        // creates a contact and logs details to console
        let cody = new core.Contact("Cody", "12334567890", "cody@sdf.com");
        console.log(cody.toString());
    }

    function DisplayAboutPage()
    {
        console.log("About Us Page");
    }

    function DisplayProjectsPage()
    {
        console.log("Projects Page");
    }

    function DisplayServicesPage()
    {
        console.log("Services Page");
    }

    /**
     * Adds a Contact Object to localStorage
     * 
     * @param {string} fullName 
     * @param {string} contactNumber 
     * @param {string} emailAddress 
     */
    function AddContact(fullName, contactNumber, emailAddress)
    {
        // generates unique key and stores serialized contact in localStorage
        let contact = new core.Contact(fullName, contactNumber, emailAddress);
            if (contact.serialize())
            {
                let key = contact.FullName.substring(0, 1) + Date.now();

                localStorage.setItem(key, contact.serialize());
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
        let messageArea = $("#messageArea").hide();
        
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

    function DisplayContactPage()
    {
        console.log("Contact Us Page");

        ContactFormValidation(); // validate input

        // gets references
        let sendButton = document.getElementById("sendButton");
        let subscribeCheckbox = document.getElementById("subscribeCheckbox");

        // if subscribeCheckbox is checked, add contact to localStorage
        sendButton.addEventListener("click", function()
        {
            if (subscribeCheckbox.checked)
            {
                AddContact(fullName.value, contactNumber.value, emailAddress.value);
            }
        });
    }

    function DisplayContactListPage()
    {
        console.log("Contact-List Page");

        if (localStorage.length > 0)
        {
            let contactList = document.getElementById("contactList"); // table body
            let data = ""; // data container
            let keys = Object.keys(localStorage); // returns string[] of keys
            let index = 1; // key count

            for (const key of keys)
            {
                let contactData = localStorage.getItem(key); // get item associated with key

                // create and deserialize contact
                let contact = new core.Contact();
                contact.deserialize(contactData);

                // add html
                data += `<tr>
                <th scope="row" class="text-center">${index}</th>
                <td>${contact.FullName}</td>
                <td>${contact.ContactNumber}</td>
                <td>${contact.EmailAddress}</td>
                <td class="text-center">
                    <button value="${key}" class="btn btn-primary btn-sm edit"><i class="fas fa-edit fa-sm"></i> Edit</button>
                </td>
                <td class="text-center">
                    <button value="${key}" class="btn btn-danger btn-sm delete"><i class="fas fa-trash-alt fa-sm"></i> Delete</button>
                </td>
                </tr>`;
                
                index++; // increment counter
            }

            contactList.innerHTML = data; // add table row

            // redirects to edit.html on button click, stores "add" in hash
            $("#addButton").on("click", () =>
            {
                location.href = "edit.html#add";
            });

            // redirects to edit.html on button click, stores key in hash
            $("button.edit").on("click", function()
            {
                location.href = "edit.html#" + $(this).val();
            });

            // removes item associated with key from localStorage and redirects to contact-list.html
            $("button.delete").on("click", function()
            {
                if (confirm("Are you sure?"))
                {
                    localStorage.removeItem($(this).val());
                }

                location.href = "contact-list.html";
            });
        }
    }

    function DisplayEditPage()
    {
        ContactFormValidation();

        let page = location.hash.substring(1); // get hashed identifier

        switch(page)
        {
            case "add":
                {
                    // edits text/html on page
                    $("main>h1").text("Add Contact");
                    $("#editButton").html(`<i class="fas fa-plus-circle fe-lg"></i> Add`);

                    // adds contact to localStorage
                    $("#editButton").on("click", (event) =>
                    {
                        event.preventDefault();
                        AddContact(fullName.value, contactNumber.value, emailAddress.value); // adds contact
                        location.href = "contact-list.html";
                    })
                    
                    // redirect to contact-list.html
                    $("#cancelButton").on("click", () =>
                    {
                        location.href = "contact-list.html";
                    })
                }
                break;
            default:
                {
                    // creates Contact using deserialized data from localStorage
                    let contact = new core.Contact();
                    contact.deserialize(localStorage.getItem(page));

                    // updates values
                    $("#fullName").val(contact.FullName);
                    $("#contactNumber").val(contact.ContactNumber);
                    $("#emailAddress").val(contact.EmailAddress);

                    $("#editButton").on("click", (event) =>
                    {
                        event.preventDefault();

                        // sets contact data using html values
                        contact.FullName = $("#fullName").val();
                        contact.ContactNumber = $("#contactNumber").val();
                        contact.EmailAddress = $("#emailAddress").val();

                        localStorage.setItem(page, contact.serialize()); // updates record

                        location.href = "contact-list.html";
                    });

                    // redirect to contact-list.html
                    $("#cancelButton").on("click", () =>
                    {
                        location.href = "contact-list.html";
                    })
                }
                break;
        }
    }

    function DisplayLoginPage()
    {
        console.log("Login page");
    }

    function DisplayRegisterPage()
    {
        console.log("Register page");
    }

    // named function
    function Start()
    {
        console.log("App Started");

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
            case "Contact-List":
                DisplayContactListPage();
                break;
            case "Contact Us":
                DisplayContactPage();
                break;
            case "Edit":
                DisplayEditPage();
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
