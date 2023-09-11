import { addPageContent } from "../model/model.js";
import { setLoggedInOut } from "../model/model.js";

function initListeners() {
    $("nav a").on("click", (e)=> {
        e.preventDefault();
        let btnID = e.currentTarget.id;
        // btnID == "home" ? addPageContent() : alert("Wrong choice!");
        addPageContent(btnID);
    })
    $("nav .log span").on("click", (e)=> {
        e.preventDefault();
        setLoggedInOut();
    })
}

$(document).ready(function () {
    addPageContent("home");
    initListeners();
});

