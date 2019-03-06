import React from 'react'


const PaymentDetails = (props) => {
    return (
        <>
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 col-md-pull-6 col-sm-pull-6">
                <div className="panel panel-info" style={{border: "1px solid"}}>
                    <div className="panel-heading" style={{padding: "10px"}}>Address</div>
                    <div className="panel-body">
                        <div className="form-group">
                            <div className="col-md-12">
                                <h4>Shipping Address</h4>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="col-md-6 col-xs-12">
                                <strong>First Name:</strong>
                                <input type="text" name="first_name" className="form-control"
                                       onChange={(evt) => props.onInputChange('first_name', evt)}
                                       value={props.address.first_name}/>
                            </div>
                            <div className=" span1"></div>
                            <div className=" col-md-6 col-xs-12">
                                <strong>Last Name:</strong>
                                <input type=" text" name=" last_name" className="form-control"
                                       onChange={(evt) => props.onInputChange('last_name', evt)}
                                       value={props.address.last_name}/>
                            </div>
                        </div>
                        <div className=" form-group">
                            <div className=" col-md-12"><strong>Street Address</strong></div>
                            <div className=" col-md-12">
                                <input type=" text" name=" address" className=" form-control"
                                       onChange={(evt) => props.onInputChange('street_address', evt)}
                                       value={props.address.street_address}/>
                            </div>
                        </div>
                        <div className=" form-group">
                            <div className=" col-md-12"><strong>City:</strong></div>
                            <div className=" col-md-12">
                                <input type=" text" name=" city" className=" form-control"
                                       onChange={(evt) => props.onInputChange('city', evt)}
                                       value={props.address.city}/>
                            </div>
                        </div>
                        <div className=" form-group">
                            <div className=" col-md-12"><strong>Country:</strong></div>
                            <div className=" col-md-12">
                                <input type=" text" name=" state" className=" form-control"
                                       onChange={(evt) => props.onInputChange('country', evt)}
                                       value={props.address.country}/>
                            </div>
                        </div>
                        <div className=" form-group">
                            <div className=" col-md-12"><strong>Zip / Postal Code:</strong></div>
                            <div className=" col-md-12">
                                <input type=" text" name=" zip_code" className=" form-control"
                                       onChange={(evt) => props.onInputChange('zip_code', evt)}
                                       value={props.address.zip_code}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-md-6 col-sm-6 col-xs-12">
                                <button type="button" className="btn btn-primary btn-submit-fix" onClick={props.placeOrder}>Place Order</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default PaymentDetails