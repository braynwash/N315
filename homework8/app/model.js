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
        });
        $.each(recipes, (idx, recipe) => {
            $(".viewHolder").append(`
            <div class="viewCard">
                <div class="viewImg">
                <img src="${recipe.imagePath}">
                </div>
                <div class="viewText">
                 <h1>Description</h1>
                 <p>${recipe.itemDesc}</p>
                 <h2>Total time:</h2>
                 <p>${recipe.itemTime}</p>
                 <h2>Servings</h2>
                 <p>${recipe.itemServe}</p>
                </div>
        </div>
        <h1>Ingredients:</h1>
        <div class="ingredList">
        <ul>
        ${(() => { let htmlString = ""; $.each(recipe.ingredients, (idx, ingredient) => { let keyName = "ingredient" + idx; htmlString += `<li>${ingredient[keyName]}</li>`; }); 
        return htmlString; })()}
        </ul>
    </div>
    <h1>Instructions:</h1>
    <div class="instructList">
    <ol>
    ${(() => { let htmlString = ""; $.each(recipe.ingredients, (idx, ingredient) => { let keyName = "ingredient" + idx; htmlString += `<li>${ingredient[keyName]}</li>`; }); 
    return htmlString; })()}
    </ol>
    </div>
    <div class="editBtn"><a id="edit" href="#">Edit Recipe</a></div>`);
        })}
    }).fail((error) => {
        console.log("error ", error);
    });
}

export function addRecipe(newRecipe) {
    recipes.push(newRecipe);
    console.log(recipes);
}