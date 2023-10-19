import { data } from './dataProvider.js';
export function getAllProducts() {
    const ALLOWED_CATEGORIES = [
        "Clothing",
        "Home Furnishing",
        "Jewellery",
        "Baby Care",
        "Footwear",
        "Mobiles & Accessories",
        "Beauty & Personal Care",
        "Furniture",
        "Sports & Fitness",
        "Computers",
        "Gaming",
        "Eyewear",
        "Home Decor & Festive Needs",
        "Tools & Hardware",
        "Kitchen & Dining"
    ];
    return data['results'].filter(item => ALLOWED_CATEGORIES.includes(item.product_category_tree));
}
export function getSingleProduct(id) {
    var response = data['results'].filter(function (item) {
        return item.uniq_id == id;
    });
    if (response.length == 0) {
        return { found: false, data: response };
    }
    else {
        return { found: true, data: response };
    }
}
export function getAllInCategory(category) {
    var response = data['results'].filter(function (item) {
        return item.product_category_tree == category;
    });
    if (response.length == 0) {
        return { found: false, data: response };
    }
    else {
        return { found: true, data: response };
    }
}
export function getAllCategories() {
    const ALLOWED_CATEGORIES = [
        "Clothing",
        "Home Furnishing",
        "Jewellery",
        "Baby Care",
        "Footwear",
        "Mobiles & Accessories",
        "Furniture",
        "Home Decor & Festive Needs",
        "Sports & Fitness",
        "Computers",
        "Gaming",
        "Eyewear",
        "Tools & Hardware",
        "Kitchen & Dining"
    ];
    // let set = new Set();
    // var datum = data['results'];
    // datum.forEach(item => {
    //     set.add(String(item["product_category_tree"]))
    // })
    return ALLOWED_CATEGORIES;
}
export function getAllInList(ids) {
    return getAllProducts().filter(item => ids.includes(item.uniq_id));
}
export function addToCart(id) {
    let cart = JSON.parse(window.localStorage.getItem('cart'));
    cart[id] = 1;
    window.localStorage.setItem('cart', JSON.stringify(cart));
}
export function removeFromCart(id) {
    let cart = JSON.parse(window.localStorage.getItem('cart'));
    delete cart[id];
    window.localStorage.setItem('cart', JSON.stringify(cart));
}
export function incrementInCart(id) {
    let cart = JSON.parse(window.localStorage.getItem('cart'));
    cart[id] += 1;
    window.localStorage.setItem('cart', JSON.stringify(cart));
}
export function decrementInCart(id) {
    let cart = JSON.parse(window.localStorage.getItem('cart'));
    cart[id] -= 1;
    if (cart[id] == 0) {
        removeFromCart(id);
    }
    else {
        window.localStorage.setItem('cart', JSON.stringify(cart));
    }
}
//console.log(getAllCategories());
//console.log(getAllCategories());
export function addToWishlist(id) {
    let wishlist = JSON.parse(window.localStorage.getItem('wishlist'));
    if (!wishlist.includes(id)) {
        wishlist.push(id);
        window.localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
}
export function removeFromWishlist(id) {
    let wishlist = JSON.parse(window.localStorage.getItem('wishlist'));
    if (wishlist.includes(id)) {
        wishlist.splice(wishlist.indexOf(id), 1);
        window.localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
}
export function addToSavedForLater(id) {
    let saved_for_later = JSON.parse(window.localStorage.getItem('saved_for_later'));
    if (!saved_for_later.includes(id)) {
        saved_for_later.push(id);
        window.localStorage.setItem('saved_for_later', JSON.stringify(saved_for_later));
    }
}
export function removeFromSavedForLater(id) {
    let saved_for_later = JSON.parse(window.localStorage.getItem('saved_for_later'));
    if (saved_for_later.includes(id)) {
        saved_for_later.splice(saved_for_later.indexOf(id), 1);
        window.localStorage.setItem('saved_for_later', JSON.stringify(saved_for_later));
    }
}
export function getSortedByRating(data, asc) {
    if (asc)
        data.sort((a, b) => a.productRating - b.productRating);
    else
        data.sort((a, b) => b.productRating - a.productRating);
    return data;
}
export function getSortedByPrice(data, asc) {
    if (asc)
        data.sort((a, b) => a.discounted_price - b.discounted_price);
    else
        data.sort((a, b) => b.discounted_price - a.discounted_price);
    return data;
}
export function filterByKeyword(data, keyword) {
    return data.filter(item => item.product_name.toLowerCase().includes(keyword.toLowerCase()));
}
export function placeOrder(orderid) {
    let cart = JSON.parse(window.localStorage.getItem('cart'));
    let orders = JSON.parse(window.localStorage.getItem('orders'));
    var order = {};
    order['id'] = orderid;
    order['cart'] = cart;
    orders.push(order);
    window.localStorage.setItem('cart', '{}');
    window.localStorage.setItem('orders', JSON.stringify(orders));
}
export function removeOrder(orderid) {
    let orders = JSON.parse(window.localStorage.getItem('orders'));
    orders.splice(orders.indexOf(orders.filter(item => item.id == orderid)[0]));
    window.localStorage.setItem('orders', JSON.stringify(orders));
}
export function init() {
    if (window.localStorage.getItem('cart') == null) {
        window.localStorage.setItem('cart', "{}");
    }
    if (window.localStorage.getItem("wishlist") == null) {
        window.localStorage.setItem("wishlist", "[]");
    }
    if (window.localStorage.getItem("orders") == null) {
        window.localStorage.setItem("orders", "[]");
    }
    if (window.localStorage.getItem("saved_for_later") == null) {
        window.localStorage.setItem("saved_for_later", "[]");
    }
}
init();
//addToCart("238d84971326ce6bcbf44b2663bd3062");
//removeFromCart("238d84971326ce6bcbf44b2663bd3062");
//incrementInCart("238d84971326ce6bcbf44b2663bd3062");
//decrementInCart("238d84971326ce6bcbf44b2663bd3062");
//addToWishlist("238d84971326ce6bcbf44b2663bd3062");
//console.log(filterByKeyword(getAllInCategory("Clothing")['data'],'skirt'));
//console.log(getAllInList(["238d84971326ce6bcbf44b2663bd3062","cb4fa87a874f715fff567f7b7b3be79c"]));
//placeOrder("#123");
// removeOrder("#123");
// addToSavedForLater("#123");
//removeFromSavedForLater('#123');
//console.log(getAllProducts());
// console.log(getSortedByPrice(getAllInCategory("Clothing")['data'],true));
//console.log(filterByKeyword(getAllInCategory("Clothing")['data'],' red '));
//# sourceMappingURL=controller.js.map