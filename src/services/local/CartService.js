import {LocalStorageService} from "./base/LocalStorageService";

const CART_KEY = 'cart';
let observers = [];

function notifyObservers(cart) {
    // const cart = JSON.parse(LocalStorageService.get(CART_KEY));
    observers.forEach(o => {
        o(cart);
    });
}

export const CartService = {

    subscribe(observer, receiveFirstState = true) {
        if (observers.indexOf(observer) === -1) {
            observers.push(observer);
            if (receiveFirstState) {
                const cart = JSON.parse(LocalStorageService.get('cart')) || [];
                observer(cart);
            }
        }
    },
    unsubscribe(observer) {
        if (observers.includes(observer)) {
            observers = observers.filter(o => o !== observer);
        }
    },
    itemTotal() {
        if (typeof window !== 'undefined') {
            if (LocalStorageService.get()) {
                return JSON.parse(LocalStorageService.get('cart')).length
            }
        }
        return 0
    },
    addItem(product, quantity) {
        let cartItems = JSON.parse(LocalStorageService.get(CART_KEY)) || [];
        let cartItem = cartItems.find(ci => ci.id === product.id);

        // If it will be a change then proceed to save and notify the observers
        if ((cartItem && cartItem.quantity !== quantity) || !cartItem) {
            if (cartItem) {
                cartItem.quantity = quantity;
            } else {
                /* Clone the product, then trip out what we do not need
                cartItem = Object.assign({}, product);
                delete cartItem.stock;
                delete cartItem.comments;
                delete cartItem.tags;
                delete cartItem.categories;
                */
                // or take what we need and build a new object
                const {id, name, slug, price, image_urls} = product;
                cartItem = {
                    id, name, slug, price, quantity, image_urls
                };

                cartItems.push(cartItem);
            }
            localStorage.setItem(CART_KEY, JSON.stringify(cartItems));

            notifyObservers(cartItems);
        }
    },
    updateCart(itemIndex, quantity) {
        let cart = [];
        if (typeof window !== "undefined") {
            if (LocalStorageService.get(CART_KEY)) {
                cart = JSON.parse(LocalStorageService.get(CART_KEY))
            }
            cart[itemIndex].quantity = quantity;
            localStorage.setItem(CART_KEY, JSON.stringify(cart));
            notifyObservers(cart);
        }

    },
    getCart() {
        if (typeof window !== "undefined") {
            if (LocalStorageService.get(CART_KEY)) {
                const cart = JSON.parse(LocalStorageService.get(CART_KEY));
                notifyObservers(cart);
                return;
            }
        }
        return []
    },
    removeItem(itemIndex) {
        let cart = [];
        if (typeof window !== "undefined") {
            if (LocalStorageService.get(CART_KEY)) {
                cart = JSON.parse(LocalStorageService.get(CART_KEY))
            }
            cart.splice(itemIndex, 1);
            LocalStorageService.set(CART_KEY, JSON.stringify(cart));
            notifyObservers(cart);
        }
        return cart
    },
    emptyCart() {
        LocalStorageService.remove(CART_KEY);
        notifyObservers([]);
    },
};
