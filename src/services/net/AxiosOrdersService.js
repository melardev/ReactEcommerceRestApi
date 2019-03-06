import {AxiosService} from "./base/AxiosService";

export const AxiosOrdersService = {

    fetchAll() {
        return AxiosService.get('/orders');
    },

    fetchOne(orderId) {
        return AxiosService.get(`/orders/${orderId}`);
    },
    checkoutWithNewAddress(cartItems, addressObj) {
        return AxiosService.post('/orders', {
            ...addressObj, cart_items: cartItems,
        });
    },
    checkoutReusingAddress(cartItems, addressId) {
        return AxiosService.post('/orders', {
            address_id: addressId, cart_items: cartItems,
        });
    },
    create() {

    },
}