import React, {Component} from 'react'
import {Redirect, Route} from 'react-router-dom'
import {AxiosUsersService} from "../net/AxiosUsersService";


const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => (
        AxiosUsersService.isAuthenticated() ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{
                pathname: '/login',
                state: {from: props.location}
            }}/>
        )
    )}/>
);

export default PrivateRoute
