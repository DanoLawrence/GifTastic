$( document ).ready(function() {

var topics = ["Belle", "Ariel", "Princess Aurora", "Cinderella", "Tiana", "Merida", "Mulan"];

function displayGifButtons(){
    $("#gifButtonsView").empty(); 
    for (var i = 0; i < topics.length; i++){
        var gifButton = $("<button>");
        gifButton.addClass("princess");
        gifButton.addClass("btn btn-primary")
        gifButton.attr("data-name", topics[i]);
        gifButton.text(topics[i]);
        $("#gifButtonsView").append(gifButton);
    }
}

function addNewButton(){
    $("#addGif").on("click", function(){
    var princess = $("#princess-input").val().trim();
    if (princess == ""){
      return false; 
    }
    topics.push(princess);

    displayGifButtons();
    return false;
    });
}

function removeLastButton(){
    $("removeGif").on("click", function(){
    topics.pop(princess);
    displayGifButtons();
    return false;
    });
}

function displayGifs(){
    var princess = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + princess + "&api_key=3g9uvyHR4LJUygsnLs7xfFaEbtMhQx2n&limit=10";
    console.log(queryURL); // displays the constructed url
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    .done(function(response) {
        console.log(response); 
        $("#gifsView").empty(); 
        var results = response.data; 
        if (results == ""){
          alert("There isn't a gif for this selected button");
        }
        for (var i=0; i<results.length; i++){

            var gifDiv = $("<div>"); 
            gifDiv.addClass("gifDiv");
            
            var gifRating = $("<p>").text("Rating: " + results[i].rating);
            gifDiv.append(gifRating);
            
            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height_small_still.url); 
            gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); 
            gifImage.attr("data-animate",results[i].images.fixed_height_small.url); 
            gifImage.attr("data-state", "still"); 
            gifImage.addClass("image");
            gifDiv.append(gifImage);
            
            $("#gifsView").prepend(gifDiv);
        }
    });
}

displayGifButtons(); 
addNewButton();
removeLastButton();

$(document).on("click", ".princess", displayGifs);
$(document).on("click", ".image", function(){
    var state = $(this).attr('data-state');
    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});
});
