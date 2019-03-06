import React from "react";
import swal from 'sweetalert2'
import {ToastContainer, toast} from 'react-toastify';
import {NotificationService} from "../../services/local/NotificationService";

export const Notifications = class Notifications extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            alert: {type: '', message: ''},
            toast: {className: '', message: ''},
            notification_callback: this.onNotificationReceived.bind(this)
        };
    }

    componentWillMount() {
        NotificationService.subscribe(this.state.notification_callback);
    }

    componentWillUnmount() {
        NotificationService.unsubscribe(this.state.notification_callback);
    }

    onNotificationReceived(message) {
        if (message.show_toast) {
            toast.dismiss();
            toast(<div className={message.toast.class_name || "alert alert-success"}>
                <span>{message.toast.title || 'Message'}</span>: {message.toast.message}</div>, {
                autoClose: 3000,
                closeButton: false // Remove the super ugly close button that ships by default
            });

        } else if (message.show_alert) {
            swal.fire({
                title: 'Notification',
                text: message.alert.message,
                type: message.alert.type,
                showCancelButton: false,
                showConfirmButton: false,
                showCloseButton: false,
                timer: 4000
            });

        }
    }

    render() {
        return (
            <ToastContainer
                newestOnTop={false}
                closeOnClick
                pauseOnHover
            />
        );
    }
};
