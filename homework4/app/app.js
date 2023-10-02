import { changePage } from "../model/model.js";

function route() {
    let hashTag = window.location.hash;
    let pageID = hashTag.replace("#", "");
    console.log(pageID);
    changePage(hashTag, pageID)
}
 
function initListeners() {
    $("#logIn").on("click", (e) => {
        $("#modal").toggle();
    })
    $(".close").on("click", (e) => {
        $("#modal").hide();
    })
    $(".logIn").on("click", (e) => {
        $("#modal").hide();
    })
    $(".logIn").on("click", (e) => {
        $("#alert").toggle();
    })
      $(".logclose").on("click", (e) => {
        $("#alert").toggle();
    })
}

function initUrlListeners() {
    $(window).on("hashchange", route);
    route();
}

$(document).ready(function () {
    initListeners();
    initUrlListeners();
})