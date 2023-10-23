import { getAllCategories, init } from "./controller.js";
const CATEGORY_ICONS = {
    "Clothing": "../assets/dress.png",
    "Home Furnishing": "../assets/bed.png",
    "Jewellery": "../assets/bracelet.png",
    "Baby Care": "../assets/baby-carriage.png",
    "Footwear": "../assets/sneakers.png",
    "Mobiles & Accessories": "../assets/smartphone.png",
    "Furniture": "../assets/sofa.png",
    "Home Decor & Festive Needs": "../assets/festive.png",
    "Sports & Fitness": "../assets/sports.png",
    "Computers": "../assets/monitor.png",
    "Gaming": "../assets/joystick.png",
    "Eyewear": "../assets/sunglasses.png",
    "Tools & Hardware": "../assets/customer-support.png",
    "Kitchen & Dining": "../assets/table.png"
};
function populateCategoryHeader() {
    const CATEGORY_HEADER = document.getElementById("category-main");
    var categories = getAllCategories();
    categories.slice(0, 7).forEach(category => {
        const ANCHOR = document.createElement("a");
        ANCHOR.href = "./category.html";
        ANCHOR.style.display = "flex";
        ANCHOR.style.textDecoration = "none";
        ANCHOR.style.width = "auto";
        ANCHOR.style.flexWrap = "nowrap";
        ANCHOR.style.color = "black";
        ANCHOR.addEventListener("mouseenter", () => {
            ANCHOR.style.color = "red";
        });
        ANCHOR.addEventListener("mouseleave", () => {
            ANCHOR.style.color = "black";
        });
        const SPAN = document.createElement("span");
        SPAN.innerText = category;
        SPAN.style.display = "flex";
        SPAN.style.width = "auto";
        SPAN.style.flexWrap = "nowrap";
        ANCHOR.style.marginRight = "2%";
        ANCHOR.appendChild(SPAN);
        SPAN.addEventListener("click", () => {
            window.localStorage.setItem("curr_category", category);
        });
        CATEGORY_HEADER === null || CATEGORY_HEADER === void 0 ? void 0 : CATEGORY_HEADER.appendChild(ANCHOR);
    });
    const ICON = document.createElement("i");
    ICON.className = "fa-solid fa-caret-down";
    ICON.style.color = "#707070";
    CATEGORY_HEADER === null || CATEGORY_HEADER === void 0 ? void 0 : CATEGORY_HEADER.appendChild(ICON);
}
function populateLandingCategories() {
    var categories = getAllCategories();
    const LANDING_CATEGORY_CAROUSEL = document.getElementById("bestseller-content");
    categories.forEach(category => {
        const LINK = document.createElement("a");
        LINK.href = "./category.html";
        LINK.style.textDecoration = "none";
        LINK.style.color = "black";
        const CARD = document.createElement("div");
        CARD.addEventListener("click", () => {
            // console.log(category);
            window.localStorage.setItem("curr_category", category);
        });
        CARD.className = "card card-block mx-2";
        CARD.style.display = "flex";
        CARD.style.height = "100%";
        CARD.style.minWidth = "15rem";
        CARD.style.paddingTop = "5%";
        CARD.style.justifyContent = "space-between";
        CARD.style.flexDirection = "column";
        // card.innerText = category;
        const IMG = document.createElement("img");
        IMG.className = "card-img-top";
        IMG.src = CATEGORY_ICONS[category];
        IMG.style.width = "5rem";
        IMG.style.height = "5rem";
        IMG.style.objectFit = "contain";
        IMG.style.alignSelf = "center";
        CARD.appendChild(IMG);
        const CARD_BODY = document.createElement("div");
        CARD_BODY.className = "card-body";
        CARD_BODY.style.flexDirection = "column";
        CARD_BODY.style.textAlign = "center";
        const CARD_TITLE = document.createElement("span");
        CARD_TITLE.className = "card-title";
        CARD_TITLE.style.fontFamily = "Inter";
        CARD_TITLE.style.fontWeight = "400";
        CARD.style.color = "grey";
        CARD_TITLE.innerText = category;
        CARD_BODY.appendChild(CARD_TITLE);
        LINK.appendChild(CARD);
        LINK.addEventListener("mouseover", () => {
            CARD.style.border = "1px solid #db4444";
            CARD_TITLE.style.color = "#db4444";
        });
        LINK.addEventListener("mouseleave", () => {
            CARD.style.border = "1px solid lightgrey";
            CARD_TITLE.style.color = "grey";
        });
        CARD.appendChild(CARD_BODY);
        LANDING_CATEGORY_CAROUSEL === null || LANDING_CATEGORY_CAROUSEL === void 0 ? void 0 : LANDING_CATEGORY_CAROUSEL.appendChild(LINK);
    });
}
init();
populateCategoryHeader();
populateLandingCategories();
//# sourceMappingURL=index-controller.js.map