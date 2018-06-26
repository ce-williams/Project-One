$(document).ready(function(){

    var itemList = [];


$("#addBtn").click(function(){
    var addInput = $("#addIng").val();
    itemList.push(addInput);
    console.log(itemList);
    buildList(addInput);

});


function buildList(input) {
    $("#listIng").html("");
    itemList.forEach(element => {
        var newDiv = $("<div>");
        newDiv.html(element);
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



      });

    });









});