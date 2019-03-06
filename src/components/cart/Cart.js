import React, {Component} from 'react'

import {NavLink} from 'react-router-dom'
import {CartService} from '../../services/local/CartService'

import NProgress from 'nprogress'
import './Cart.css'

class Cart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cart_items: [],
            totalPrice: 0,
        };
        // ES6 does not auto bind methods to itself, without this line of code 'this' keyword will not be accessible on onCartUpdated
        this.onCartUpdated.bind(this);

    }

    onCartUpdated(cart_items) {
        if (!!cart_items) {
            this.setState({
                cart_items,
                totalPrice: cart_items.reduce(
                    (accumulator, currentValue) => accumulator + currentValue.quantity * currentValue.price, 0)
            });
        }
    }

    componentWillMount() {
        CartService.subscribe((cart_items) => {
            this.onCartUpdated(cart_items)
        }, true);
    }

    componentDidMount() {
        NProgress.start(0.0);

        NProgress.done(1.0);
    }

    componentWillUnmount() {
        CartService.unsubscribe(this.onCartUpdated)
    }

    updateCart(cartItem, quantity) {
        CartService.addItem(cartItem, parseInt(quantity));
    }

    deleteProductFromCart(cartItem) {
        CartService.removeItem(cartItem);
    }

    calculateSubtotal(cartItem) {
        return cartItem.quantity * cartItem.price;
    }

    render() {
        const stylecon = {
            marginTop: '100px',
            marginBottom: '110px'
        };

        const checkoutImage = {
            height: '100px',
            width: '100px'
        };

        const productsRender = this.state.cart_items.map(cartItem => {
            return (
                <tr>
                    <td data-th="Product">
                        <div className="row">
                            <div className="col-sm-3 hidden-xs">
                                <img src={cartItem.image_urls[0]}
                                     style={checkoutImage}
                                     alt={cartItem.name}
                                     className="img-responsive"/></div>
                            <div className="col-sm-9">
                                <h4 className="nomargin">{cartItem.name}</h4>
                                <p>{cartItem.description}</p>
                            </div>
                        </div>
                    </td>
                    <td data-th="Price">${cartItem.price}</td>
                    <td data-th="Quantity">
                        <input className="form-control text-center" type="number" min="1"
                               onChange={(e) => this.updateCart(cartItem, e.target.value)}
                               defaultValue={cartItem.quantity}/>
                    </td>
                    <td data-th="Subtotal" className="text-center">{this.calculateSubtotal(cartItem)}$</td>
                    <div className="my-auto" data-th="">
                        <button className="remove-product"
                                onClick={() => this.deleteProductFromCart(cartItem)}>
                            X
                        </button>
                    </div>
                </tr>
            )
        });
        return (

            <div className="container" style={stylecon}>
                <table id="cart" className="table table-hover table-condensed">
                    <thead>
                    <tr>
                        <th style={{width: "50%"}}>Product</th>
                        <th style={{width: "10%"}}>Price</th>
                        <th style={{width: "8%"}}>Quantity</th>
                        <th style={{width: "22%"}} className="text-center">Subtotal</th>
                        <th style={{width: "10%"}}></th>
                    </tr>
                    </thead>
                    <tbody>
                    {productsRender}
                    </tbody>
                    <tfoot>
                    <tr className="visible-xs">
                        <td className="text-center"><strong>Total ${this.state.totalPrice}</strong></td>
                    </tr>
                    <tr>
                        <td><NavLink to="/products" className="btn btn-warning"><i
                            className="fa fa-angle-left"/>Continue Shopping</NavLink></td>
                        <td colSpan="2" className="hidden-xs"/>
                        <td className="hidden-xs text-center"><strong>Total ${this.state.totalPrice}</strong>
                        </td>
                        <td>
                            {/*} For now we update each time the user increases or decreases the quantity
                            <span className="btn btn-info btn-block" onClick={this.updateCart.bind(this)}>Update
                            </span>
                            */}
                            <NavLink to="/checkout" className="btn btn-success btn-block">
                                Checkout
                                <i className="fa fa-angle-right"/>
                            </NavLink>
                        </td>
                    </tr>
                    </tfoot>
                </table>
            </div>

        )
    }
}

export default Cart
