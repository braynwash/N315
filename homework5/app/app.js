import { changePage } from "../model/model.js";

function route() {
    let hashTag = window.location.hash;
    let pageID = hashTag.replace("#", "");
    changePage(hashTag, pageID)
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



