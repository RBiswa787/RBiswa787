import { getAllCategories, getAllInCategory, filterByKeyword, getSortedByRating, getSortedByPrice } from "./controller.js";
var load = 12;
var sortByReview = false;
var sortByPrice = false;
function populateCategoryHeader() {
    const CATEGORY_HEADER = document.getElementById("category-main");
    var categories = getAllCategories();
    categories.slice(0, 7).forEach(category => {
        const ANCHOR = document.createElement("a");
        ANCHOR.href = "./category.html";
        ANCHOR.style.textDecoration = "none";
        ANCHOR.style.color = "black";
        ANCHOR.addEventListener("mouseenter", () => {
            ANCHOR.style.color = "red";
        });
        ANCHOR.addEventListener("mouseleave", () => {
            ANCHOR.style.color = "black";
        });
        const SPAN = document.createElement("span");
        SPAN.innerText = category;
        ANCHOR.style.marginRight = "2%";
        SPAN.addEventListener("click", () => {
            window.localStorage.setItem("curr_category", category);
        });
        ANCHOR.appendChild(SPAN);
        CATEGORY_HEADER === null || CATEGORY_HEADER === void 0 ? void 0 : CATEGORY_HEADER.appendChild(ANCHOR);
    });
    const ICON = document.createElement("i");
    ICON.className = "fa-solid fa-caret-down";
    ICON.style.color = "#707070";
    CATEGORY_HEADER === null || CATEGORY_HEADER === void 0 ? void 0 : CATEGORY_HEADER.appendChild(ICON);
    const CATEGORY_HOLDER = document.getElementById("category-holder-text");
    console.log(window.localStorage.getItem("curr_category"));
    CATEGORY_HOLDER.innerText = window.localStorage.getItem("curr_category");
}
function populateCategoryItems(products, till) {
    const CONTENT = document.getElementById("content");
    console.log(products);
    const PRODUCTS = products;
    PRODUCTS['data'].slice(till - 12, till).forEach(product => {
        const CARD = document.createElement("div");
        CARD.className = "card";
        CARD.style.width = "12em";
        CARD.style.height = "15em";
        CARD.style.alignItems = "center";
        CARD.style.padding = "2%";
        const IMG = document.createElement("img");
        IMG.className = "card-img-top";
        IMG.src = "https://images.weserv.nl/?url=" + JSON.parse(product.image)[0];
        IMG.style.width = "50%";
        IMG.style.aspectRatio = "1/1";
        IMG.style.objectFit = "contain";
        const TITLE = document.createElement("div");
        TITLE.style.display = "flex";
        TITLE.style.width = "100%";
        TITLE.style.height = "auto";
        TITLE.style.fontSize = "0.8em";
        TITLE.style.textAlign = "center";
        TITLE.style.justifyContent = "center";
        TITLE.innerText = product.product_name;
        TITLE.style.marginTop = "2%";
        TITLE.style.fontWeight = "500";
        const PRICE = document.createElement("div");
        PRICE.style.display = "flex";
        PRICE.style.width = "100%";
        PRICE.style.height = "auto";
        PRICE.style.fontSize = "0.8em";
        PRICE.style.textAlign = "center";
        PRICE.style.justifyContent = "center";
        PRICE.innerText = "Rs." + product.discounted_price;
        PRICE.style.marginTop = "5%";
        PRICE.style.fontWeight = "400";
        const RATING = document.createElement("div");
        RATING.style.display = "flex";
        RATING.style.width = "100%";
        RATING.style.height = "auto";
        RATING.style.textAlign = "center";
        RATING.style.justifyContent = "center";
        RATING.style.marginTop = "5%";
        for (let i = 1; i <= 5; i++) {
            if (i <= product.productRating) {
                const ICON = document.createElement("i");
                ICON.className = "fa-solid fa-star";
                ICON.style.color = "#FFD700";
                RATING.appendChild(ICON);
            }
            else {
                const ICON = document.createElement("i");
                ICON.className = "fa-regular fa-star";
                ICON.style.color = "#FFD700";
                RATING.appendChild(ICON);
            }
        }
        CARD.appendChild(IMG);
        CARD.appendChild(TITLE);
        CARD.appendChild(RATING);
        CARD.appendChild(PRICE);
        CARD.id = product.uniq_id;
        IMG.id = product.uniq_id;
        TITLE.id = product.uniq_id;
        PRICE.id = product.uniq_id;
        RATING.id = product.uniq_id;
        CONTENT === null || CONTENT === void 0 ? void 0 : CONTENT.appendChild(CARD);
    });
}
const BUTTON = document.getElementById("load");
BUTTON.addEventListener("click", () => {
    if (!sortByReview && !sortByPrice) {
        load += 12;
        populateCategoryItems(getAllInCategory(window.localStorage.getItem("curr_category")), load);
        if (load > getAllInCategory(window.localStorage.getItem("curr_category"))['data'].length) {
            BUTTON.style.display = "none";
        }
    }
    else if (sortByReview && !sortByPrice) {
        load += 12;
        populateCategoryItems({ "data": getSortedByRating(getAllInCategory(window.localStorage.getItem("curr_category"))['data'], false) }, load);
    }
    else {
        load += 12;
        console.log("Alert");
        populateCategoryItems({ "data": getSortedByPrice(getAllInCategory(window.localStorage.getItem("curr_category"))['data'], false) }, load);
    }
});
const SEARCH = document.getElementById("search-text");
SEARCH.addEventListener('change', function (evt) {
    console.log(this.value);
    const PRODUCTS = filterByKeyword(getAllInCategory(window.localStorage.getItem("curr_category"))['data'], this.value);
    const CONTAINER = document.getElementById("content");
    CONTAINER.innerHTML = "";
    load = 12;
    populateCategoryItems({ "data": PRODUCTS }, load);
});
const SORT_BY_REVIEW = document.getElementById("sortReview");
SORT_BY_REVIEW.addEventListener('click', () => {
    sortByReview = true;
    sortByPrice = false;
    const CONTAINER = document.getElementById("content");
    CONTAINER.innerHTML = "";
    load = 12;
    const PRODUCTS = getSortedByRating(getAllInCategory(window.localStorage.getItem("curr_category"))['data'], false);
    populateCategoryItems({ "data": PRODUCTS }, load);
});
const SORT_BY_PRICE = document.getElementById("sortPrice");
SORT_BY_PRICE.addEventListener('click', () => {
    sortByPrice = true;
    sortByReview = false;
    const CONTAINER = document.getElementById("content");
    CONTAINER.innerHTML = "";
    load = 12;
    const PRODUCTS = getSortedByPrice(getAllInCategory(window.localStorage.getItem("curr_category"))['data'], false);
    populateCategoryItems({ "data": PRODUCTS }, load);
});
const SORT_BY_PRICE_REV = document.getElementById("sortPriceRev");
SORT_BY_PRICE_REV.addEventListener('click', () => {
    sortByPrice = true;
    sortByReview = false;
    const CONTAINER = document.getElementById("content");
    CONTAINER.innerHTML = "";
    load = 12;
    const PRODUCTS = getSortedByPrice(getAllInCategory(window.localStorage.getItem("curr_category"))['data'], true);
    populateCategoryItems({ "data": PRODUCTS }, load);
});
const CONTENT = document.getElementById("content");
CONTENT.addEventListener("click", (evt) => {
    console.log(evt.target.id);
    window.localStorage.setItem("curr_product", evt.target.id);
    location.href = "./product.html";
});
populateCategoryHeader();
populateCategoryItems(getAllInCategory(window.localStorage.getItem("curr_category")), load);
//# sourceMappingURL=category-controller.js.map