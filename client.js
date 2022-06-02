function page(title) {
    document.getElementById('results').style.display = 'none';
    const request = `https://en.wikipedia.org/w/api.php?action=parse&format=json&origin=*&page=${title}`;
    fetch(request).then(r=> r.json()).then(data=> { displayPage(data)});
}

function search(query) {
    document.getElementById('page').style.display = 'none';
    const request = `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&prop=utf8=1&origin=*&&srinfo=&srprop=snippet&srsearch=${query}`;
    fetch(request).then(r=> r.json()).then(data=> { displaySearch(data)});
}

function displaySearch(data) {
    let display = '';
    for (let i = 0; i < 10; i++){
        let title = data.query.search[i].title;
        title = title.replace(' ', '_')
        display += `<h3><a onclick=page('${title}')>${title}</a></h3>`;
        display += `<p>${data.query.search[i].snippet}</p>`;
        display += `<hr>`;
    }
    document.getElementById('results').style.display = 'block';
    document.getElementById('results').innerHTML = display;

}

function displayPage(data) {
    let display = '';
    let text = data.parse.text['*'];
    text = text.replaceAll('href="', 'href="https://en.wikipedia.org');
    text = text.replaceAll('src="', 'src="https:');
    document.getElementById('page').style.display = 'block';
    display += `<h1>${data.parse.title}</h1>`;
    display += text;
    document.getElementById("page").innerHTML = display;
}


// Enter key event for search box
window.onload = function() {
    document.getElementById('search').addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            search(document.getElementById('search').value);
    }
    })
}