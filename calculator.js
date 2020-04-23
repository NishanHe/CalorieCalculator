/*
* Name: Nishan He
* Andrew: nishanh
* */
var completeTotal = 0;
var finishStep = 0;
var recipe = [];
var caloriesTotal = 0;
var isIngredientFinished = true;
var userType;


function loadThePage() {
    //count visit times
    //distinguish users

    //for testing: clear localStrorage
    //localStorage.clear();

    userType = "naive";
    //cookie from http://www.bigrigg.com/cmu881/storage.html
    if (typeof (Storage) !== "undefined") {
        if (localStorage.visitTimes) {
            localStorage.visitTimes = Number(localStorage.visitTimes) + 1;
        } else {
            localStorage.visitTimes = 1;
        }
    }

    if (localStorage.visitTimes > 1 && localStorage.visitTimes < 6) {
        userType = "novice";
    } else if (localStorage.visitTimes > 5 && localStorage.visitTimes < 12) {
        userType = "typical";
    } else if (localStorage.visitTimes > 10) {
        userType = "advanced";
    }

    startCoachMarks();
    if(userType === "typical" || userType === "advanced"){
        document.getElementById("hiddenInfo").style.display = "none";
        document.getElementById("btn_show_calculator").style.display = "none";
    }else if (userType !== "naive"){
        document.getElementById("calculator_container").style.display = "none";
        document.getElementById("btn_show_calculator").style.display = "block";
    }else if(userType === "naive"){
        document.getElementById("btn_show_calculator").style.display = "block";
    }

    if(userType === "novice" || userType === "naive" || userType === "typical"){
        document.getElementById("overflow").style.display = "none";

    }else{
        document.getElementById("btn_show_fridge").style.display = "none";
        document.getElementById("btn_edit_fridge").style.display = "none";
    }

    checkFeaturedContent();
    if(localStorage.getItem("isCompleted")){
        document.getElementById("completeness_meter_general").style.display = "none";
    }
    window.alert(userType);
}
function checkFeaturedContent(){
    if(userType !== "advanced"){
        document.getElementById("feature_more_recipe").style.display = "none";
        document.getElementById("feature_switch_unit").style.display = "none";
        document.getElementById("feature_fridge").style.display = "none";
    }else {
        if(localStorage["more_recipe"] !== null && Number(localStorage["more_recipe"]) > 1){
            document.getElementById("feature_more_recipe").style.display = "none";
        }

        if(!localStorage["switch_unit"]){
            document.getElementById("feature_switch_unit").style.display = "none";
        }

        if(localStorage["feature_fridge"] !== null){
            document.getElementById("feature_fridge").style.display = "none";
        }
    }
}
function showCalculator(){
    document.getElementById("calculator_container").style.display = "block";
}

function startCoachMarks(){
    //to naive users
// coach mark package: intro.js from https://introjs.com/
    if(userType === "naive"){
        introJs().start();
    }
}

function createRecipe(){
    // set variables to 0
    completeTotal = 0;
    finishStep = 0;
    recipe = [];
    caloriesTotal = 0;

    document.getElementById("div_show_fridge").style.display = "none";
    document.getElementById("div_edit_fridge").style.display = "none";
    if(localStorage.getItem("more_recipe") !== null){
        var times = Number(localStorage.getItem("more_recipe"));
        localStorage.setItem("more_recipe", times + 1);
    }else{
        localStorage.setItem("more_recipe", 1);
    }

    document.getElementById("recipe").style.display = "block";
    completeTotal += 1;
    document.getElementById("total_cal").style.display = "none";
    document.getElementById("menu").style.display = "none";
}

