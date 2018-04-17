var LIMIT = 10;

function getRandomPost() {
    "use strict";
    var rand = document.querySelector('#random'),
        url = "https://en.wikipedia.org/wiki/Special:Random";

    rand.addEventListener('click', function () {
        window.open(url, '_blank');
    });
}

function cleanContent(str) {
    "use strict";
	   var reg = /<.*?>/g;
    str = str.replace(reg, '');
    return str;
}

function deleteItems(container) {
    "use strict";
    if (container !== null) {
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
    }
}

function createResultBox(data) {
    "use strict";
    var container = document.querySelector("#result-container"),
        i,
        linkBox,
        resBox,
        title,
        para,
        wikiTitle,
        wikiSnippet,
        noMatchFound,
        urlRedirect = "https://en.wikipedia.org/wiki/Special:Redirect/page/";

    deleteItems(container);

    for (i = 0; i < 10; i += 1) {
        linkBox = document.createElement("A");
        resBox = document.createElement("DIV");
        resBox.id = "result-box";
        if (data.query.search[i] === undefined) {
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
        wikiSnippet = cleanContent(data.query.search[i].snippet);
        wikiSnippet = document.createTextNode(wikiSnippet);
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
        formatversion: 2,
        suggest: 1
    },
    dataType: 'jsonp',
    success: function(data) {
        createResultBox(data);
    },
    error: function(xhr, status, error){
        console.error(error);
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
    var clearBtn = document.querySelector('#searchBtn');
    var cont = document.querySelector('#result-container');
        searchValue.addEventListener("keydown", getWikiPost);
        searchValue.addEventListener("input", function(){
            $.ajax({
            url: 'https://en.wikipedia.org/w/api.php',
            data: {
                action: 'opensearch',
                limit: LIMIT,
                search: searchValue.value,
                format: 'json'
            },
            dataType: 'jsonp',
            success: function (data){
                var container = document.querySelector("#autocompleteContainer"),



                    deleteItems(container);
                    if (data[1] === undefined) {
                        return false;
                    } else {
                        var sv = searchValue.value;
                        for(var i = 0; i < data[1].length; i += 1) {
                            if(searchValue.value.toUpperCase() == data[1][i].substr(0, sv.length).toUpperCase()) {
                                var autocompleteBox = document.createElement("DIV");
                                    autocompleteBox.innerHTML = "<strong>" + data[1][i].substr(0,sv.length) + "</strong>";
                                    autocompleteBox.innerHTML += data[1][i].substr(sv.length);
                                    autocompleteBox.innerHTML += "<input type='hidden' value='" + data[1][i] +"'>";
                                    container.appendChild(autocompleteBox);
                            }
                        container.addEventListener("click", function(e) {
                            searchValue.value = e.toElement.innerText;
                            deleteItems(container);
                        });
                    }
                };
            }});
        })
        clearBtn.addEventListener("click", function (e) {
            deleteItems(cont);
    });
    getRandomPost();
});
