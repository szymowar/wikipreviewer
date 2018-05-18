'use strict';
var __GLOBAL_WV__ = {};
    __GLOBAL_WV__.LIMIT = 10;
    __GLOBAL_WV__.AUTOCOMDATA = 1;
    __GLOBAL_WV__.KEY_CODE_DOWN_ARROW = 40;
    __GLOBAL_WV__.KEY_CODE_UP_ARROW = 38;
    __GLOBAL_WV__.KEY_CODE_ENTER_KEY = 13;

function getWikiPost(e){
    var searchValue = document.querySelector('#searchBar');
    if(e.keyCode == __GLOBAL_WV__.KEY_CODE_ENTER_KEY && searchValue.value != ""){
        e.preventDefault();
        searchWiki(searchValue.value);
        }
}

function clickAutocomplete(e) {
    var svalue = document.querySelector("#searchBar");
    svalue.value = e.toElement.innerText;
    deleteItems(container);
}

function removeActive(x) {
    for(var i = 0; i < x.length; i++){
        x[i].classList.remove("autocomplete-active");
    }
}

function addActive(x,currentFocus) {
    if(!x){
        return false;
    }
    removeActive(x);
    if (currentFocus >= x.length){
        currentFocus = 0;
    }
    if(currentFocus < 0) {
        currentFocus = (x.length - 1);
    }
    console.log(currentFocus, x.length);
    x[currentFocus].classList.add("autocomplete-active");
}

function getRandomPost() {
    var rand = document.querySelector('#random'),
        url = "https://en.wikipedia.org/wiki/Special:Random";

    rand.addEventListener('click', function () {
        window.open(url, '_blank');
    });
}

function cleanContent(str) {
	   var reg = /<.*?>/g;
    str = str.replace(reg, '');
    return str;
}

function deleteItems(container) {
    if (container !== null) {
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
    }
}

function createResultBox(data) {
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

    for (i = 0; i < __GLOBAL_WV__.LIMIT; i += 1) {
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

function autocompleteBoxBuild (data) {
        var currentFocus = -1;
        var container = document.querySelector("#autocompleteContainer"),
            aD = data[1];
            deleteItems(container);
            if (aD === undefined) {
                return;
            } else {
                var sv = data[0];
                for(var i = 0; i < aD.length; i += 1) {
                    var data_autocom = aD[i].substr(0,sv.length);
                    if(sv.toUpperCase() == data_autocom.toUpperCase()) {
                        var autocompleteBox = document.createElement("DIV");
                            autocompleteBox.setAttribute("class", "autocomplete")
                            autocompleteBox.innerHTML = "<strong>" + data_autocom + "</strong>";
                            autocompleteBox.innerHTML += aD[i].substr(sv.length);
                            container.appendChild(autocompleteBox);
                    }
            }
            var searchB = document.getElementById("searchBar");
            searchB.addEventListener("keydown", function(e) {

                var x = container.getElementsByClassName("autocomplete")
                if (e.keyCode == __GLOBAL_WV__.KEY_CODE_DOWN_ARROW){
                    currentFocus++;
                    addActive(x, currentFocus);
                }else if (e.keyCode == __GLOBAL_WV__.KEY_CODE_UP_ARROW) {
                    currentFocus--;
                    addActive(x, currentFocus);
                }else if (e.keyCode == __GLOBAL_WV__.KEY_CODE_ENTER_KEY) {
                    searchB.value = x[currentFocus].innerText;
                    deleteItems(container);
                }


        });
            container.addEventListener("click", clickAutocomplete);
        };
        }


function autocomplete(e) {
    var searchValue = document.querySelector('#searchBar');
    $.ajax({
    url: 'https://en.wikipedia.org/w/api.php',
    data: {
        action: 'opensearch',
        limit: __GLOBAL_WV__.LIMIT,
        search: searchValue.value,
        format: 'json'
    },
    dataType: 'jsonp',
    success: autocompleteBoxBuild,
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
        formatversion: 2,
        suggest: 1
    },
    dataType: 'jsonp',
    success: createResultBox,
    error: function(xhr, status, error){
        console.error(error);
    }
    });
}

function active(){
    var sb = document.querySelector('#searchBar');
    if (sb.value == "Search...") {
        sb.value = "";
        sb.placeholder="Search...";
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
    var search = document.querySelector('#searchBar');
    var clearBtn = document.querySelector('#searchBtn');
    var cont = document.querySelector('#result-container');
        searchValue.addEventListener("input", autocomplete);
        searchValue.addEventListener("keydown", getWikiPost);
        clearBtn.addEventListener("click", function (e) {
            deleteItems(cont);
    });
    getRandomPost();
});
