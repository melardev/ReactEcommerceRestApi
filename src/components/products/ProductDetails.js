import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import {ProductAxiosService} from '../../services/net/ProductAxiosService'
import {CartService} from "../../services/local/CartService";
import {NotificationService} from "../../services/local/NotificationService";

class ProductDetails extends Component {

    constructor(props) {
        super(props);

        // ES6 does not auto bind methods to itself, without this line of code 'this' keyword will not be accessible on onCartUpdated
        this.onCartUpdated.bind(this);
        this.state = {
            product: {},
            cart_items: [],
            quantity: 1,
            is_in_cart: false,
        };
    }

    onCartUpdated(cart_items) {
        // If we have indeed a non empty list of cart_items
        if (!!cart_items) {
            const newState = {cart_items, quantity: 1, is_in_cart: false};
            // then, if we already loaded the product from the server
            if (this.state.product.slug != null) {
                // If we have an update when the product is already fetched
                // then proceed to update more things, such as the quantity

                const cartItem = cart_items.find(ci => ci.id === this.state.product.id);
                if (cartItem) {
                    newState.cart_item = cartItem;
                    newState.is_in_cart = true;
                    newState.quantity = cartItem.quantity;
                }

            }
            this.setState(newState);
        }
    }


    componentWillMount() {
        CartService.subscribe(this.onCartUpdated.bind(this), true);
    }

    componentDidMount() {

        const self = this;
        const slug = this.props.match.params.slug;

        ProductAxiosService.getBySlug(slug).then(function (response) {
            console.log(response.data);
            if (response.data && response.data.success) {
                const cartItem = self.state.cart_items.find(ci => ci.id === response.data.id);
                const newState = {
                    product: response.data,
                    quantity: 1,
                };

                if (cartItem) {
                    newState.cart_item = cartItem;
                    newState.is_in_cart = true;
                    newState.quantity = cartItem.quantity;
                }
                // TODO: Check if the price in the cart does not match the price retrieved from the API and alert the user if different
                self.setState(newState)
            }
        }).catch(err => {
            NotificationService.showDialogError(err.message);
        });

    }

    componentWillUnmount() {
        CartService.unsubscribe(this.onCartUpdated)
    }

    productAdd() {
        CartService.addItem(this.state.product, parseInt(this.state.quantity));
    }


    deleteFromCart = () => {
        CartService.removeItem(this.state.product)
    };

    render() {
        if (this.state.product.slug != null) {
            return (

                <div className="container" style={{marginTop: "100px", marginBottom: "100px"}}>
                    <div className="row">
                        <div className="col-md-6">
                            <img className="card-img-top" src={this.state.product.image_urls[0]} alt=""/>
                        </div>
                        <div className="col-md-6">
                            <hr/>
                            <h3>{this.state.product.name}</h3>
                            <hr/>
                            <p>{this.state.product.description}</p>
                            <hr/>
                            <strong>Quantity</strong>
                            <input type="number" className="form-control col-md-2" name="quantity"
                                   value={this.state.quantity}
                                   onChange={(evt) => {
                                       this.setState({quantity: parseInt(evt.target.value)})
                                   }}/>
                            <h4>Price: $<strong>{this.state.product.price.toFixed(2)}</strong></h4>

                            {this.state.is_in_cart &&
                            <button className="btn btn-danger" onClick={this.deleteFromCart.bind(this)}>
                                Remove from cart
                            </button>}
                            &nbsp;
                            <button className="btn btn-warning" onClick={this.productAdd.bind(this)}>
                                {this.state.is_in_cart ? 'Update quantity' : 'Add to cart'}
                            </button>
                            &nbsp;
                            <NavLink className="btn btn-success" to='/checkout'>
                                <i className="fa fa-shopping-cart"/> Buy Now</NavLink>
                        </div>
                    </div>
                    <br/>
                    <hr/>
                    <h3> Related Products </h3>
                    <hr/>
                    {/*<RelatedProduct/>*/}
                </div>
            )
        } else {
            return <h1>Loading ...</h1>
        }
    }
}


export default ProductDetails
