const base = 'http://localhost:8080/api';
export const environment = {
    payment: {
        stripe_connect_test_client_id: ''
    },
    urls: {
        products: `${base}/products`,
        comments: `${base}/comments`,
        orders: `${base}/orders`,
    }
};