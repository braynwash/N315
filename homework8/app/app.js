function changePage(hashTag, pageID) {
    if (pageID == "" || pageID == "home") {
        $.get(`pages/home.html`, (data) => {
            $("#app").html(data);
        })
    } else {
        $.get(`pages/${pageID}.html`, (data) => {
            $("#app").html(data);
    })
}
}

function loggedIn() {
    
}

function route() {
    let hashTag = window.location.hash;
    let pageID = hashTag.replace("#", "");
    changePage(hashTag, pageID);
}

var mobileBtn = document.getElementById("hamburger");

mobileBtn.addEventListener("click", toggleMenu);

function toggleMenu() {
    mobileBtn.classList.toggle("open");
}

function initUrlListeners() {
    $(window).on("hashchange", route);
    route();
}

$(document).ready(function () {
    initUrlListeners();
})
