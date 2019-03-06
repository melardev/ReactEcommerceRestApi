import React from 'react'
import Layout from "../partials/Layout";
import NavigationMenu from "../partials/NavigationMenu";
import ProductSummary from "./ProductSummary";
import NProgress from 'nprogress'
import {ProductAxiosService} from '../../services/net/ProductAxiosService'
import {NotificationService} from "../../services/local/NotificationService";
import Pagination from "../partials/Pagination";

class ProductList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            page_meta: {}
        };
    }

    componentDidMount() {
        this.fetchProducts();
    }

    fetchMore(location, page, page_size) {
        this.fetchProducts({location, page, page_size});
    }

    fetchProducts(query) {
        ProductAxiosService.fetchPage(query).then(res => {
            console.log('The response is:');
            console.log(res.data.products);
            this.setState({products: res.data.products, page_meta: res.data.page_meta});
        }).catch(err => {
            NotificationService.showDialogError(err.message);
        });
    }

    render() {

        let ProductsSummary;
        if (this.state.products) {
            ProductsSummary = [...Array(this.state.products.length).keys()].map(i => {
                let product = this.state.products[i];
                return (
                    <ProductSummary
                        key={i}
                        image={product.image_urls.length > 0 ? product.image_urls[0] : ''}
                        name={product.name}
                        slug={product.slug}
                        price={product.price}
                        id={product.id}
                        url={'/products/' + product.slug}
                    />
                )
            });
        } else {
            ProductsSummary = <h2>Loading ...</h2>
        }

        return (

            <div className="container" style={{marginTop: "100px"}}>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="row">
                            {ProductsSummary}
                        </div>
                    </div>
                </div>
                <Pagination loadMore={this.fetchMore.bind(this)} pageMeta={this.state.page_meta}/>
            </div>
        )
    }
}

export default ProductList;
