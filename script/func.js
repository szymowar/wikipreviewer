function getRandomPost(){
    var rand = document.querySelector('#random');
    var url = "https://en.wikipedia.org/wiki/Special:Random";

    rand.addEventListener('click', function(e){
        window.open(url, '_blank');
    });
}

function createResultBox(data) {
    var container = document.querySelector("#result-container"),
        i,linkBox, resBox, title, para, wikiTitle, wikiSnippet, noMatchFound,
        urlRedirect = "https://en.wikipedia.org/wiki/Special:Redirect/page/";

    if(container != null){
        while (container.firstChild){
            container.removeChild(container.firstChild);
                }
            }
    for(i = 0; i < 10; i++){
        linkBox =document.createElement("A");
        resBox = document.createElement("DIV");
        resBox.id = "result-box";
        if(data.query.search[i] == undefined){
            title = document.createElement("H3");
            noMatchFound = document.createTextNode(`${i}` + " match found");
            title.appendChild(noMatchFound);
            resBox.appendChild(title);
            container.appendChild(resBox);
            break;
        }
        title = document.createElement("H3");
        para = document.createElement("P");
        linkBox.setAttribute("href", urlRedirect + data.query.search[i].pageid);
        wikiTitle = document.createTextNode(data.query.search[i].title);
        wikiSnippet = document.createTextNode(data.query.search[i].snippet);
        title.appendChild(wikiTitle);
        para.appendChild(wikiSnippet);
        resBox.appendChild(title);
        resBox.appendChild(para);
        linkBox.appendChild(resBox);
        container.appendChild(linkBox);
            }
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
    success: function(data) {
        createResultBox(data);
    },
    error: function(xhr, status, error){
        console.error(xhr,status,error);
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

    if(e.keyCode == 13 && this.value != ""){
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
