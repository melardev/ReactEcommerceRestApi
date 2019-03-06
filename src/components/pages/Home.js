import React from 'react'
import Layout from "../partials/Layout";
import NavigationMenu from "../partials/NavigationMenu";
import AppCarousel from "../partials/AppCarousel";
import NProgress from 'nprogress'
import {PagesAxiosService} from '../../services/net/PagesAxiosService'
import {NotificationService} from "../../services/local/NotificationService";

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tags: [], categories: []
        };
    }

    componentDidMount() {
        PagesAxiosService.getHome().then(res => {
            if (res.data.success && res.data.tags && res.data.categories)
                this.setState({tags: res.data.tags, categories: res.data.categories});
            else
                console.error('[-] Home response not expected')
        }).catch(err => {
            NotificationService.showDialogError(err.message);
        });
    }

    render() {

        let TagViews, CategoryViews, Views;
        const carouselItems = [];
        let uniqueKeys = 0;
        if (this.state.tags) {
            TagViews = [...Array(this.state.tags.length).keys()].reduce((returnValues, currentValue) => {
                let tag = this.state.tags[currentValue];
                if (currentValue === 0) {
                    carouselItems.push({
                        id: tag.id,
                        name: tag.name,
                        description: tag.description,
                        image: tag.image_urls[0]
                    });
                }
                let view = (
                    <div key={uniqueKeys++} className="col-lg-4 col-md-6 mb-4" id={tag.id}>
                        <div className="card h-100">
                            <a href="/"><img className="card-img-top" style={{height: "250px"}}
                                             src={tag.image_urls[0]}
                                             alt=""/></a>
                            <div className="card-body">
                                <h4 className="card-title">
                                    {/*<NavLink to={tag.slug}>{tag.name}</NavLink>*/}
                                </h4>
                                <p className="card-text">{tag.description}</p>
                            </div>
                            <div className="card-footer">
                                <small className="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</small>
                                {/*<NavLink className="btn btn-primary" style={{float: "right"}} to={tag.slug}>Show More</NavLink>*/}
                            </div>
                        </div>
                    </div>

                );
                returnValues.push(view);

                return returnValues;
            }, []);
        } else {
            TagViews = <h2>Loading ...</h2>
        }
        if (this.state.categories) {
            CategoryViews = [...Array(this.state.categories.length).keys()].reduce((returnValues, currentValue) => {
                let category = this.state.categories[currentValue];
                if (currentValue === 0) {
                    carouselItems.push({
                        id: category.id,
                        name: category.name,
                        description: category.description,
                        image: category.image_urls[0]
                    });
                }
                let view = (

                    <div key={uniqueKeys++} className="col-lg-4 col-md-6 mb-4" id={category.id}>
                        <div className="card h-100">
                            <a href="/"><img className="card-img-top" style={{height: "250px"}}
                                             src={category.image_urls[0]}
                                             alt=""/></a>
                            <div className="card-body">
                                <h4 className="card-title">
                                    {/*<NavLink to={tag.slug}>{tag.name}</NavLink>*/}
                                </h4>
                                <p className="card-text">{category.description}</p>
                            </div>
                            <div className="card-footer">
                                <small className="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</small>
                                {/*<NavLink className="btn btn-primary" style={{float: "right"}} to={tag.slug}>Show More</NavLink>*/}
                            </div>
                        </div>
                    </div>

                );
                returnValues.push(view);

                return returnValues;
            }, []);
        } else {
            CategoryViews = <h2>Loading ...</h2>
        }

        Views = TagViews.concat(CategoryViews);
        return (
            <>
                <div className="slider">
                    <AppCarousel items={carouselItems}/>
                </div>
                <div className="container" style={{marginTop: "100px"}}>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="row">
                                {Views}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Home;
