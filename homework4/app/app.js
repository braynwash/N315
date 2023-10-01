import { changePage } from "../model/model.js";

function route() {
    let hashTag = window.location.hash;
    let pageID = hashTag.replace("#", "");
    console.log(pageID);
    changePage(hashTag, pageID)
}

function initListeners() {
    console.log("Hello");
}

function initUrlListeners() {
    $(window).on("hashchange", route);
    route();
}

$(document).ready(function () {
    initListeners();
    initUrlListeners();
})