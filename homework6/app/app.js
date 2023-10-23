var mobileBtn = document.getElementById("hamburger");

mobileBtn.addEventListener("click", toggleMenu);

function toggleMenu() {
    mobileBtn.classList.toggle("open");
}

