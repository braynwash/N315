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
            $(".vr").append(`<p>You have no recipes.</p>`);
        } else {
        $.each(recipes, (idx, recipe) => {
            $(".recipeHolder").append(`
            <div class="recipeCard">
            <div class="imgHolder">
                <img src="${recipe.imagePath}" alt="">
            </div>
            <div class="titleDesc">
                <h2>Awesome buny says: ${recipe.itemName}</h2>
                <h3>Description</h3>
                <p>Yummy yum carrot ipsum</p>
                <div class="ingredients">
                    <h2>Ingredients</h2>
                    <ul>
                    ${(() => { let htmlString = ""; $.each(recipe.ingredients, (idx, ingredient) => { let keyName = "ingredient" + idx; htmlString += `<li>${ingredient[keyName]}</li>`; }); 
                    return htmlString; })()}
                    </ul>
                </div>
                <div class="instructions">
                    <h2>Instructions</h2>
                    <ol>
                    ${(() => { let htmlString = ""; $.each(recipe.instructions, (idx, instruction) => { let keyName = "instruction" + idx; htmlString += `<li>${instruction[keyName]}</li>`; }); 
                    return htmlString; })()}
                    </ol>
                </div>
            </div>
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