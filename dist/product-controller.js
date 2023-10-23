import { getAllCategories, getSingleProduct } from "./controller.js";
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
}
function populateProductData() {
    const UNIQ_ID = window.localStorage.getItem("curr_product");
    const PRODUCT = getSingleProduct(UNIQ_ID);
    console.log(PRODUCT["data"]);
    const MAIN_IMG = document.getElementById("main-img");
    MAIN_IMG.src = "https://images.weserv.nl/?url=" + JSON.parse(PRODUCT["data"][0]["image"])[0];
    for (let i = 0; i < 4; i++) {
        const SMALL_IMG = document.createElement("img");
        SMALL_IMG.className = "small-img";
        SMALL_IMG.src = "https://images.weserv.nl/?url=" + JSON.parse(PRODUCT["data"][0]["image"])[0];
        const OTHER_IMAGE_HOLDER = document.getElementById("other-image-holder");
        OTHER_IMAGE_HOLDER === null || OTHER_IMAGE_HOLDER === void 0 ? void 0 : OTHER_IMAGE_HOLDER.appendChild(SMALL_IMG);
    }
    const TITLE = document.getElementById("product-title");
    console.log(TITLE);
    TITLE.innerText = PRODUCT["data"][0]["product_name"];
    TITLE.style.height = "auto";
    TITLE.style.marginBottom = "3%";
    const RATING = document.getElementById("product-rating");
    for (let i = 1; i <= 5; i++) {
        if (i <= PRODUCT["data"][0].productRating) {
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
    RATING.style.marginBottom = "2%";
    RATING.style.height = "auto";
    const PRICE = document.getElementById("product-price");
    PRICE.innerText = "Rs. " + PRODUCT["data"][0]["discounted_price"];
    const DESC = document.getElementById("product-desc");
    DESC.innerText = PRODUCT["data"][0]["description"];
    DESC.style.textAlign = "justify";
    const COUNT_HOLDER = document.getElementById("countHolder");
    COUNT_HOLDER.innerText = JSON.parse(window.localStorage.getItem("cart"))[UNIQ_ID] || 0;
    const ADD_BUTTON = document.getElementById("add");
    console.log(ADD_BUTTON);
    ADD_BUTTON.addEventListener("click", () => {
        let cart = JSON.parse(window.localStorage.getItem("cart"));
        if (!cart.hasOwnProperty(UNIQ_ID)) {
            cart[UNIQ_ID] = 1;
            WISH.className = "fa-regular fa-heart";
            let wishlist = JSON.parse(window.localStorage.getItem("wishlist"));
            console.log(wishlist.includes(UNIQ_ID));
            if (wishlist.includes(UNIQ_ID)) {
                wishlist.splice(wishlist.indexOf(UNIQ_ID), 1);
                window.localStorage.setItem("wishlist", JSON.stringify(wishlist));
            }
        }
        else {
            cart[UNIQ_ID] += 1;
        }
        let total = parseFloat(window.localStorage.getItem("total"));
        total += PRODUCT["data"][0]["discounted_price"];
        window.localStorage.setItem("total", String(total));
        window.localStorage.setItem("cart", JSON.stringify(cart));
        const COUNT_HOLDER = document.getElementById("countHolder");
        COUNT_HOLDER.innerText = JSON.parse(window.localStorage.getItem("cart"))[UNIQ_ID];
    });
    const SUB_BUTTON = document.getElementById("sub");
    SUB_BUTTON.addEventListener("click", () => {
        let cart = JSON.parse(window.localStorage.getItem("cart"));
        if (!cart.hasOwnProperty(UNIQ_ID)) {
        }
        else {
            cart[UNIQ_ID] -= 1;
            let total = parseFloat(window.localStorage.getItem("total"));
            total -= PRODUCT["data"][0]["discounted_price"];
            window.localStorage.setItem("total", String(total));
            if (cart[UNIQ_ID] == 0) {
                delete cart[UNIQ_ID];
            }
        }
        window.localStorage.setItem("cart", JSON.stringify(cart));
        const COUNT_HOLDER = document.getElementById("countHolder");
        COUNT_HOLDER.innerText = JSON.parse(window.localStorage.getItem("cart"))[UNIQ_ID] || 0;
    });
    const WISH = document.getElementById("wish");
    if (JSON.parse(window.localStorage.getItem("wishlist")).includes(UNIQ_ID)) {
        WISH.className = "fa-solid fa-heart";
    }
    else {
        WISH.className = "fa-regular fa-heart";
    }
    WISH === null || WISH === void 0 ? void 0 : WISH.addEventListener("click", () => {
        console.log("wish");
        if (WISH.className == "fa-regular fa-heart") {
            WISH.className = "fa-solid fa-heart";
            let wishlist = JSON.parse(window.localStorage.getItem("wishlist"));
            wishlist.push(UNIQ_ID);
            window.localStorage.setItem("wishlist", JSON.stringify(wishlist));
            let cart = JSON.parse(window.localStorage.getItem("cart"));
            delete cart[UNIQ_ID];
            window.localStorage.setItem("cart", JSON.stringify(cart));
            const COUNT_HOLDER = document.getElementById("countHolder");
            COUNT_HOLDER.innerText = JSON.parse(window.localStorage.getItem("cart"))[UNIQ_ID] || 0;
        }
        else {
            WISH.className = "fa-regular fa-heart";
            let wishlist = JSON.parse(window.localStorage.getItem("wishlist"));
            wishlist.splice(wishlist.indexOf(UNIQ_ID), 1);
            window.localStorage.setItem("wishlist", JSON.stringify(wishlist));
        }
    });
}
populateCategoryHeader();
populateProductData();
//# sourceMappingURL=product-controller.js.map