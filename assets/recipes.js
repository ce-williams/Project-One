$(document).ready(function(){
    $('.collapsible').collapsible();


$("#recipeBtn").click(function(){
    var queryRecipe = $("#recipeName").val()
    console.log(queryRecipe);
    var queryUrl = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?&instructionsRequired=true&limitLicense=true&number=5&query=" + queryRecipe;
    console.log(queryUrl);   
    $.ajax({
        url: queryUrl,
        method: "GET",
        headers: { "X-Mashape-Key" : "2vLBQqCljEmsh3rlFN8Xw4wyX9Vwp1EdHlbjsnCgsI00qHVvuj" }
      }).then(function(response) { 
          console.log(response)
          var newUl = $("<ul>");
          newUl.addClass("collapsible");
          response.results.forEach(element => {
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
                    $("#listRecipe").html(newUl);
                    $('.collapsible').collapsible();
                });
            
          });
          


      });

    });









});