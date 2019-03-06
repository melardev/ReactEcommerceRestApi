import React from "react";
import {AxiosAddressesService} from "../../services/net/AxiosAddressesService";

class AddressList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            addresses: [],
            classNames: ['card bg-light mb-3', 'card text-white bg-dark mb-3']
        }
    }

    componentDidMount() {
        AxiosAddressesService.fetchAll().then(res => {
            this.setState({addresses: res.data.addresses})
        }).catch(err => {
            throw err;
        });
    }

    render() {
        const addressesView = this.state.addresses.map((address, index) => {
            return (
                <div className={this.state.classNames[index % 2]} style={{maxWidth: "18rem;"}}>
                    <div className="card-header">{address.first_name} {address.last_name} </div>
                    <div className="card-body">
                        <h5 className="card-title">{address.street_address} {address.city} {address.country}</h5>
                        <p className="card-text">Zip code: {address.zip_code}</p>
                    </div>
                </div>
            )
        });
        return (
            <div className="container" style={{marginTop: "100px", marginBottom: "100px"}}>
                <div className="row">
                    {this.state.addresses.length > 1 && addressesView}
                    {this.state.addresses.length === 0 && <h3>You have not made any order yet</h3>}
                </div>
            </div>
        );
    }
}

export default AddressList;
