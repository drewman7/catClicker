
var counter = 0;
var counter2 = 0;

$('#cat-header').text("Directions:  Click on Cat1!");
$('#cat-header').append('<h3 id="cat-body"></h3>');
$('#cat-body').append('<img id="cat-pic" src="images/cat.jpg" width="270">');
$('#counter-number').text(counter);

//$('#catContainer').append('<div id="catContainer2" class="cat-container"></div>');
$('<div id="catContainer2" class="cat-container"></div>').insertAfter('#catContainer');
$('#catContainer2').append('<h3 id="cat-header2">Directions:  Click on Cat2!</h3>');
$('#cat-header2').append('<h3 id="cat-body2"></h3>');
$('#cat-body2').append('<img id="cat-pic2" src="images/cat2.jpg" width="270">');
$('<h3 id="counter-header2">Number of Clicks:</h3>').insertAfter('#cat-header2');
$('<h3 id="counter-number2">0</h3>').insertAfter('#counter-header2');
$('#counter-number2').text(counter2);


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