function showMenu(){
    document.getElementById("recipe").style.display = "none";
    var menu = document.getElementById("menu");

    if(localStorage.getItem("more_recipe") === null ){
        if(userType === "typical" || userType === "advanced"){
            var nextStep = document.createElement("p");
            nextStep.innerHTML = "go back and create a recipe first!";
            menu.appendChild(nextStep);
        }

    }else if(localStorage.getItem("check_menu") === null){
        localStorage.setItem("check_menu", "true");
        document.getElementById("completeness_meter_general").innerHTML = "You have created 66.7% to have a complete menu and refrigerator! "
    }


    var recipeList = JSON.parse(localStorage.getItem("myMenu"));
    for(var i = 0;i< recipeList.length; i++){
        var titleLabel = document.createElement("label");
        titleLabel.innerHTML = "Recipe Name: ";

        var recipeTitle = document.createElement("p");
        recipeTitle.innerHTML = recipeList[i]["recipe_name"];

        menu.appendChild(titleLabel);
        menu.appendChild(recipeTitle);

        for(var key in recipeList[i]){
            if(key !== "Calories" && key !== "recipe_name"){
                var descrip = key + ": " + recipeList[i][key] + "g";
                var ingre_text = document.createElement("p");
                ingre_text.innerHTML = descrip;
                menu.appendChild(ingre_text);
            }
        }
    }
    document.getElementById("div_show_fridge").style.display = "none";
    document.getElementById("div_edit_fridge").style.display = "none";
    document.getElementById("menu").style.display = "block";

    if(userType === "typical" || userType === "advanced"){
        if(localStorage.getItem("feature_fridge") === null){
            document.getElementById("next_step").innerHTML = "Next step hint: Go and check fridge for food management!";

        }
    }

}

// popover from https://www.w3schools.com/bootstrap/bootstrap_ref_js_popover.asp
$(document).ready(function(){

    $('[data-toggle="popover"]').popover();

});

function showInputHintWeight(){
    if(userType === "naive" || userType === "novice"){
        document.getElementById("weight_hint").style.display = "block";
    }
}

function showInputHintCalor(){
    if(userType === "naive" || userType === "novice") {
        document.getElementById("calories_hint").style.display = "block";
    }
}

function showMoreFunctions(){

    if(document.getElementById("overflow").innerHTML === "More functions"){
        document.getElementById("overflow").innerHTML = "show less";

        document.getElementById("btn_show_fridge").style.display = "block";
        document.getElementById("btn_edit_fridge").style.display = "block";
        document.getElementById("overflow").disabled = false;
    }else{
        document.getElementById("overflow").innerHTML = "More functions";
        document.getElementById("btn_edit_fridge").style.display = "none";
        document.getElementById("btn_show_fridge").style.display = "none";
        document.getElementById("div_show_fridge").style.display = "none";
        document.getElementById("overflow").disabled = false;
    }
}

function showFridge(){
    if(localStorage.getItem("feature_fridge") !== null){
        var times = Number(localStorage.getItem("feature_fridge"));
        localStorage.setItem("feature_fridge", times + 1);
    }else{
        localStorage.setItem("feature_fridge", 1);
    }
    document.getElementById("div_edit_fridge").style.display = "none";
    document.getElementById("menu").style.display = "none";
    var fridgeDiv = document.getElementById("div_show_fridge");

    var child = fridgeDiv.lastElementChild;
    while (child) {
        fridgeDiv.removeChild(child);
        child = fridgeDiv.lastElementChild;
    }

    var fridge = JSON.parse(localStorage.getItem("fridge"));

    for(var food in fridge[0]){
        var foodText = document.createElement("p");
        foodText.innerHTML = food + ": " + fridge[0][food] + "g";
        fridgeDiv.appendChild(foodText);
    }

    document.getElementById("div_show_fridge").style.display = "block";

}

