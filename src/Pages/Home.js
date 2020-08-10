import React, { useEffect } from 'react';
import Header from "../Components/Header";
import Form from "../Components/Form";
import Footer from "../Components/Footer";

const Home = () => {
    useEffect(() => {
        const navList = document.querySelectorAll("li");
        navList[2].style.display = "none";
    });
    return (
    <>
        <div className="container-xl container-fluid">
            <Header />
            <main id="home">
                <div className="intro row">
                    <div className="col-12 col-sm-6 col-xm-6 right">
                        <div className="logo-text">
                            <div className="logo-img" data-aos="fade-right"><h1>CMS</h1></div>
                            <h3 data-aos="fade-down"><span>CENSUS</span><span>MANAGEMENT</span><span>SYSTEM</span></h3>
                        </div>
                        <h5 data-aos="fade-left"><em>Get Counted</em></h5>
                        <p className="text-center" data-aos="fade-right">A web data collection for taking statistics of the population</p>
                        <a data-aos="fade-right" href="#footer">Get Started</a>
                    </div>
                    <div className="col-12 col-sm-6 col-xm-6">
                        <div data-aos="fade-left" className="data-circle"></div>
                    </div>
                </div>
             <Form />
            </main>
            <Footer />
        </div>
    </>
    )
}
export default Home;