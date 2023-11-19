import { addFormListener } from "./app.js";

var mobileBtn = document.getElementById("hamburger");

mobileBtn.addEventListener("click", toggleMenu);

function toggleMenu() {
    mobileBtn.classList.toggle("open");
}

var recipes = [];

export function changePage(pageName) {
    $("#app .formHolder div").off("click", "**");
    $("#app .formHolder #submit").off("click", "**");
    $.get(`pages/${pageName}.html`, (data) => {
        $("#app").html(data);
        addFormListener();
        if(recipes.length == 0) {
            $(".yourHolder").append(`<p>You have no recipes.</p>`);
        } else {
        $.each(recipes, (idx, recipe) => {
            $(".yourHolder").append(`
            <div class="recipeCard">
            <div class="recipeImg" style="background-image:url('${recipe.imagePath}');">
                <a class="yourBtn" id="view" href="#">View</a>
            </div>
            <div class="recipeText">
                <h1>${recipe.itemName}</h1>
                <p>${recipe.itemDesc}</p>
                <div class="sideBy">
                    <img src="/images/time.svg" alt="">
                    <p>${recipe.itemTime}</p>
                </div>
                <div class="sideBy">
                    <img src="/images/servings.svg" alt="">
                    <p>${recipe.itemServe}</p>
                </div>
            </div>
           </div>
           <div class="btnHolder">
        <a class="yourBtn" id="edit">Edit Recipe</a>
        <div class="yourBtn" id="delete">Delete</div>
        </div>`);
        })}
    }).fail((error) => {
        console.log("error ", error);
    });
}

export function addRecipe(newRecipe) {
    recipes.push(newRecipe);
    console.log(recipes);
}