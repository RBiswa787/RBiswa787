import { getAllCategories, getAllInList, getSingleProduct } from "./controller.js";

let delivery_charges = 0;

function populateCategoryHeader(){
    const CATEGORY_HEADER = document.getElementById("category-main");
    var categories = getAllCategories();
    categories.slice(0,7).forEach(category => {
        const ANCHOR = document.createElement("a");
        (ANCHOR as HTMLAnchorElement).href = "./category.html";
        ANCHOR.style.textDecoration = "none";
        ANCHOR.style.color = "black";
        ANCHOR.addEventListener("mouseenter",() => {
        ANCHOR.style.color = "red"});
        ANCHOR.addEventListener("mouseleave",() => {
        ANCHOR.style.color = "black"});
        const SPAN = document.createElement("span");
        SPAN.innerText = category;
        ANCHOR.style.marginRight = "2%";
        SPAN.addEventListener("click",() => {
            window.localStorage.setItem("curr_category",category);
        })
        ANCHOR.appendChild(SPAN);
        CATEGORY_HEADER?.appendChild(ANCHOR);
    });

    const ICON = document.createElement("i");
    ICON.className = "fa-solid fa-caret-down";
    ICON.style.color = "#707070";
    CATEGORY_HEADER?.appendChild(ICON);
    
}

