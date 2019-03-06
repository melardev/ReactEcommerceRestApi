import React from "react";
import {AxiosOrdersService} from "../../services/net/AxiosOrdersService";
import NavigationMenu from "../partials/NavigationMenu";
import Layout from "../partials/Layout";

class OrderList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            classNames: ['card bg-light mb-3', 'card text-white bg-dark mb-3']
        }
    }

    componentDidMount() {
        debugger
        AxiosOrdersService.fetchAll().then(res => {
            this.setState({orders: res.data.orders})
        }).catch(err => {
            throw err;
        });
    }

    render() {

        const ordersView = this.state.orders.map((order, index) => {
            return (
                <div className={this.state.classNames[index % 2]} style={{maxWidth: "18rem;"}}>
                    <div className="card-header">{order.tracking_number}</div>
                    <div className="card-body">
                        <h5 className="card-title">{order.order_status}</h5>
                        <p className="card-text">{order.total_amount}$ for {order.order_items_count}</p>
                    </div>
                </div>
            )
        });
        return (
            <div className="container">
                <div className="row" style={{marginTop: "100px", marginBottom: "100px"}}>
                    {this.state.orders.length > 1 && ordersView}
                    {this.state.orders.length === 0 && <h3>You have not made any order yet</h3>}
                </div> &nbsp;
            </div>
        );
    }
}

export default OrderList;
