function getRandomPost(){
    var rand = document.querySelector('#random');
    var url = "https://en.wikipedia.org/wiki/Special:Random";

    rand.addEventListener('click', function(e){
        window.open(url, '_blank');
    });
}

function searchWiki (search) {
    $.ajax({
    url: 'https://en.wikipedia.org/w/api.php',
    data: {
        action: 'query',
        list: 'search',
        srsearch: search,
        format: 'json',
        formatversion: 2
    },
    dataType: 'jsonp',
    success: function (data) {
        console.log('title', data.query.search[0].snippet);
            }
    });
}

function active(){
    var sb = document.querySelector('#searchBar');

    if (sb.value == "Search...") {
        sb.value = "";
        sb.placeholder="Search..";
    }
}

function inactive(){
    var sb = document.querySelector('#searchBar');

    if (sb.value == "") {
        sb.placeholder="";
        sb.value = "Search...";
    }
}




$(document).ready(function () {
    var searchValue = document.querySelector('#searchBar');
    searchValue.addEventListener("keydown", function (e){
        if(e.keyCode == 13){
                searchWiki(searchValue.value);
            }
    });
    getRandomPost();

});
