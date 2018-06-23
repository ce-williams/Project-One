$(document).ready(function(){

    var itemList = [];


$("#addBtn").click(function(){
    var addInput = $("#addIng").val();
    itemList.push(addInput);
    buildList(addInput);

});


function buildList(input) {
    itemList.forEach(element => {
        var newDiv = $("<div>");
        newDiv.html(element);
        $("listIng").prepend(newDiv);

    });

};

    // var queryUrl = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?"
    var queryUrl =  "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=true&ingredients=apples%2Cflour%2Csugar&limitLicense=true&number=5&ranking=1"


$("#testId").click(function(){
    $.ajax({
        url: queryUrl,
        method: "GET",
        headers: { "X-Mashape-Key" : "2vLBQqCljEmsh3rlFN8Xw4wyX9Vwp1EdHlbjsnCgsI00qHVvuj" }
      }).then(function(response) { 
          console.log(response)



      });

    });




    //   https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=true&ingredients=apples%2Cflour%2Csugar&limitLicense=true&number=5&ranking=1









});