document.getElementById("search-button").addEventListener("click", function () {
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;

    if (searchText === "") {
        alert("Search field is empty!");
    } else {
        searchField.value = "";
        clearContent();
        loadData(searchText);
    }
});

// clear previous search results
const clearContent = () => {
    const booksContainer = document.getElementById("books-container");
    booksContainer.innerHTML = "";

    const searchInfoDiv = document.getElementById("search-info");
    searchInfoDiv.classList.add("d-none");

    const errorMsgElement = document.getElementById("error-message");
    errorMsgElement.classList.add("d-none");
};

const loadData = (searchText) => {
    toggleSpinner(true);
    const url = `https://openlibrary.org/search.json?q=${searchText}&limit=40`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => displayData(data.docs))
        .catch((err) => displayError(1, err));
};

// display error messages
const displayError = (errId, err = "") => {
    const errorMsgElement = document.getElementById("error-message");
    if (errId === 1) {
        console.log(err);
        errorMsgElement.textContent = "Something went wrong!";
    } else {
        errorMsgElement.textContent = "No result found!";
    }
    errorMsgElement.classList.remove("d-none");
};

// display books data & search info
const displayData = (books) => {
    toggleSpinner(false);

    if (books.length === 0) {
        displayError(2);
    } else {
        const booksContainer = document.getElementById("books-container");
        const totalSearchResult = books.length;
        let totalDataDisplayed = 0;

        books.slice(0, 10).forEach((book) => {
            totalDataDisplayed++;
            const card = createCard(book);
            booksContainer.appendChild(card);
        });

        // update search result count
        const searchInfoDiv = document.getElementById("search-info");
        searchInfoDiv.innerText = `Displaying ${totalDataDisplayed} of ${totalSearchResult} search results.`;
        searchInfoDiv.classList.remove("d-none");
    }
};

// create books cards
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

// toggle visibility of loading spinner
const toggleSpinner = (isLoading) => {
    const spinnerDiv = document.getElementById("loading-spinner");
    spinnerDiv.classList.toggle("d-none", !isLoading);
};