function updateFridge(){
    if(localStorage.getItem("feature_fridge") !== null){
        var times = Number(localStorage.getItem("feature_fridge"));
        localStorage.setItem("feature_fridge", times + 1);
    }else{
        localStorage.setItem("feature_fridge", 1);
    }

    document.getElementById("menu").style.display = "none";
    document.getElementById("div_show_fridge").style.display = "none";
    document.getElementById("div_edit_fridge").style.display = "block";
}
function showAddFoodFridge(){

    document.getElementById("div_consume_food").style.display = "none";
    document.getElementById("div_add_food").style.display = "block";
}
function showConsumeFoodFridge(){
    document.getElementById("div_add_food").style.display = "none";
    document.getElementById("div_consume_food").style.display = "block";
}
function addFoodFridge() {
    var fridgeDiv = document.getElementById("div_show_fridge");
    var food = document.getElementById("input_add_food").value;
    var weight = document.getElementById("input_add_food_weight").value;

    var foodText = document.createElement("p");
    foodText.innerHTML = food + ": " + weight + "g";
    fridgeDiv.appendChild(foodText);

    if(localStorage.getItem("fridge") !== null){
        console.log(typeof localStorage.getItem("fridge"));
        var fridge = localStorage.getItem("fridge");
        if(fridge[0][food] !== null){
            fridge[0][food] += weight;
            console.log(fridge[0][food]);
        }else{
            fridge[0][food] = weight;
        }
        localStorage.setItem("fridge", JSON.stringify(fridge));
    }else{
        var fridge = [{food: weight}];
        localStorage.setItem("fridge", JSON.stringify(fridge));
    }

    document.getElementById("div_add_food").style.display = "none";
    window.alert("You have created 100% to have a complete menu and refrigerator!");
    document.getElementById("completeness_meter_general").style.display = "none";
    localStorage.setItem("isCompleted", true);

}
function consumeFoodFridge() {

    var fridgeDiv = document.getElementById("div_show_fridge");
    var food = document.getElementById("input_consume_food").value;
    var weight = document.getElementById("input_consume_food_weight").value;

    var foodText = document.createElement("p");
    foodText.innerHTML = food + ": " + weight + "g";
    fridgeDiv.appendChild(foodText);

    if(localStorage.getItem("fridge") !== null){
        var fridge = JSON.parse(localStorage.getItem("fridge"));
        if(fridge[0][food] !== null){
            fridge[0][food] -= weight;
            localStorage.setItem("fridge", JSON.stringify(fridge));
        }else{
            window.alert("No more " + food + "left! ");
        }

    }else{
        var fridge = [{food: weight}];
        localStorage.setItem("fridge", JSON.stringify(fridge));
    }
    document.getElementById("div_consume_food").style.display = "none";
}


function addIngreRecipe(){

    //move to ingredient input
    const RECIPE_NAME = document.getElementById("recipe_name").value;
    document.getElementById("div_recipe_name").style.display = "none";

    document.getElementById("text_recipe_name").innerHTML = "Your recipe: " + RECIPE_NAME;
    document.getElementById("text_recipe_name").style.display = "block";
    document.getElementById("ingredient").style.display = "block";

    var inputedIngre = JSON.parse(localStorage.getItem("my_ingredients"));
    var select = document.getElementById("default_ingredient");

    //remove all child
    var child = select.lastElementChild;
    while (child) {
        select.removeChild(child);
        child = select.lastElementChild;
    }

    if(userType !== "naive"){
        for(var i = 0;i < inputedIngre.length;i++){
            var option = document.createElement("option");
            option.innerHTML = inputedIngre[i];
            select.appendChild(option);
        }
    }

    if(RECIPE_NAME.length !== 0 && recipe.length === 0){
        finishStep += 1;
    }else if(RECIPE_NAME.length === 0){
        window.alert("Please input recipe name first!");
        return;
    }
    // first add calories value to this recipe
    //the dict is to store every ingredient and its weight in a recipe
    recipe[0] = {"Calories": 0};
    recipe[0]["recipe_name"] = RECIPE_NAME;
    if(isIngredientFinished){
        completeTotal += 3;
    }

    document.getElementById("recipe_progress").innerHTML = "Already finish " + finishStep/completeTotal * 100 +"% of your recipe";
    document.getElementById("btn_submit_recipe").style.display = "none";
}
function backToRecipeName(){
    finishStep -= 1;
    document.getElementById("ingredient").style.display = "none";
    document.getElementById("div_recipe_name").style.display = "block";
    document.getElementById("recipe_progress").innerHTML = "Already finish " + finishStep/completeTotal * 100 +"% of your recipe";
    recipe = [];
    isIngredientFinished = false;
}

