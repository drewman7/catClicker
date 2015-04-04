// animal information
var animals = {
  "cats": [
    {
      "name": "Bob the Cat",
      "counter": 0,
      "description": "Standing in the middle of the floor.",
      "image": "images/bob_cat.jpg"
    },
    {
      "name": "Bashful the Cat",
      "counter": 0,
      "description": "Hiding behind the rungs.",
      "image": "images/bashful_cat.jpg"
    },
    { 
      "name": "Sleepy and Slumber",
      "counter": 0,
      "description": "Both taking a nap.",
      "image": "images/sleepy_slumber_cat.png"
    },
    { 
      "name": "Playful",
      "counter": 0,
      "description": "Let's play.",
      "image": "images/playful_cat.jpg"
    },
    { 
      "name": "Bright Eyes",
      "counter": 0,
      "description": "Deep look into the eyes.",
      "image": "images/bright_eyes_cat.jpg"
    }
  ]
};

var headerText = "Select a Cat to from the List";

animals.display = function() {
  //$('#cat-header').text("Select a Cat Name below:");
  $('#cat-header').html('<h3 id="cat-header">Select a Cat Name below:</h3>');
  $('#cat-header').append('<ul id="cat-body"></ul>');
  $('#counter-header').remove();
  $('#counter-number').remove();
  //$('#cat-body').append('<img id="cat-pic" src="images/cat.jpg" width="270">');

  $('<div id="catContainer2" class="cat-container"></div>').insertAfter('#catContainer');
  $('#catContainer2').append('<h3 id="cat-box"></h3>');
  $('#cat-box').html('<h3 id="cat-header2">' + headerText +'</h3>');
  $('#cat-header2').append('<ul id="cat-body2"></ul>');
  $('<p id="cat-pic2"></p>').insertAfter('#cat-header2');
  $('<p id="counter-header2">(on the left)</p>').insertAfter('#cat-header2');
  $('<p id="counter-number2"></p>').insertAfter('#counter-header2');
};

animals.display();

// Let's loop over the numbers in our array
for (var i = 0; i < animals.cats.length; i++) {
// This is the number we're on...
    var cat = animals.cats[i];
// We're creating a DOM element for the number
    var elem = document.createElement('p');
    elem.textContent = cat.name;
// ... and when we click, alert the value of `num`
    elem.addEventListener('click', (function(catNum) {
        return function() {
            //alert(catNum);
            showCat(catNum);
        };
    })(i));
    
    $('#cat-body').append(elem);
};



//$('#catContainer').append('<div id="catContainer2" class="cat-container"></div>');
function showCat (catNum) {
  //$('#cat-header2').html('<h3 id="cat-header2">Now click on the Cat!</h3>');
  
  $('#cat-header2').text('Now click on ' + animals.cats[catNum].name + '!');
  $('#cat-pic2').remove();
  $('<img id="cat-pic2" src=' + animals.cats[catNum].image + ' width="270">').insertAfter('#cat-header2');
  //$('#cat-body2').append('<img id="cat-pic2" src=' + animals.cats[4].image + ' width="270">');
  $('#counter-header2').text('Number of Clicks:');
  $('#counter-number2').text(animals.cats[catNum].counter);
  //$('<h3 id="counter-header2">Number of Clicks:</h3>').insertAfter('#cat-header2');
  //$('<h3 id="counter-number2">0</h3>').insertAfter('#counter-header2');
  //$('#counter-number2').text(counter2);
  $('#cat-pic2').click(function(e) {
  animals.cats[catNum].counter = animals.cats[catNum].counter + 1;
  $('#counter-number2').text(animals.cats[catNum].counter);
});

};

$('#cat-pic').click(function(e) {
  counter = counter + 1;
  $('#counter-number').text(counter);
});

$('#cat-pic2').click(function(e) {
  counter2 = counter2 + 1;
  $('#counter-number2').text(counter2);
});


function loadData() {

    var $catHeader = $('#cat-header');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');
    var $wikiHeaderElem = $('#wikipedia-header');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    var locStreet = $( "#street" ).val();
    var locCity = $( "#city" ).val();
    console.log(locStreet);

    $('.cat-container').append('<img id="cat-pic" src="images/cat.jpg" width="270">');
    $('.cat-container').append('<p>test</p>');
    
    $greeting.text('So, you want to live at ' + locStreet + ', ' + locCity + '?');
    $body.append('<img class="bgimg" src="https://maps.googleapis.com/maps/api/streetview?size=400x400&location=' + locStreet + ',' + locCity + '">');

    //NYT API
    //$.getJSON( "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=new+york+times&page=2&sort=oldest&api-key=d07b5097c616edd54dcb346b315766fd:14:71646048", function( data ) {
    //$.getJSON( "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + locCity + "&sort=newest&api-key=d07b5097c616edd54dcb346b315766fd:14:71646048", function( data ) {
    var nytArticles = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + locCity + "&sort=newest&api-key=d07b5097c616edd54dcb346b315766fd:14:71646048";
    $.getJSON( nytArticles, function( data ) {

      var items = [];
      var webLinkTitle = "";
      var firstParagraph = "";

      $nytHeaderElem.text('New York Times Articles About ' + locCity + ':');

      $.each( data.response.docs, function( key, val ) {
        webLinkTitle = "<a href='" + val.web_url + "'>" + val.headline.main + "</a>";
        if (val.snippet === null) {
          firstParagraph = "<p></p>";
        } else {
          firstParagraph = "<p>" + val.snippet + "</p>";
        };
        items.push( "<li class='article'>" + webLinkTitle + firstParagraph + "</li>" );
        //items.push( "<ul id='" + key + "'>" + val.headline.main + "</ul>" );
      });
      //console.log(data.response);
      $nytElem.append();
      $nytElem.append(items);
      //$( "<ul/>", {
      //  "class": "my-new-list",
      //  html: items.join( "" )
      //}).appendTo( "body" );
    })
      .error(function() {
        $nytHeaderElem.text('Error Loading New York Times Articles');
    });

    //Wikipedia API
    var wikiArticles = "http://en.wikipedfdffdfdfia.org/w/api.php?format=json&action=opensearch&search=" + locCity + "&callback=wikiCallback";
    //console.log(wikiArticles);
    $.ajax({
      url: wikiArticles, 
      dataType: "jsonp",
      success: function( data ) {
        console.log(data[1]);
      var wikiItems = [];
      var webLinkWiki = "";
      var wikiPageId = [];

      $wikiHeaderElem.text('Wikipedia Articles About ' + locCity + ':');

      $.each( data[1], function( key, val ) {
        console.log(val);
        webLinkWiki = "<a href='http://en.wikipedia.org/wiki/" + val + "'>" + val + "</a>";
        //console.log(webLinkWiki);
        wikiItems.push( "<li>" + webLinkWiki + "</li>" );
      });

      $wikiElem.append();
      $wikiElem.append(wikiItems);
    }
    })
      .error(function() {
        $wikiHeaderElem.text('Error Loading Wikipedia Articles');
    });

    return false;
};

$('#form-container').submit(loadData);
