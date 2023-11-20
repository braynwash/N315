import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBuqab9hMhqjT-i-G7rL3Q1sd4N-k1Ks7M",
  authDomain: "n315jereblac.firebaseapp.com",
  projectId: "n315jereblac",
  storageBucket: "n315jereblac.appspot.com",
  messagingSenderId: "663998957644",
  appId: "1:663998957644:web:2471865a1c2f4c6ec1cce9"
};

const app = initializeApp(firebaseConfig);

alert("Hello!");


var mobileBtn = document.getElementById("hamburger");

mobileBtn.addEventListener("click", toggleMenu);

function toggleMenu() {
    mobileBtn.classList.toggle("open");
}

var recipes = [];

function changePage(pageName) {
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

function addRecipe(newRecipe) {
    recipes.push(newRecipe);
    console.log(recipes);
}

let initialIngred = 3;
let initialInstruct = 3;

function initListeners() {
$("nav a").on("click", (e) => {
    e.preventDefault();
    let btnID = e.currentTarget.id;
    changePage(btnID);
    console.log("Click!");
});
}

function addFormListener() {
    console.log("form listen");
    $("#ingredient").on("click", (e) => {
        initialIngred++;
        $(".formIngred").append(
            `<input type="text" placeholder="Ingredient ${initialIngred}" id="ingred${initialIngred - 1}">`
        );
    })
    $("#instruct").on("click", (e) => {
        initialInstruct++;
        $(".formInstruct").append(
            `<input type="text" placeholder="Instruction ${initialInstruct}" id="instr${initialInstruct - 1}">`
        );
    })
    $("#submit").on("click", (e) => {
        let newItemObj = {};

        let imagePath = $("#imagePath").val();
        let itemName = $("#itemName").val();
        let itemDesc = $("#itemDesc").val();
        let itemTime = $("#itemTime").val();
        let itemServe = $("#itemServe").val();

        newItemObj.imagePath = imagePath;
        newItemObj.itemName = itemName;
        newItemObj.itemDesc = itemDesc;
        newItemObj.itemTime = itemTime;
        newItemObj.itemServe = itemServe;
        newItemObj.ingredients = [];
        newItemObj.instructions = [];
        console.log(newItemObj.imagePath);
        console.log(newItemObj.itemName);
        $('.formIngred input').each(function(index,data) {
            var value = $(this).val();
            let keyName = "ingredient" + index;
            let ingredObj = {};
            ingredObj[keyName] = value;
            newItemObj.ingredients.push(ingredObj);
            console.log(ingredObj);
        })
        $('.formInstruct input').each(function(index,data) {
            var value = $(this).val();
            let keyName = "instruction" + index;
            let instructObj = {};
            instructObj[keyName] = value;
            newItemObj.instructions.push(instructObj);
            console.log(instructObj);
        });
        addRecipe(newItemObj);
    });
}

$(document).on("click", ".recipeCard a", function(e) {
    e.preventDefault();
    changePage("pview");
    console.log("Recipe link clicked!");
});

$(document).on("click", ".recipeImg a", function(e) {
    e.preventDefault();
    changePage("view");
    console.log("Custom view clicked!");
});

$(document).on("click", "#edit", function(e) {
    e.preventDefault();
    changePage("edit");
    console.log("Edit recipe clicked!");
});

$(document).on("click", "#delete", function(e) {
    e.preventDefault();
    $(".yourHolder").append(`<p>You have no recipes.</p>`);
    $('.recipeCard').remove();
    $('.btnHolder').remove();
    console.log("Delete!");
});

$(document).on("click", "#submit", function(e) {
    e.preventDefault();
    $("#modal").toggle();
    console.log("Delete!");
});

$(document).on("click", ".close", function(e) {
    e.preventDefault();
    $("#modal").toggle();
    console.log("Delete!");
});

$(document).ready(function () {
    changePage("home");
    initListeners();
})