import React, {Component} from 'react'


import Layout from "../partials/Layout";
import PaymentDetails from "./PaymentDetails";
import UserDetails from "./UserDetails";
import {AxiosAddressesService} from "../../services/net/AxiosAddressesService";
import {AxiosOrdersService} from "../../services/net/AxiosOrdersService";
import {CartService} from "../../services/local/CartService";
import {NotificationService} from "../../services/local/NotificationService";
import {UsersService} from "../../services/local/UsersService";
import Cart from "../cart/Cart";

class Checkout extends Component {

    constructor(props) {
        super(props);
        const defaultAddress = {
            id: -1,
            first_name: '',
            last_name: '',
            street_address: '',
            city: '',
            country: '',
            zip_code: ''
        };
        this.state = {
            addresses: [],
            cart_items: [],
            active_address: {...defaultAddress},
            mutable_address: {...defaultAddress},

            is_authenticated: false,
            cart_changed_callback: this.onCartUpdate.bind(this),

        };
    }

    componentWillMount() {
        const self = this;
        CartService.subscribe(this.state.cart_changed_callback);

        if (UsersService.isAuthenticated()) {

            AxiosAddressesService.fetchAll().then(res => {
                self.setState({addresses: res.data.addresses});
            }).catch(err => {
                NotificationService.showDialogError(err.message);
            });
        }
    }


    componentWillUnmount() {
        CartService.unsubscribe(this.state.cart_changed_callback);

    }


    onAddressChanged(evt) {
        // const selectedOptionHtml = evt.target.children[evt.target.selectedIndex];
        const addressId = parseInt(evt.target.value);
        const address = this.state.addresses.find(address => address.id === addressId);

        this.setState({
            active_address: address,
            mutable_address: {...address}
        })
    }

    onCartUpdate(cart) {
        this.setState({cart_items: cart});
    }

    placeOrder() {
        const activeAddress = this.state.active_address;
        // _.isEqual(this.state.active_address, this.state.mutable_address)
        //if (activeAddress.first_name === this.state.first_name && activeAddress.last_name === this.state.last_name && activeAddress.country === this.state.country && activeAddress.city === this.state.city && activeAddress.zip_code === this.state.zip_code) {

        if (JSON.stringify(this.state.active_address) === JSON.stringify(this.state.mutable_address)) {
            debugger
            AxiosOrdersService.checkoutReusingAddress(this.state.cart_items, this.state.active_address.id).then(res => {
                if (res.data && res.data.success) {
                    const message = res.data.full_messages instanceof Array
                    && res.data.full_messages.length > 0 ? res.data.full_messages[0] : 'Order made successfully';
                    NotificationService.showDialogSuccess(message);
                    CartService.emptyCart();
                    this.props.history.push('/');
                }
            }).catch(err => {
                NotificationService.showDialogError(err.message);
            });
        } else {

            AxiosOrdersService.checkoutWithNewAddress(this.state.cart_items, this.state.mutable_address).then(res => {
                if (res.data && res.data.success) {
                    const message = res.data.full_messages instanceof Array
                    && res.data.full_messages.length > 0 ? res.data.full_messages[0] : 'Order made successfully';
                    NotificationService.showDialogSuccess(message);
                    this.props.history.push('/');
                }
            }).catch(err => {
                NotificationService.showDialogError(err.message);
            });
        }
    }

    onInputChange(key, evt) {
        this.setState({
            mutable_address: {
                ...this.state.mutable_address,
                [key]: evt.target.value
            }
        });
    }

    render() {
        const placehoderDiv = {
            marginTop: '70px',
            marginBottom: '70px'
        };
        let addressesView = <></>;
        if (this.state.addresses.length > 0) {

            let options = this.state.addresses.map(ad => {
                return <option key={ad.id}
                               value={ad.id}>{ad.street_address}/{ad.country}/{ad.city}/{ad.zip_code}</option>;
            });
            addressesView = <select onChange={this.onAddressChanged.bind(this)}>
                <option value="-1">Not selected</option>
                {options}</select>
        }
        return (
            <div
                className="card text-center shadow-lg p-3 mb-5 bg-white rounded page-hero d-flex align-items-center justify-content-center">
                <div className="cart-body">
                    {addressesView}
                    <h4>Shipping Address</h4>

                    <div className="form-group col-md-12">
                        <strong>First Name:</strong>
                        <input type="text" name="first_name" className="form-control"
                               onChange={(evt) => this.onInputChange('first_name', evt)}
                               value={this.state.mutable_address.first_name}/>
                    </div>
                    <div className="form-group col-md-12">
                        <strong>Last Name:</strong>
                        <input type=" text" name=" last_name" className="form-control"
                               onChange={(evt) => this.onInputChange('last_name', evt)}
                               value={this.state.mutable_address.last_name}/>
                    </div>

                    <div className="form-group col-md-12">
                        <div className=" col-md-12"><strong>Street Address</strong></div>
                        <input type=" text" name=" address" className=" form-control"
                               onChange={(evt) => this.onInputChange('street_address', evt)}
                               value={this.state.mutable_address.street_address}/>
                    </div>
                    <div className="form-group col-md-12">
                        <div className=" col-md-12"><strong>City:</strong></div>

                        <input type=" text" name=" city" className=" form-control"
                               onChange={(evt) => this.onInputChange('city', evt)}
                               value={this.state.mutable_address.city}/>

                    </div>
                    <div className="form-group col-md-12">
                        <div className=" col-md-12"><strong>Country:</strong></div>
                        <input type=" text" name=" state" className=" form-control"
                               onChange={(evt) => this.onInputChange('country', evt)}
                               value={this.state.mutable_address.country}/>
                    </div>
                    <div className="form-group col-md-12">
                        <div className=" col-md-12"><strong>Zip / Postal Code:</strong></div>
                        <input type=" text" name=" zip_code" className=" form-control"
                               onChange={(evt) => this.onInputChange('zip_code', evt)}
                               value={this.state.mutable_address.zip_code}/>
                    </div>


                </div>
                <div className="row cart-footer">
                    <button type="button" className="btn btn-primary btn-submit-fix"
                            onClick={this.placeOrder.bind(this)}>Place Order
                    </button>
                </div>
            </div>


        )
    }
}

export default Checkout
