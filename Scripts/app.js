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
