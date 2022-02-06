/*
 * Names:
 *     Cody Chaplin - 100557080
 *     Logan Morris - 100795796
 * Date :
 *     04/02/2022
 */

"use strict";
(function()
{
    // adds Start function as event listener to Load event
    window.addEventListener("load", Start);

    // calls different function based on page title
    function Start()
    {
        switch(document.title)
        {
            case "Home":
                DisplayHomePage();
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
        }
    }

    // When Home page loads, text is injected into corresponding elements
    // and the Contact Us button functionality is added
    function DisplayHomePage()
    {
        UpdateNavBar();

        // text to be injected
        let content = "Welcome to our website for Lab 1! " +
        "We provide a variety of services to help you with your development needs!</br>You can " + 
        "check out our Projects page to see our portfolio, Services page for the services we offer, " +
        "or our About Us page if you want to meet our team!</br>" +
        "Click the button below for any inquiries.";

        // finds element on page using ID and sets html text
        document.getElementById("mainParagraph").innerHTML = content;

        // redirected to contact.html on button click
        document.getElementById("ContactUsButton").addEventListener("click", () =>
        {
            location.href = "contact.html";
        });
    }

    // When About Us page loads, text is injected into corresponding elements
    // and the Project button functionality is added
    function DisplayAboutPage()
    {
        UpdateNavBar();
        
        let mainText = "This website was created by Logan Morris and Cody Chaplin. We used a </br>combination of HTML and JavaScript to create this beautiful canvas for </br>";
        mainText += "our work to be published.</br></br>We attend Durham College and are in our fourth semester. </br>Throughout our programming careers we have obtained the </br>skills ";
        mainText+= "nessessary to create a website and impliment our own </br>text, pictures and really let our creativity soar.";

        document.getElementById("mainParagraph").innerHTML = mainText;

        document.getElementById("ProjectButton").addEventListener("click", () =>
        {
            location.href = "products.html";
        });
    }

    // When Projects page loads, text is injected into corresponding elements
    function DisplayProjectsPage()
    {
        UpdateNavBar();

        let project1 = "This was our final lab in NETD3202 that involved WPF.</br>" + 
        "Considering that WPF has been my favourite tool so far, I would say this was my </br> favourite project. " + 
        "It was a simple application that allowed users to enter info into a </br> database using a form " +
        " and also let them view the data in several different tabs.";

        let project2 = "This was our final project in SYSA3204 using Python unit</br>" +
        "testing and Selenium. It invloved automating the testing</br>of a series of test cases and displaying the " +
        "results in an</br> HTML format as seen below.";

        let project3 = "This was our last C++ lab in OOP3200 that invloved intermediate " +
        "object oriented programming concepts such as dynamic memory allocation. This was one of our favourites " +
        "because it helped us understand how memory is allocated.";

        document.getElementById("project1").innerHTML = project1;
        document.getElementById("project2").innerHTML = project2;
        document.getElementById("project3").innerHTML = project3;
    }

    // When Services page loads, text is injected into corresponding elements
    function DisplayServicesPage()
    {
        UpdateNavBar();

        let subtext = "We provide the best web development services money can buy! </br> We attended Durham college and ensure you ";
        subtext += "your highest </br> expectations will be blown out of the water!";

        document.getElementById("mainParagraph").innerHTML = subtext;
        document.getElementById("innovation").innerHTML = "Innovation";
        document.getElementById("innovationsmall").innerHTML = "We offer new ideas and stratagies <br/>to ensure you have the most <br/>productive and efficient system possible!";
        document.getElementById("develop").innerHTML = "Development";
        document.getElementById("developsmall").innerHTML = "We have honed our development skills <br/>over the years to give our customers the <br/>best support, design, and final product <br/>they could ask for.";
        document.getElementById("design").innerHTML = "Design";
        document.getElementById("designsmall").innerHTML = "We have honed our development skills <br/>over the years to give our customers the <br/>best support, design, and final product <br/>they could ask for.";
    }

    // When Contact Us page loads, form functionality is loaded
    function DisplayContactPage()
    {
        UpdateNavBar();

        let sendButton = document.getElementById("sendButton"); // gets reference to send button

        sendButton.addEventListener("click", function(event)
        {
            event.preventDefault(); // allow printing to console

            // creates new contact and logs information to console
            let contact = new Contact(fullName.value, contactNumber.value, emailAddress.value);
            console.log(contact.toString());

            // after 3 seconds, user is redirected to home page
            setTimeout(() =>
            {
                location.href = "index.html";
            }, 3000);
        });
    }

    // Products link is updated to say Projects and Human Resources link is added to nav bar
    function UpdateNavBar()
    {
        // updates products link
        document.getElementById("productsNav").innerHTML = "<i class=\"fas fa-project-diagram\"></i> Projects";

        let navBar = document.getElementById("navBar"); // get parent <ul> of nav bar

        // <li> and <a> elements are created
        let HRli = document.createElement("li");
        HRli.setAttribute("class", "nav-item");
        let HRa = document.createElement("a");
        HRa.setAttribute("class", "nav-link");

        HRa.innerHTML = "<i class=\"fas fa-user-circle\"></i> Human Resources"; // link html is set
        
        HRli.appendChild(HRa); // adds <a> as child of <li>
        navBar.insertBefore(HRli, navBar.childNodes[8]); // adds HR link after About Us link

        AddFooter(); // adds footer to bottom of page
    }

    // Footer is added to bottom of page
    function AddFooter()
    {
        // creates nav element
        let nav = document.createElement("nav");
        nav.setAttribute("class","navbar fixed-bottom navbar-dark bg-dark");

        let date = new Date().getFullYear(); // gets current year

        // creates inner div and sets inner html
        let div = document.createElement("div");
        div.setAttribute("class","container-fluid");
        div.innerHTML = `<a class="navbar-brand" href="#">&copy; CopyRight ${date}</a>`;

        
        nav.appendChild(div); // adds <div> as child of <nav>

        // gets first script tag at bottom of body and inserts navbar before it
        let script = document.getElementsByTagName("script")[2];
        document.body.insertBefore(nav, script);
    }
})();