function populateCartitems() {
    const CART_ITEMS = document.getElementById("cart-items");

    const ORDER_HEADER = document.createElement("div");
    ORDER_HEADER.style.display = "flex";
    ORDER_HEADER.style.width = "95%";
    ORDER_HEADER.style.height = "2em";
    ORDER_HEADER.style.borderBottom = "2px solid black";
    ORDER_HEADER.innerText = "Order Summary";
    ORDER_HEADER.style.fontSize = "0.9em";

    CART_ITEMS?.appendChild(ORDER_HEADER);
    
    let cart = JSON.parse(window.localStorage.getItem("cart"));
    Object.keys(cart).forEach(key => {
       
        const CARD = document.createElement("div");
        CARD.className = "card";

        CARD.style.width = "90%";
        CARD.style.height= "4em";
        CARD.style.display = "flex";
        CARD.style.flexDirection = "row";
        CARD.style.justifyContent = "flex-start";
        CARD.style.paddingLeft = "1%";
        CARD.style.border = "none";
        
        const IMG = document.createElement("img");
        let product = getSingleProduct(key);
        (IMG as HTMLImageElement).src = "https://images.weserv.nl/?url=" + JSON.parse(product["data"][0]["image"])[0];
        IMG.style.width = "4em";
        IMG.style.aspectRatio = "1/1";
        IMG.style.objectFit = "contain";
        IMG.style.marginRight = "2%";

        CARD.appendChild(IMG);


        const TITLE = document.createElement("div");
        TITLE.style.display = "flex";
        TITLE.style.height = "3em";
        TITLE.style.width= "10em";
        TITLE.style.flexWrap = "wrap";
        TITLE.style.textAlign = "left";
        TITLE.style.fontSize = "0.8em";
        TITLE.style.paddingLeft = "2%";
        TITLE.style.fontWeight = "500";

        TITLE.innerText = product["data"][0]["product_name"];

        CARD.appendChild(TITLE);

        const PRICE = document.createElement("div");
        PRICE.style.display = "flex";
        PRICE.style.height = "4em";
        PRICE.style.width = "7em";
        // PRICE.style.border = "2px solid red";
        PRICE.style.marginLeft = "3%"; 
        PRICE.style.flexDirection = "column";

        const PRICE_HOLDER = document.createElement("div");
        PRICE_HOLDER.style.display = "flex";
        PRICE_HOLDER.style.width = "100%";
        PRICE_HOLDER.style.height = "50%";
        // PRICE_HOLDER.style.border = "2px solid purple";
        PRICE_HOLDER.style.justifyContent = "flex-end";
        PRICE_HOLDER.innerText = "Rs." + product["data"][0]["discounted_price"];
        PRICE_HOLDER.style.fontWeight = "bold;"

        const QTY_HOLDER = document.createElement("div");
        QTY_HOLDER.style.display = "flex";
        QTY_HOLDER.style.width = "100%";
        QTY_HOLDER.style.height = "50%";
        // QTY_HOLDER.style.border = "2px solid green";
        QTY_HOLDER.style.justifyContent = "flex-end";
        QTY_HOLDER.innerText = "x" + cart[key];

        PRICE.appendChild(PRICE_HOLDER);
        PRICE.appendChild(QTY_HOLDER);


        CARD.appendChild(PRICE);

        const CONTROL = document.createElement("div");
        CONTROL.style.display =  "flex";
        CONTROL.style.width = "90%";
        CONTROL.style.height = "27px";
        CONTROL.style.justifyContent = "flex-end";

        const ADD = document.createElement("button");
        ADD.style.display = "flex";
        ADD.style.aspectRatio = "1/1";
        ADD.style.border = "1px solid black";
        ADD.style.backgroundColor = "black";
        ADD.style.color = "white";
        ADD.style.justifyContent = "center";
        ADD.style.alignItems = "center";
        ADD.innerText = "+";

        const SUB = document.createElement("button");
        SUB.style.display = "flex";
        SUB.style.aspectRatio = "1/1";
        SUB.style.border = "1px solid black";
        SUB.style.backgroundColor = "white";
        // SUB.style.color = "white";
        SUB.style.justifyContent = "center";
        SUB.style.alignItems = "center";
        SUB.innerText = "-";
        SUB.style.marginRight = "1%";
    

        const WISH = document.createElement("i");
        WISH.className = 'fa-regular fa-heart';
        WISH.style.fontSize = "1.5em";
        WISH.style.color = "#fc4557";
        WISH.style.marginLeft = "3%";

        WISH.addEventListener("click",() => {
            WISH.className = "fa-solid fa-heart";
            let wishlist = JSON.parse(window.localStorage.getItem("wishlist")!);
            wishlist.push(key);
            window.localStorage.setItem("wishlist",JSON.stringify(wishlist));
            let cart = JSON.parse(window.localStorage.getItem("cart")!);
            let total = parseFloat(window.localStorage.getItem("total")!);
            let product = getSingleProduct(key);
            console.log(parseInt(cart[key]))
            console.log(product["data"][0]["discounted_price"]);
            total -= parseInt(cart[key])*product["data"][0]["discounted_price"];
            window.localStorage.setItem("total",String(total));
            
            delete cart[key];
            window.localStorage.setItem("cart",JSON.stringify(cart));
            
            window.location.reload();
        });
        
        CONTROL.appendChild(SUB);
        CONTROL.appendChild(ADD);
        CONTROL.appendChild(WISH);
        CART_ITEMS?.appendChild(CARD);
        CART_ITEMS?.appendChild(CONTROL);

       


        ADD.addEventListener("click" , () => {
            let cart = JSON.parse(window.localStorage.getItem("cart")!);
            cart[key] += 1;
            let total = parseFloat(window.localStorage.getItem("total")!);
            total += product["data"][0]["discounted_price"];
            window.localStorage.setItem("total",String(total));
            SPAN.innerText = "Rs." + window.localStorage.getItem("total");
            window.localStorage.setItem("cart",JSON.stringify(cart));
            QTY_HOLDER.innerText = "x" + cart[key];

            const SPAN_TOTAL = document.getElementById("span-total");
            (SPAN_TOTAL as HTMLElement).innerText = "Rs. " + String(parseFloat(window.localStorage.getItem("total")!)+delivery_charges);
        });

        SUB.addEventListener("click" , () => {
            let cart = JSON.parse(window.localStorage.getItem("cart")!);
            cart[key] -= 1;
            let total = parseFloat(window.localStorage.getItem("total")!);
            total -= product["data"][0]["discounted_price"];
            window.localStorage.setItem("total",String(total));
            SPAN.innerText = "Rs." + window.localStorage.getItem("total");
            if(cart[key] == 0){
                delete cart[key];
                window.localStorage.setItem("cart",JSON.stringify(cart));
                window.location.reload();
            }
            else{
            window.localStorage.setItem("cart",JSON.stringify(cart));
            QTY_HOLDER.innerText = "x" + cart[key];
            const SPAN_TOTAL = document.getElementById("span-total");
            (SPAN_TOTAL as HTMLElement).innerText = "Rs. " + String(parseFloat(window.localStorage.getItem("total")!)+delivery_charges);
            }
        })
    });

    const ORDER_FOOTER = document.createElement("div");
    ORDER_FOOTER.style.display = "flex";
    ORDER_FOOTER.style.width = "95%";
    ORDER_FOOTER.style.height = "2em";
    ORDER_FOOTER.style.borderTop= "2px solid black";
    ORDER_FOOTER.innerText = "Subtotal";
    ORDER_FOOTER.style.fontSize = "0.9em";
    ORDER_FOOTER.style.justifyContent = "space-between";
    ORDER_FOOTER.style.paddingTop = "1%";

    const ORDER_DELIVERY = document.createElement("div");
    ORDER_DELIVERY.style.display = "flex";
    ORDER_DELIVERY.style.width = "95%";
    ORDER_DELIVERY.style.height = "1em";
    ORDER_DELIVERY.innerText = "Delivery Charges";
    ORDER_DELIVERY.style.fontSize = "0.9em";
    ORDER_DELIVERY.style.justifyContent = "space-between";

    const ORDER_TOTAL= document.createElement("div");
    ORDER_TOTAL.style.display = "flex";
    ORDER_TOTAL.style.width = "95%";
    ORDER_TOTAL.style.height = "1em";
    ORDER_TOTAL.innerText = "Net";
    ORDER_TOTAL.style.fontSize = "0.9em";
    ORDER_TOTAL.style.justifyContent = "space-between";

    const SPAN_DELIVERY = document.createElement("span");
    SPAN_DELIVERY.id = "span-delivery";
    if(window.localStorage.getItem("delivery") == "0"){
    SPAN_DELIVERY.innerText = "Rs. 0";
    delivery_charges = 0;
    }
    else{
    SPAN_DELIVERY.innerText = "Rs. 50"   
    delivery_charges = 50;
    }

    const SPAN_TOTAL = document.createElement("span");
    SPAN_TOTAL.id = "span-total";
    SPAN_TOTAL.innerText = "Rs. " + String(parseFloat(window.localStorage.getItem("total")!)+delivery_charges);

    ORDER_TOTAL.appendChild(SPAN_TOTAL);

    const SPAN = document.createElement("span");
    SPAN.innerText = "Rs." + window.localStorage.getItem("total");
    SPAN.id = "SPAN";

    ORDER_FOOTER.appendChild(SPAN);
    ORDER_DELIVERY.appendChild(SPAN_DELIVERY);
    ORDER_TOTAL.appendChild(SPAN_TOTAL);

    CART_ITEMS?.appendChild(ORDER_FOOTER)
    CART_ITEMS?.appendChild(ORDER_DELIVERY);
    CART_ITEMS?.appendChild(ORDER_TOTAL);

    const PAY = document.getElementById("pay");
console.log("pay");
     (PAY as HTMLButtonElement).addEventListener("click",async () => {
        console.log("attempt to pay");
        var options = {
            "key": "rzp_test_s9PLBTOlPiYmYw", 
            "amount": (parseFloat(window.localStorage.getItem("total")!)+delivery_charges)*100, 
            "currency": "INR",
            "name": "Exclusive", 
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": null, 
            "handler": function (response){
            //     alert(response.razorpay_payment_id);
            //  alert(response.razorpay_order_id);
            //      alert(response.razorpay_signature)
                // var orders = JSON.parse(window.localStorage.getItem("order"));
                // orders[response.razorpay_payment_id] = cart;
                // window.localStorage.setItem("order",JSON.stringify(orders));
                 let cart = {};
                  window.localStorage.setItem("cart",JSON.stringify(cart));
                  window.location.reload();
                  window.localStorage.setItem("total","0");

                // window.location.href = "./order.html";
                // const modal = document.querySelector("#paymentModal");
                // modal.ariaHidden = fa;
            },
            "prefill": { 
                "name": "Biswadeep Ray", 
                "email": "biswadeep.ray@example.com", 
                "contact": "9000090000"  
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        
        try{
        var rzp1 = new Razorpay(options);
        rzp1.on('payment.failed', function (response){
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
});
         rzp1.open();
}
catch(err){
    console.log(err);
}
     });

     const STANDARD = document.getElementById("standard");
const EXPRESS = document.getElementById("express");
let delivery = window.localStorage.getItem("delivery");
if(delivery == "0"){
    STANDARD.style.border = "1.5px solid black";
    STANDARD.style.backgroundColor = "black";
    STANDARD.style.color = "white";
    delivery_charges = 0;
    const SPAN_TOTAL = document.getElementById("span-total");
    SPAN_TOTAL.innerText = "Rs. " + String(parseFloat(window.localStorage.getItem("total"))+delivery_charges);
}
else{
    EXPRESS.style.border = "1.5px solid black";
    EXPRESS.style.backgroundColor = "black";
    EXPRESS.style.color = "white";
    delivery_charges = 50;
    const SPAN_TOTAL = document.getElementById("span-total");
    SPAN_TOTAL.innerText = "Rs. " + String(parseFloat(window.localStorage.getItem("total"))+delivery_charges);
}

STANDARD?.addEventListener("click", () => {
    const SPAN_DELIVERY = document.getElementById("span-delivery");
    SPAN_DELIVERY.innerText = "Rs. 0" ;
    delivery = "0";
    delivery_charges = 0;
    const SPAN_TOTAL = document.getElementById("span-total");
    SPAN_TOTAL.innerText = "Rs. " + String(parseFloat(window.localStorage.getItem("total"))+delivery_charges);
    window.localStorage.setItem("delivery",delivery);
        STANDARD.style.border = "1.5px solid black";
        STANDARD.style.backgroundColor = "black";
        STANDARD.style.color = "white";
        EXPRESS.style.border = "1px solid black";
        EXPRESS.style.backgroundColor = "white";
        EXPRESS.style.color = "black";

});

EXPRESS?.addEventListener("click", () => {
    delivery_charges = 50;
    const SPAN_DELIVERY = document.getElementById("span-delivery");
    SPAN_DELIVERY.innerText = "Rs. 50" ;
    const SPAN_TOTAL = document.getElementById("span-total");
    SPAN_TOTAL.innerText = "Rs. " + String(parseFloat(window.localStorage.getItem("total"))+delivery_charges);
    delivery = "1";
    window.localStorage.setItem("delivery",delivery);
        EXPRESS.style.border = "1.5px solid black";
        EXPRESS.style.backgroundColor = "black";
        EXPRESS.style.color = "white";
        STANDARD.style.border = "1px solid black";
        STANDARD.style.backgroundColor = "white";
        STANDARD.style.color = "black";
});

}


function populateWishlist(){
    let wishlist = JSON.parse(window.localStorage.getItem("wishlist"));
    console.log(wishlist);
    const products = getAllInList(wishlist);
    console.log(products);
    const WISHLIST_CONTENT = document.getElementById("wishlist-catalog");
    console.log(WISHLIST_CONTENT);
    products.forEach(product => {
        console.log(product);
        const CARD = document.createElement("card");
        CARD.style.display = "flex";
        CARD.style.width = "10em";
        CARD.style.height = "12em";
        CARD.style.flexDirection = "column";
        CARD.style.alignItems = "center";
        CARD.style.padding = "2%";
        
        const IMG = document.createElement("img");
        IMG.style.height = "40%";
        IMG.style.aspectRatio = "1/1";
        IMG.style.objectFit = "contain";
        (IMG as HTMLImageElement).src = "https://images.weserv.nl/?url=" + JSON.parse(product["image"])[0];


        const TITLE = document.createElement("div");
        TITLE.style.display = "flex";
        TITLE.style.width = "95%";
        TITLE.style.height = "auto";
        TITLE.style.justifyContent = "center";
        TITLE.style.alignItems = "center";
        TITLE.style.textAlign = "center";
        TITLE.style.fontSize = "0.7em";
        TITLE.innerText = product["product_name"];
        TITLE.style.marginTop = "10%";
        TITLE.style.fontWeight = "bold";

        const PRICE = document.createElement("div");
        PRICE.style.display = "flex";
        PRICE.style.width = "95%";
        PRICE.style.height = "auto";
        PRICE.style.justifyContent = "center";
        PRICE.style.alignItems = "center";
        PRICE.style.textAlign = "center";
        PRICE.style.fontSize = "0.7em";
        PRICE.innerText = "Rs. " +  product["discounted_price"];
        PRICE.style.marginTop = "3%";
        PRICE.style.fontStyle = "italic";
        CARD.appendChild(IMG);
        CARD.appendChild(TITLE);
        CARD.appendChild(PRICE);
        CARD.style.border = "1px solid lightgrey";


        CARD.id = "wish-card";
        IMG.id = "wish-card";
        TITLE.id = "wish-card";
        PRICE.id = "wish-card";

        CARD.addEventListener("click" , () => {
            window.localStorage.setItem("curr_product",product["uniq_id"]);
            window.location.href = "./product.html";
        });
        WISHLIST_CONTENT?.appendChild(CARD);
    });
}


populateCategoryHeader();
populateCartitems();
populateWishlist();