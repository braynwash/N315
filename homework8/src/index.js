import { initializeApp } from "firebase/app";
import { getAuth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBuqab9hMhqjT-i-G7rL3Q1sd4N-k1Ks7M",
  authDomain: "n315jereblac.firebaseapp.com",
  projectId: "n315jereblac",
  storageBucket: "n315jereblac.appspot.com",
  messagingSenderId: "663998957644",
  appId: "1:663998957644:web:2471865a1c2f4c6ec1cce9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

console.log("Webpack is working!");


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
                <h1 class="title">${recipe.itemName}</h1>
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
    console.log("Toggle!");
});

$(document).on("click", "#signInBtn", function(e) {
    e.preventDefault();
    $("#modalLog").toggle();
    console.log("Toggle!");
});

$(document).on("click", "#createAccBtn", function(e) {
    e.preventDefault();
    $("#modalLog").toggle();
    console.log("Toggle!");
});

$(document).on("click", ".close", function(e) {
    e.preventDefault();
    $("#modal").toggle();
    console.log("Close!");
});

$(document).on("click", "#modalLog .close", function(e) {
    e.preventDefault();
    $("#modalLog").toggle();
    console.log("Close!");
});

$(document).on("click", ".modalHolder a", function(e) {
    e.preventDefault();
    changePage("custom");
});

$(document).on("click", "#createAccBtn", function(e) {
        e.preventDefault();
        let fName = $("#fname").val();
        let lName = $("#lname").val();
        let email = $("#Cemail").val();
        let pw = $("#Cpw").val();
        console.log(fName);
        console.log(lName);
        document.getElementById("login").innerHTML="Log out";
        $("#custom").show();
        // $(".browseHolder").append(`<h1>Hey ${fName}, here are your recipes!</h1>`);
        // $(".userForm").append(`<h1>Hey ${fName}, create your recipe!</h1>`)
    createUserWithEmailAndPassword(auth, email, pw)
    .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log(user);
    // ...
    })
    .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert("Error: " + errorMessage);
    // ..
    });
    });

$(document).on("click", "#signInBtn", function(e) {
        let email = $("#email").val();
        let pw = $("#pw").val();
        console.log("sign in");
        document.getElementById("login").innerHTML="Log out";
        $("#custom").show();
        // $(".browseHolder").append(`<h1>Hey ${fName}, here are your recipes!</h1>`);
        signInWithEmailAndPassword(auth, email, pw)
    .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log(user);
    
    // ...
    })
    .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert("Error Message " + errorMessage);
    // ..
    });
});

$(document).ready(function () {
    changePage("home");
    initListeners();
})



