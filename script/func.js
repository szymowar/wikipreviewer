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

        var container = document.querySelector("#result-container");
        if(container != null){
            while (container.firstChild){
                container.removeChild(container.firstChild);
                    }
                }

        for(var i = 0; i < 10; i++){
            var title = document.createElement("H3");
            var para = document.createElement("P");
            var wikiTitle = document.createTextNode(data.query.search[i].title);
            var wikiSnippet = document.createTextNode(data.query.search[i].snippet);
            title.appendChild(wikiTitle);
            para.appendChild(wikiSnippet);
            document.getElementById("result-container").appendChild(title);
            document.getElementById("result-container").appendChild(para);
                }
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
function getWikiPost(e){
    if(e.keyCode == 13){
            searchWiki(this.value);
        }
}




$(document).ready(function () {
    var searchValue = document.querySelector('#searchBar');
    var goBtn = document.querySelector('#searchBtn');
    searchValue.addEventListener("keydown", getWikiPost );
    goBtn.addEventListener("click", function (e){
            searchWiki(searchValue.value);
    });
    getRandomPost();

});
