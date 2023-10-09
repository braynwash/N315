export function changePage(hashTag, pageID) {
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

document.addEventListener("DOMContentLoaded", function () {
    const mobileMenuIcon = document.querySelector(".mobile-menu-icon");
    const links = document.querySelector(".links");

    // Toggle the links when the mobile menu icon is clicked
    mobileMenuIcon.addEventListener("click", function () {
        links.classList.toggle("show");
    });
});

