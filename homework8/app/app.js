import { addRecipe, changePage } from "./model.js";

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

export function addFormListener() {
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

        newItemObj.imagePath = imagePath;
        newItemObj.itemName = itemName;
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

$(document).ready(function () {
    changePage("home");
    initListeners();
})