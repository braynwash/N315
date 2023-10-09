import { changePage } from "../model/model.js";

let loggedIn = false;

function route() {
    let hashTag = window.location.hash;
    let pageID = hashTag.replace("#", "");
    changePage(hashTag, pageID);
}
 
if (loggedIn==false) {
    $("#log").on("click", function(){
       $.get(`pages/login.html`, (data) => {
        $("#app").html(data);
        }) 
    })
}

function initListeners() {
    console.log("Test");
}

function initUrlListeners() {
    $(window).on("hashchange", route);
    route();
}

$(document).ready(function () {
    initListeners();
    initUrlListeners();
    if ($(window).width() <= 768) {
        $('#hero').removeClass('heroImg');
    }
})



