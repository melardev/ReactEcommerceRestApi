import React from 'react'
import {NavLink, withRouter} from 'react-router-dom'
import {CartService} from "../../services/local/CartService";
import {UsersService} from "../../services/local/UsersService";

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            cart: [],
            cart_change_callback: this.onCartUpdated.bind(this),
            user_change_callback: this.onUserUpdated.bind(this)
        }
    }

    componentWillMount() {
        CartService.subscribe(this.state.cart_change_callback);
        UsersService.subscribe(this.state.user_change_callback)
    }

    componentWillUnmount() {
        CartService.unsubscribe(this.state.cart_change_callback);
        UsersService.unsubscribe(this.state.user_change_callback)
    }

    onCartUpdated(cart) {
        this.setState({cart});
    }

    onUserUpdated(user) {
        const newState = {
            user
        };

        if (user.username) {
            newState.is_logged_in = true;
        } else {
            newState.is_logged_in = false;
        }
        this.setState(newState);
    }

    logout() {
        UsersService.clearSession();
        if (this.props.location.pathname.startsWith('/profile'))
            this.props.history.push('/');
    }

    render() {
        let userView;
        if (this.state.is_logged_in)
            userView = <h1>Profile</h1>;
        else
            userView = <h2>Register</h2>;

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div className="container">
                    <NavLink className="navbar-brand" to="/">Melardev</NavLink>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarResponsive"
                            aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active">
                                <NavLink className="nav-link" to="/" exact
                                         activeStyle={{color: 'white'}}>Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/products"
                                         activeStyle={{color: 'white'}}>Products</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/cart" activeStyle={{color: 'white'}}>Cart</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/contact"
                                         activeStyle={{color: 'white'}}>Contact</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/about"
                                         activeStyle={{color: 'white'}}>About</NavLink>
                            </li>
                            {this.state.is_logged_in ? (
                                <>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/profile"
                                                 activeStyle={{color: 'white'}}>Profile</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        {/*<NavLink className="nav-link" to="/logout" activeStyle={{color: 'white'}}>Logout</NavLink>*/}
                                        <span className="nav-link" onClick={this.logout.bind(this)}
                                              activeStyle={{color: 'white'}}>Logout</span>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/register"
                                                 activeStyle={{color: 'white'}}>Register</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/login"
                                                 activeStyle={{color: 'white'}}>Login</NavLink>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>

        );
    }
}

export default withRouter(Header)
