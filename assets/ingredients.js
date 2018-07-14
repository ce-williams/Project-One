$(document).ready(function(){
    var config = {
        apiKey: "AIzaSyD7X-TdIZpa6Lt1wV0cKwxVr54JupAnAro",
        authDomain: "food-fight-551b3.firebaseapp.com",
        databaseURL: "https://food-fight-551b3.firebaseio.com",
        projectId: "food-fight-551b3",
        storageBucket: "food-fight-551b3.appspot.com",
        messagingSenderId: "624451193630"
      };
      firebase.initializeApp(config);

    $('.collapsible').collapsible();
    var itemList = [];


$("#addBtn").click(function(){
    var addInput = $("#addIng").val();
    itemList.push(addInput);
    console.log(itemList);
    buildList(addInput);
    $("#addIng").val("");
});

$("#clearBtn").click(function(){
    $("#listIng").html("");
    itemList = [];
    console.log(itemList);

});

function buildList(input) {
    $("#listIng").html("");
    itemList.forEach(element => {
        var newDiv = $("<div>");
        newDiv.html(element);
        newDiv.addClass("ingredients");
        console.log(newDiv);
        $("#listIng").prepend(newDiv);

    });

};

    // var queryUrl = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=true&" +
    // var queryUrl =  "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=true&ingredients=apples%2Cflour%2Csugar&limitLicense=true&number=5&ranking=1"


$("#searchBtn").click(function(){
    var queryList = JSON.stringify(itemList);
    console.log(queryList);
    var queryUrl = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=true&ingredients=" + queryList + "&limitLicense=true&number=5&ranking=1";
    console.log(queryUrl);   
    firebase.database().ref().push({
        ingreedients: itemList,
        numIng: itemList.length
      });
    $.ajax({
        url: queryUrl,
        method: "GET",
        headers: { "X-Mashape-Key" : "<key>" }
      }).then(function(response) { 
          console.log(response)
          var newUl = $("<ul>");
          newUl.addClass("collapsible");
          response.forEach(element => {
            var newLi = $("<li>");
            var liHeader = $("<div>");
            var liContent = $("<div>");
            var liSpan = $("<span>");
            var recipeId = element.id;
            var ingredientTable = $("<table>");
            ingredientTable.attr("id", "tableIng");
            liHeader.addClass("collapsible-header");
            liContent.addClass("collapsible-body");
            liHeader.html(element.title);
            var newTableHeaders = $("<tr>");
            var ingredientTh = $("<th>")
            var amountTh = $("<th>");
            var directionsP = $("<p>");
            var missedDiv = $("<p>");
            var missedHeader = $("<h3>");
            missedHeader.html("Missing Ingredients");
            missedDiv.append(missedHeader);
            var listMissed = $("<ul>");
            var missingIng = element.missedIngredients;
                missingIng.forEach(element => {
                    var listItemMissed = $("<li>");
                    var ingredientName = element.name;
                    listItemMissed.html(ingredientName);
                    listMissed.append(listItemMissed);
                });
            missedDiv.append(listMissed);
            ingredientTh.html("Ingredient");
            amountTh.html("Amount Needed");
            newTableHeaders.append(ingredientTh);
            newTableHeaders.append(amountTh);
            ingredientTable.append(newTableHeaders);
            var secondQueryUrl = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + recipeId + "/information?includeNutrition=false";
                $.ajax({
                    url: secondQueryUrl,
                    method: "GET",
                    headers: { "X-Mashape-Key" : "<key>" }
                }).then(function(response) {
                    console.log(response);
                    var ingredientsArray = response.extendedIngredients;
                    console.log(ingredientsArray);
                    ingredientsArray.forEach(element => {
                        var name = element.name;
                        var amount = element.measures.us.amount;
                        var measurement = element.measures.us.unitLong;
                        var newIngRow = $("<tr>");
                        var newNameTd = $("<td>");
                        var newAmountTd = $("<td>");
                        newNameTd.html(name);
                        newAmountTd.html(amount + " " + measurement);
                        newIngRow.append(newNameTd);
                        newIngRow.append(newAmountTd);
                        ingredientTable.append(newIngRow);
                        console.log(ingredientTable);
                    });
                    var directions = response.instructions;
                    console.log(directions);
                    directionsP.html(directions);                  
                    liSpan.append(ingredientTable);
                    liSpan.append(directionsP);
                    liSpan.append(missedDiv);
                    liContent.html(liSpan);
                    newLi.append(liHeader);
                    newLi.append(liContent);
                    newUl.append(newLi);
                    $("#results").append(newUl);
                    $('.collapsible').collapsible();
                });
            
          });
          

          $(".map").append($("<iframe class=\"resp-iframe\" frameborder=\"0\" style=\"border:0\" src=\"https://www.google.com/maps/embed/v1/place?q=grocery%20store&key=AIzaSyA4IHG2Kbd8hg-4L27SXrYgBvnieYeSM4U\" allowfullscreen></iframe>"));
      });

    });









});