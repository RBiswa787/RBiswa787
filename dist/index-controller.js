import { getAllCategories, init } from "./controller.js";
const categoryIcons = {
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
    const icon = document.createElement("i");
    icon.className = "fa-solid fa-caret-down";
    icon.style.color = "#707070";
    CATEGORY_HEADER === null || CATEGORY_HEADER === void 0 ? void 0 : CATEGORY_HEADER.appendChild(icon);
}
function populateLandingCategories() {
    var categories = getAllCategories();
    const landingCategoryCarousel = document.getElementById("bestseller-content");
    categories.forEach(category => {
        const link = document.createElement("a");
        link.href = "./category.html";
        link.style.textDecoration = "none";
        link.style.color = "black";
        const card = document.createElement("div");
        card.addEventListener("click", () => {
            // console.log(category);
            window.localStorage.setItem("curr_category", category);
        });
        card.className = "card card-block mx-2";
        card.style.display = "flex";
        card.style.height = "100%";
        card.style.minWidth = "15rem";
        card.style.paddingTop = "5%";
        card.style.justifyContent = "space-between";
        card.style.flexDirection = "column";
        // card.innerText = category;
        const img = document.createElement("img");
        img.className = "card-img-top";
        img.src = categoryIcons[category];
        img.style.width = "5rem";
        img.style.height = "5rem";
        img.style.objectFit = "contain";
        img.style.alignSelf = "center";
        card.appendChild(img);
        const cardBody = document.createElement("div");
        cardBody.className = "card-body";
        cardBody.style.flexDirection = "column";
        cardBody.style.textAlign = "center";
        const cardTitle = document.createElement("span");
        cardTitle.className = "card-title";
        cardTitle.style.fontFamily = "Inter";
        cardTitle.style.fontWeight = "400";
        card.style.color = "grey";
        cardTitle.innerText = category;
        cardBody.appendChild(cardTitle);
        link.appendChild(card);
        link.addEventListener("mouseover", () => {
            card.style.border = "1px solid #db4444";
            cardTitle.style.color = "#db4444";
        });
        link.addEventListener("mouseleave", () => {
            card.style.border = "1px solid lightgrey";
            cardTitle.style.color = "grey";
        });
        card.appendChild(cardBody);
        landingCategoryCarousel.appendChild(link);
    });
}
init();
populateCategoryHeader();
populateLandingCategories();
//# sourceMappingURL=index-controller.js.map