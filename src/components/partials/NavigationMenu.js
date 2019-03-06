import React from "react";
import {NavLink} from "react-router-dom";

class NavigationMenu extends React.Component {
    render() {
        return (
            <>
                <h1 className="mt-4 mb-3">Products
                    &nbsp;
                    <small>React</small>
                </h1>

                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li className="breadcrumb-item active">Products</li>
                </ol>
            </>

        );
    }
}

export default NavigationMenu;