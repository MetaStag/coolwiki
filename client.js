// https://glitch.com/edit/#!/wikipedia-search-starter?path=client.js%3A36%3A32
// https://www.geeksforgeeks.org/working-with-apis-in-javascript/
// https://en.wikipedia.org/wiki/Special:ApiSandbox#action=parse&format=json&page=Perseus

function apiCall() {
    const url = `https://en.wikipedia.org/w/api.php?action=parse&format=json&origin=*&page=${document.getElementById('page').value}`;
    fetch(url).then(r=> r.json()).then(data=> { display(data)});
}

function display(data) {
    document.getElementById("heading").innerHTML = data.parse.title;
    //console.log(data.parse.text['*']);
    document.getElementById("content").innerHTML = data.parse.text['*'];
}

// Enter key event for box
window.onload = function() {
    document.getElementById("page").addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            apiCall();
    }
    })
}