let observers = [];

const state = {
    is_loading: [],
};

function notifyObservers(message) {
    observers.forEach(o => {
        o(message);
    });
}

export const NotificationService = {
    subscribe(observer) {
        if (observers.indexOf(observer) === -1) {
            observers.push(observer);
        }
    },
    unsubscribe(observer) {
        if (observers.includes(observer)) {
            observers = observers.filter(o => o !== observer);
        }
    },

    setIsLoading(bool) {
        if (bool)
            state.is_loading = state.is_loading++;
        else
            state.is_loading = state.is_loading--;
    },

    showToastSuccess(message) {
        notifyObservers({show_toast: true, toast: {message, class_name: 'alert alert-success'}});
    },

    showDialogSuccess(message) {
        notifyObservers({show_alert: true, alert: {message, type: 'success'}});
    },
    showDialogError(message) {
        notifyObservers({show_alert: true, alert: {message, type: 'error'}});
    },



};