function backToIngre(){
    finishStep -= 1;
    document.getElementById("weight_div").style.display = "none";
    document.getElementById("ingredient").style.display = "block";
    document.getElementById("calories_div").style.display = "none";
    document.getElementById("recipe_progress").innerHTML = "Already finish " + finishStep/completeTotal * 100 +"% of your recipe";
    var display = document.getElementById("text_input_display");
    display.removeChild(display.lastElementChild);
    isIngredientFinished = false;
    var inputedIngre = JSON.parse(localStorage.getItem("my_ingredients"));
    var select = document.getElementById("default_ingredient");

    //remove all child
    var child = select.lastElementChild;
    while (child) {
        select.removeChild(child);
        child = select.lastElementChild;
    }

    for(var i = 0;i < inputedIngre.length;i++){
        var option = document.createElement("option");
        option.innerHTML = inputedIngre[i];
        select.appendChild(option);

    }
}
function backToWeight(){
    finishStep -= 1;
    document.getElementById("calories_div").style.display = "none";
    document.getElementById("weight_div").style.display = "block";

    document.getElementById("recipe_progress").innerHTML = "Already finish " + finishStep/completeTotal * 100 +"% of your recipe";
    var display = document.getElementById("text_input_display");
    display.removeChild(display.lastElementChild);
    isIngredientFinished = false;
}
function moveToWeight(){

    const INGREDIENT_NAME = document.getElementById("ingre_input").value;

    if(localStorage.getItem("my_ingredients") !== null){
        var ingredient_list = JSON.parse(localStorage.getItem("my_ingredients"));

        ingredient_list.push(INGREDIENT_NAME);
        localStorage.setItem("my_ingredients", JSON.stringify(ingredient_list));

    }else{
        var ingredient_list = [];
        ingredient_list[0] = INGREDIENT_NAME;
        localStorage.setItem("my_ingredients",JSON.stringify(ingredient_list));
    }

    document.getElementById("ingredient").style.display = "none";
    // create element from: https://www.w3schools.com/js/js_htmldom_nodes.asp
    var text = document.createElement("p");
    text.innerHTML = "Ingredient: " + INGREDIENT_NAME;
    document.getElementById("text_input_display").appendChild(text);

    recipe[0][INGREDIENT_NAME] = 0;

    finishStep += 1;
    document.getElementById("recipe_progress").innerHTML = "Already finish " + finishStep/completeTotal * 100 +"% of your recipe";

    document.getElementById("weight_div").style.display = "block";
    document.getElementById("div_choose_unit").style.display = "block";
}

function chooseDefault(){
    document.getElementById("ingre_input").value = document.getElementById("default_ingredient").value;
}
function moveToCalories(){

    const INGREDIENT_NAME = document.getElementById("ingre_input").value;
    const WEIGHT = document.getElementById("weight_input").value;
    var unit_value = document.getElementsByName("unit").value;
    var ingre_weight = Number(WEIGHT);


    if(isNaN(WEIGHT)){
        //document.getElementById("text_invalid_weight").innerHTML = "Please input number!";
        window.alert("Please input a valid number!");
    }

    if(userType === "naive" || userType === "novice"){
        document.getElementById("help_popover").style.display = "none";
    }

    if(unit_value === "pound"){
        //convert to gram
        ingre_weight = 453.59237 * Number(WEIGHT);
    }

    document.getElementById("weight_div").style.display = "none";

    var text = document.createElement("p");
    text.innerHTML = "Weight: " + ingre_weight;
    document.getElementById("text_input_display").appendChild(text);

    recipe[0][INGREDIENT_NAME] = ingre_weight;

    finishStep += 1;
    document.getElementById("recipe_progress").innerHTML = "Already finish " + finishStep/completeTotal * 100 +"% of your recipe";
    document.getElementById("calories_div").style.display = "block";
    document.getElementById("btn_submit_ingre").style.display = "block";
    document.getElementById("btn_submit_recipe").style.display = "block";
}


