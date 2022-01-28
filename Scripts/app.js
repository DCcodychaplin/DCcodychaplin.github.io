// IIFE - Immediately Invoked Function Expession
// OR Anonymous self-executing function
"use strict";
(function()
{
    function DisplayHome()
    {
        console.log("Home Page");

        let AboutUsButton = document.getElementById("AboutUsButton");
        AboutUsButton.addEventListener("click", function()
        {
            location.href = "about.html";
        });

        // get reference/insertion point
        let MainContent = document.getElementsByTagName("main")[0];
        let DocumentBody = document.body;

        // create HTML elements
        let MainParagraph = document.createElement("p");
        let Article = document.createElement("article");
        let ArticleParagraph = `<p id="ArticleParagraph" class="mt-3">This is the article paragraph</p>`;

        // configure elements
        MainParagraph.setAttribute("id", "MainParagraph");
        MainParagraph.setAttribute("class", "mt-3");
        let AString = "This is";
        let AnotherString = `${AString} the main paragraph!`
        MainParagraph.textContent = AnotherString;
        Article.setAttribute("class", "container");
        
        // insert element
        MainContent.appendChild(MainParagraph);
        Article.innerHTML = ArticleParagraph;
        DocumentBody.appendChild(Article);

        let cody = new Contact("Cody", "12334567890", "cody@sdf.com");
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

    function DisplayContactPage()
    {
        console.log("Contact Us Page");

        let sendButton = document.getElementById("sendButton");
        let subscribeCheckbox = document.getElementById("subscribeCheckbox");

        sendButton.addEventListener("click", function()
        {
            if (subscribeCheckbox.checked)
            {
                let contact = new Contact(fullName.value, contactNumber.value, emailAddress.value);
                if (contact.serialize())
                {
                    let key = contact.FullName.substring(0, 1) + Date.now();

                    localStorage.setItem(key, contact.serialize());
                }
            }
        });
    }

    function DisplayContactListPage()
    {
        console.log("Contact-List Page");

        if (localStorage.length > 0)
        {
            let contactList = document.getElementById("contactList");

            let data = ""; // data container

            let keys = Object.keys(localStorage); // returns string[] of keys

            let index = 1; // key count

            for (const key of keys)
            {
                let contactData = localStorage.getItem(key);

                let contact = new Contact();
                contact.deserialize(contactData);

                data += `<tr>
                <th scope="row" class="text-center">${index}</th>
                <td>${contact.FullName}</td>
                <td>${contact.ContactNumber}</td>
                <td>${contact.EmailAddress}</td>
                <td></td>
                <td></td>
                </tr>`;

                index++;
            }

            contactList.innerHTML = data;
        }
    }

    // delete element
    //document.getElementById("AboutUsButton").remove();

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
        }
    }

    // adds Start function as event listener to Load event
    window.addEventListener("load", Start);

})();
