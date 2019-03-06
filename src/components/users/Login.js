import React from "react";
import Layout from "./../partials/Layout";
import NavigationMenu from "./../partials/NavigationMenu";
import {UsersService} from "../../services/local/UsersService";
import {AxiosUsersService} from "../../services/net/AxiosUsersService";
import {NotificationService} from "../../services/local/NotificationService";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            message: '',
            show_message: false,
            classNameForMessage: '',
        }
    }

    onUserStateUpdate(user) {
        // TODO: redirect the user
        console.log('Login::onUserStateUpdate()')
    }

    componentWillMount() {
        UsersService.subscribe(this.onUserStateUpdate.bind(this))
    }

    componentWillUnmount() {
        UsersService.unsubscribe(this.onUserStateUpdate);
    }

    onSubmitForm(evt) {
        AxiosUsersService.login(this.state).then(res => {
            if (res.data && res.data.success) {
                this.setState({
                    show_message: true,
                    message: res.data.full_messages && res.data.full_messages.length > 0 ? res.data.full_messages[0] : 'I guess You logged In successfully',
                    classMessage: 'text-success'
                });
                res.data.user.token = res.data.token;
                UsersService.authenticate(res.data.user);
                NotificationService.showToastSuccess('Logged in successfully');
                this.props.history.push('/');
            }
        }).catch(err => {
            this.setState({
                show_message: true,
                message: err,
                classMessage: 'text-danger'
            });
            NotificationService.showDialogError(err.message);
        });
    }

    onInputChange(key, evt) {
        this.setState({[key]: evt.target.value});
    }

    render() {
        return (
            <div className="container" style={{marginTop: "100px"}}>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="row">
                            <form className="form-horizontal">
                                <fieldset>
                                    <div id="legend">
                                        <legend className="">Login</legend>
                                    </div>
                                    <div className="control-group">
                                        <label className="control-label" htmlFor="username">Username</label>
                                        <div className="controls">
                                            <input type="text" id="username" name="username"
                                                   value={this.state.username}
                                                   onChange={(evt) => this.onInputChange('username', evt)}
                                                   placeholder="your username"
                                                   className="form-control"/>
                                        </div>
                                    </div>

                                    <div className="control-group">
                                        <label className="control-label" htmlFor="password">Password</label>
                                        <div className="controls">
                                            <input type="password" id="password"
                                                   name="password" placeholder=""
                                                   value={this.state.password}
                                                   onChange={(evt) => this.onInputChange('password', evt)}
                                                   className="form-control"/>
                                            <p className="help-block">the password you will be using</p>
                                        </div>
                                    </div>

                                    <div className="control-group">
                                        <div className="controls">
                                            <button className="btn btn-success" type="button"
                                                    onClick={this.onSubmitForm.bind(this)}>
                                                Login
                                            </button>
                                        </div>
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;
