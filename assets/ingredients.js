$(document).ready(function(){
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
    $.ajax({
        url: queryUrl,
        method: "GET",
        headers: { "X-Mashape-Key" : "2vLBQqCljEmsh3rlFN8Xw4wyX9Vwp1EdHlbjsnCgsI00qHVvuj" }
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
            ingredientTh.html("Ingredient");
            amountTh.html("Amount Needed");
            newTableHeaders.append(ingredientTh);
            newTableHeaders.append(amountTh);
            ingredientTable.append(newTableHeaders);
            var secondQueryUrl = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + recipeId + "/information?includeNutrition=false";
                $.ajax({
                    url: secondQueryUrl,
                    method: "GET",
                    headers: { "X-Mashape-Key" : "2vLBQqCljEmsh3rlFN8Xw4wyX9Vwp1EdHlbjsnCgsI00qHVvuj" }
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
                    liContent.html(liSpan);
                    newLi.append(liHeader);
                    newLi.append(liContent);
                    newUl.append(newLi);
                    $("#results").append(newUl);
                    $('.collapsible').collapsible();
                });
            
          });
          


      });

    });









});