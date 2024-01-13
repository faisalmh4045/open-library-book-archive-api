document.getElementById("search-button").addEventListener("click", function () {
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    searchField.value = "";
    loadData(searchText);
});

const loadData = (searchText) => {
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => displayData(data.docs))
        .catch((err) => console.log(err));
};

const displayData = (books) => {
    const booksContainer = document.getElementById("books-container");
    books.forEach((book) => {
        const card = createCard(book);
        booksContainer.appendChild(card);
    });
};

const createCard = (book) => {
    const { author_name, cover_i, title, publisher, first_publish_year } = book;

    const cardDiv = document.createElement("div");
    cardDiv.className = "col";

    cardDiv.innerHTML = `
        <div class="card mb-3 h-100 p-3">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${
                        cover_i
                            ? `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`
                            : `images/avatar_book-sm.png`
                    }"
                        class="w-100 img-fluid rounded-start rounded-end" alt="cover image of a book">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${title}</h5>
                        <p class="card-text">by ${
                            author_name ? author_name[0] : "Unknown Author"
                        }</p>
                        <p class="card-text"><small class="text-body-secondary">First published in ${
                            first_publish_year ? first_publish_year : "N/A"
                        }</small>
                        </p>
                        <p class="card-text">Publisher: ${
                            publisher ? publisher[0] : "unknown"
                        }</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    return cardDiv;
};
