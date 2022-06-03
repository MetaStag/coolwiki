// working with the api

// fetch wikipedia search results
function search(query) {
  document.getElementById("page").style.display = "none";
  const request = `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&prop=utf8=1&origin=*&&srinfo=&srprop=snippet&srsearch=${query}`;
  fetch(request)
    .then((r) => r.json())
    .then((data) => {
      displaySearch(data);
    });
}

// fetch wikipedia page
function page(title) {
  document.getElementById("results").style.display = "none";
  document.getElementById("results-parent").style.display = "none";
  const request = `https://en.wikipedia.org/w/api.php?action=parse&format=json&origin=*&page=${title}`;
  fetch(request)
    .then((r) => r.json())
    .then((data) => {
      displayPage(data);
    });
}

// display search results
function displaySearch(data) {
  let display = "";
  for (let i = 0; i < 10; i++) {
    let title = data.query.search[i].title;
    title = title.replaceAll(" ", "_");
    display += `<h3><a onclick=page("${title}")>${title}</a></h3>`;
    display += `<p>${data.query.search[i].snippet}</p>`;
    display += `<hr>`;
  }
  document.getElementById("results").style.display = "block";
  document.getElementById("results").innerHTML = display;
}

// display wikipedia page
function displayPage(data) {
  let display = "";
  let text = data.parse.text["*"];
  text = text.replaceAll('href="', 'href="https://en.wikipedia.org'); // make links work
  text = text.replaceAll('src="', 'src="https:'); // make images work
  document.getElementById("page").style.display = "block";
  display += `<h1>${data.parse.title}</h1>`;
  display += text;
  document.getElementById("page").innerHTML = display;
}

// click on the 'coolwiki' heading to clear screen
function refresh() {
  document.getElementById("page").style.display = "none";
  document.getElementById("results").style.display = "none";
  document.getElementById("search").value = "";
}

// Enter key event for search box
window.onload = function () {
  document
    .getElementById("search")
    .addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        search(document.getElementById("search").value);
      }
    });
};
