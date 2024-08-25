let inputEle = document.getElementById("searchInput");
let booksURL = "https://apis.ccbp.in/book-store?title=";
let spinner = document.getElementById("spinner");
let heading = document.getElementById("heading");
let searchResults = document.getElementById("searchResults");

function createAndAppend(f) {
    let cardrows = document.getElementById("cardrows");

    let cardcol = document.createElement("div");
    cardcol.classList.add("text-center", "col-5", "m-1");
    cardrows.appendChild(cardcol);

    let imgELe = document.createElement("img");
    imgELe.src = f.imageLink;
    imgELe.classList.add("w-100");
    cardcol.appendChild(imgELe);

    let parEle = document.createElement("p");
    parEle.textContent = f.author;
    cardcol.appendChild(parEle);
}





function load(abc) {
    spinner.classList.add("d-none");
    heading.textContent = "Popular Books";
    let cardrows = document.createElement("div");
    cardrows.classList.add("row");
    cardrows.id = "cardrows";
    searchResults.appendChild(cardrows);
    for (let f of abc) {
        console.log(f.author);
        createAndAppend(f);
    }
}


inputEle.addEventListener("keydown", function(event) {
    spinner.classList.remove("d-none");
    if (event.key === "Enter") {
        let options = {
            method: "GET"
        };
        let newurl = booksURL + event.target.value;
        fetch(newurl, options)
            .then(function(response) {
                return response.json();
            }).then(function(jsonData) {
                console.log(jsonData.search_results.length);
                if (jsonData.search_results.length !== 0) {
                    load(jsonData.search_results);
                } else {
                    spinner.classList.add("d-none");
                    heading.textContent = "No Results found";
                }
            });
    }
});