function submitIngredient(){

    document.getElementById("btn_add_ingre_recipe").disabled = false;
    document.getElementById("ingredient").style.display = "none";
    document.getElementById("weight_div").style.display = "none";
    document.getElementById("calories_div").style.display = "none";

    var WEIGHT = document.getElementById("weight_input").value;
    var CALORIES = document.getElementById("calor_input").value;

    if(isNaN(CALORIES)){
       // document.getElementById("text_invalid_calories").innerHTML = "Please input number!";
        window.alert("Please input a valid number!");
    }

    var text = document.createElement("p");
    text.innerHTML = "Calories: " + CALORIES;
    document.getElementById("text_input_display").appendChild(text);


    const CALORIES_SUM = Number(WEIGHT) * Number(CALORIES) / 100;

    document.getElementById("ingre_input").value = '';
    document.getElementById("weight_input").value = '';
    document.getElementById("calor_input").value = '';
    if (typeof(Storage) !== "undefined") {
        caloriesTotal += CALORIES_SUM;

    }else {
        document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
    }
    finishStep += 1;
    document.getElementById("recipe_progress").innerHTML = "Already finish " + finishStep/completeTotal * 100 +"% of your recipe";
    document.getElementById("btn_submit_ingre").style.display = "none";
    document.getElementById("div_choose_unit").style.display = "none";
}

function finishRecipe(){

    const CALORIES = caloriesTotal;
    recipe[0]["Calories"] = caloriesTotal;

    // dict to json from https://stackoverflow.com/questions/13743292/how-to-store-a-dictionary-object-in-javascript-localstorage
    if(localStorage.getItem("myMenu") !== null){

        var menuStored = JSON.parse(localStorage.getItem("myMenu"));
        menuStored.push(recipe[0]);
        localStorage.setItem("myMenu", JSON.stringify(menuStored));

    }else{

        localStorage.setItem("myMenu", JSON.stringify(recipe));
    }

    isIngredientFinished = true;

    document.getElementById("recipe").style.display = "none";
    document.getElementById("total_cal").innerHTML = "You will consume "+ CALORIES + " calories";
    document.getElementById("total_cal").style.display = "block";
    document.getElementById("recipe_name").value = '';

    document.getElementById("btn_submit_ingre").style.display = "none";
    document.getElementById("btn_submit_recipe").style.display = "none";

    document.getElementById("div_recipe_name").style.display = "block";
    document.getElementById("text_recipe_name").innerHTML = '';
    var inputDisplay = document.getElementById("text_input_display");

    //remove all child from https://www.geeksforgeeks.org/remove-all-the-child-elements-of-a-dom-node-in-javascript/
    var child = inputDisplay.lastElementChild;
    while (child) {
        inputDisplay.removeChild(child);
        child = inputDisplay.lastElementChild;
    }

    if(localStorage.getItem("check_menu") === null){
        if(userType === "typical" || userType === "advanced"){
            //haven't checked the check menu button before, then make a new progress
            document.getElementById("next_step").innerHTML = "Next step hint: Go and check menu for your saved recipe!";
        }


    }

    //progress
    if(Number(localStorage.getItem("more_recipe")) === 1){

        localStorage.setItem("more_recipe", 2 );
        document.getElementById("completeness_meter_general").innerHTML = "You have created 33.3% to have a complete menu and refrigerator!"
    }else{
        localStorage.setItem("more_recipe",  Number(localStorage.getItem("more_recipe")) + 1);
    }
    document.getElementById("recipe_progress").innerHTML = "Already finish 0% of your recipe";
}
