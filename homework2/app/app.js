import { addPageContent } from "../model/model.js";

function initListeners() {
    $("nav a").on("click", (e)=> {
        e.preventDefault();
        let btnID = e.currentTarget.id;
        addPageContent(btnID);
    })
}

$(document).ready(function () {
    addPageContent("home");
    initListeners();
});