// IIFE - Immediately Invoked Function Expession
// OR Anonymous self-executing function
(function()
{
    function DisplayHome()
    {
        let AboutUsButton = document.getElementById("AboutUsButton");
        AboutUsButton.addEventListener("click", function()
        {
            location.href = "about.html";
        });
    }

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
        }
    }

    // adds Start function as event listener to Load event
    window.addEventListener("load", Start);

})();
