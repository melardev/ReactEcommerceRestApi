import React from 'react'
import Header from "./Header";
import Footer from "./Footer";

const Layout = (props) => (
    <>
        <div>
            <Header/>
        </div>
        <div>
            {props.children}
        </div>
        <div>
            <Footer/>
        </div>
    </>

);

export default Layout