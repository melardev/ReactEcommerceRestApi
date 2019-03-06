import React, {Component} from 'react'


class AppCarousel extends Component {
    render() {

        const Items = this.props.items.map((item, index) => (

            <div key={item.id} className={`carousel-item ${index === 0 ? 'active' : ''}`}
                 style={{backgroundImage: item.image ? `url(${item.image})` : `url('/images/macbook.jpg')`}}>
                <div className="carousel-caption d-none d-md-block">
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                </div>
            </div>
        ));

        return (
            <header>
                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                        {this.props.items.map((item, index) => (
                            <li data-target="#carouselExampleIndicators" data-slide-to={index} key={index}
                                className={index === 0 ? 'active' : ''}/>
                        ))}
                    </ol>
                    <div className="carousel-inner" role="listbox">
                        {Items}
                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button"
                       data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"/>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleIndicators" role="button"
                       data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"/>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            </header>
        );
    }
}

export default AppCarousel
