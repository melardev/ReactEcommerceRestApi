import React from 'react'

import {NavLink} from 'react-router-dom'

const ProductSummary = (props) => (
    <>
        <div className="col-lg-4 col-md-6 mb-4" id={props.id}>
            <div className="card h-100">
                <a href="/"><img className="card-img-top" style={{height: "250px"}} src={props.image} alt=""/></a>
                <div className="card-body">
                    <h4 className="card-title">
                        <NavLink to={props.url}>{props.name}</NavLink>
                    </h4>
                    <h5>Price :${props.price}</h5>
                    <p className="card-text">{props.description}</p>
                </div>
                <div className="card-footer">

                    <NavLink className="btn btn-primary" style={{float: "right"}} to={props.url}>
                        Details
                    </NavLink>
                </div>
            </div>
        </div>
    </>
)

export default ProductSummary