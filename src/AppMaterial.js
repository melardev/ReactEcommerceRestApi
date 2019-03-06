import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {createMuiTheme, MuiThemeProvider} from 'material-ui/styles'
import {blueGrey, lightGreen} from 'material-ui/colors'
import {hot} from 'react-hot-loader'
import PrivateRoute from "./services/guards/PrivateRoute";
import Menu from './components/base/material/Menu';
import Login from "./components/users/material/Login";
import Register from "./components/users/material/Register";
import Home from "./components/base/material/Home";
import MyCart from "./components/cart/material/MyCart";
import ProductDetails from "./components/Products/material/ProductDetails";
import OrderDetails from "./components/Orders/material/OrderDetails";
import CreateProduct from "./components/Products/material/CreateProduct";
import EditProduct from "./components/Products/material/EditProduct";
import EditProfile from "./components/users/material/EditProfile";
import Profile from "./components/users/material/Profile";
// Create a theme instance.
const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#8eacbb',
            main: '#607d8b',
            dark: '#34515e',
            contrastText: '#fff',
        },
        secondary: {
            light: '#e7ff8c',
            main: '#b2ff59',
            dark: '#7ecb20',
            contrastText: '#000',
        },
        openTitle: blueGrey['400'],
        protectedTitle: lightGreen['400'],
        type: 'light'
    }
});


class MainRouter extends React.Component {
    // Removes the server-side injected CSS when React component mounts
    componentDidMount() {
        const jssStyles = document.getElementById('jss-server-side')
        if (jssStyles && jssStyles.parentNode) {
            jssStyles.parentNode.removeChild(jssStyles)
        }
    }

    render() {
        return (<div>
            <Menu/>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/users" component={Users}/>
                <Route path="/signup" component={Register}/>
                <Route path="/login" component={Login}/>
                <PrivateRoute path="/user/edit/:userId" component={EditProfile}/>
                <Route path="/user/:userId" component={Profile}/>

                <Route path="/cart" component={MyCart}/>
                <Route path="/product/:productId" component={ProductDetails}/>
                {/*
                <Route path="/shops/all" component={Shops}/>
                <Route path="/shops/:shopId" component={Shop}/>
                <PrivateRoute path="/seller/orders/:shop/:shopId" component={ShopOrders}/>

                <PrivateRoute path="/seller/shops" component={MyShops}/>
                <PrivateRoute path="/seller/shop/new" component={NewShop}/>
                <PrivateRoute path="/seller/shop/edit/:shopId" component={EditShop}/>
                <Route path="/seller/stripe/connect" component={StripeConnect}/>
        */}
                <Route path="/order/:orderId" component={OrderDetails}/>


                <PrivateRoute path="/seller/:shopId/products/new" component={CreateProduct}/>
                <PrivateRoute path="/seller/:shopId/:productId/edit" component={EditProduct}/>


            </Switch>
        </div>)
    }
}

const AppMaterial = () => (
    <BrowserRouter>
        <MuiThemeProvider theme={theme}>
            <MainRouter/>
        </MuiThemeProvider>
    </BrowserRouter>
);

export default hot(module)(AppMaterial)
