import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import ProductList from "./components/products/ProductList";
import Home from "./components/pages/Home";
import ProductDetails from "./components/products/ProductDetails";
import Cart from "./components/cart/Cart";
import Checkout from "./components/orders/Checkout";

import Register from "./components/users/Register";
import Login from "./components/users/Login";
import Profile from "./components/users/Profile";
import OrderList from "./components/orders/OrderList";
import AddressList from "./components/addresses/AddressList";
import Footer from "./components/partials/Footer";
import {Notifications} from "./components/partials/Notifications";
import Header from "./components/partials/Header";


const App = (props) => (
    <BrowserRouter>
        <div className="container">
            <Header/>
            <Notifications/>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/products" exact component={ProductList}/>
                <Route path="/products/:slug" exact component={ProductDetails}/>
                <Route path="/cart" exact component={Cart}/>
                <Route path="/profile" exact component={Profile}/>
                <Route path="/profile/orders" component={OrderList}/>
                <Route path="/profile/addresses" component={AddressList}/>
                <Route path="/checkout" component={Checkout}/>
                <Route path="/register" component={Register}/>
                <Route path="/login" component={Login}/>
            </Switch>
            <Footer/>
        </div>
    </BrowserRouter>
);

export default App;
