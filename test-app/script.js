//page element vars
let searchBox;
let searchBtn;
let resultsTable;
let amountBox;
let unitOptions;
let refineSearchBtn;
let altSearchBtn;
let modal;
let modalContent;

let ingredientRef;
let potentialUnits = [];
let ingredientData = [];
let apiResults = [];
let firstApiResult;
let serachResults = [];
let firstSearchResult;
let recipeResults = [];

let searchText = "";
let firstRefResult;
let ingredientId;
let amount = 1;
let selectedUnit = "serving";

const apiKey = "YOUR_API_KEY_HERE";

window.onload = function() {
    searchBox = document.querySelector("#searchBox");
    searchBtn = document.querySelector("#searchBtn");
    resultsTable = document.querySelector("#resultsTable");
    amountBox = document.querySelector("#amountBox");
    amountBox.value = amount;
    unitOptions = document.querySelector("#unitOptions");
    refineSearchBtn = document.querySelector("#refineSearchBtn");
    altSearchBtn = document.querySelector("#altSearchBtn");
    modal = document.querySelector("#modal");
    modalContent = document.querySelector("#modalContent");

    //event listeners
    // searchBox.addEventListener("input", function() {

    // });

    searchBtn.addEventListener("click", function() {
        //set searchText
        searchText = searchBox.value;
        //show loading modal until the last "then()"
        changeElementVisibility(modal, "block");
        //call api fetch to get ingredientRef
        fetch(`https://api.spoonacular.com/food/ingredients/search?query=${searchText}&addChildren=false&apiKey=${apiKey}`, { method: "get" })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            firstRefResult = data.results[0];
            ingredientId = firstRefResult.id;
            //call api fetch to get ingredientDetail using ref id from prev
            return fetch(`https://api.spoonacular.com/food/ingredients/${ingredientId}/information?amount=1&unit=serving&apiKey=${apiKey}`, { method: "get" })
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            //console.log(data);
            apiResults.push(data);
            firstApiResult = data;
            //fill in dropdown with possibleUnits
            document.querySelector("#unitOptions").innerHTML = "";  
            data.possibleUnits.forEach(um => {
                let op = document.createElement("option");
                op.value = um;
                op.innerHTML = um;
                document.querySelector("#unitOptions").appendChild(op);
            });          
            //reset serving as selected option to match search results
            unitOptions.value = "serving";
            //console.log(JSON.stringify(data));
            const searchResult = new SearchResult(data);
            firstSearchResult = searchResult;
            const tblMarkup = generateTable([firstSearchResult]);
            resultsTable.innerHTML = tblMarkup;
            changeElementVisibility(modal, "none");
        })
        .catch(function(err) {
            console.log(err);
            changeElementVisibility(modal, "none");
        })
        //set results and first result. generate table markup and display
    });

    refineSearchBtn.addEventListener("click", function() {
        //validation
        if (isNaN(amountBox.value) || unitOptions.value === "" || isNaN(ingredientId)) {
            alert("make sure unit parameters are set and a record exists in the table before refining search");
            return;
        }
        amount = parseInt(amountBox.value);
        selectedUnit = unitOptions.value;
        //call ingredientDetail api with um params
        fetch(`https://api.spoonacular.com/food/ingredients/${ingredientId}/information?amount=${amount}&unit=${selectedUnit}&apiKey=${apiKey}`, { method: "get" })        
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            //console.log(JSON.stringify(data));
            apiResults = [];
            apiResults.push(data);
            firstApiResult = data;

            const searchResult = new SearchResult(data);
            const tblMarkup = generateTable([searchResult]);
            resultsTable.innerHTML = tblMarkup;
        })
        .catch(function(err) {
            console.log(err);
        })
    });

    altSearchBtn.addEventListener("click", function() {
        if (firstSearchResult === undefined) {
            alert("make sure unit parameters are set and a record exists in the table before refining search");
            return;
        }
        fetch(`https://api.spoonacular.com/recipes/findByNutrients?maxCalories=${firstSearchResult.calories}&maxCarbs=${firstSearchResult.carbs}&apiKey=${apiKey}`)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            //console.log(JSON.stringify(data));
            const tblMarkup = generateTable(data);
            resultsTable.innerHTML = tblMarkup;
        })
    });

} 

// table object (flattens info api result)
class SearchResult {
    constructor(ingredientResult) {
        this.ingredientId = ingredientResult.id;
        this.name = ingredientResult.name;
        this.amount = ingredientResult.amount;
        this.unit = ingredientResult.unit;
        const caloricBreakdown = ingredientResult.nutrition.caloricBreakdown;
        if (caloricBreakdown !== undefined) {
            this.percentProtein = caloricBreakdown.percentProtein;
            this.percentFat = caloricBreakdown.percentFat;
            this.percentCarbs = caloricBreakdown.percentCarbs;
        } else {
            this.percentProtein = 0;
            this.percentFat = 0;
            this.percentCarbs = 0;
        }        
        const nutrientArr = ingredientResult.nutrition.nutrients;
        this.calories = this.findPropValue(nutrientArr, "Calories");
        this.sugar = this.findPropValue(nutrientArr, "Sugar");
        this.cholesterol = this.findPropValue(nutrientArr, "Cholesterol");
        this.transFat = this.findPropValue(nutrientArr, "Trans Fat");
        this.fat = this.findPropValue(nutrientArr, "Fat");
        this.fiber = this.findPropValue(nutrientArr, "Fiber");
        this.carbs = this.findPropValue(nutrientArr, "Carbohydrates");
        this.protien = this.findPropValue(nutrientArr, "Protein");
        this.sodium = this.findPropValue(nutrientArr, "Sodium");
    }

    findPropValue(nutrientArr, propName) {
        let val = 0;
        nutrientArr.forEach(item => {
            if (item.name === propName) {
                val = parseFloat(item.amount);
            }
        });
        return val;
    }
}


// ui helper functions
//-----------------------------------------------
function generateTable(objArray) {
    //set table header row
    if (objArray.length === 0) {
        alert("sorry, your search returned 0 results");
        return "";
    }

    let tableMarkup = "<tr>";
    let firstRow = objArray[0];
    let propNames = Object.keys(firstRow);
    
    propNames.forEach(propName => {
        tableMarkup += "<th>" + propName + "</th>";
    });
    tableMarkup += "<tr>";

    //populate table
    objArray.forEach(item => {
        tableMarkup += "<tr>";
        propNames.forEach(propName => {
            tableMarkup += "<td>" + item[propName] + "</td>";
        });
        tableMarkup += "</tr>";
    });

    return tableMarkup;
}

function changeElementVisibility(htmlElement, displayStyle) {
    htmlElement.style.display = displayStyle;
}