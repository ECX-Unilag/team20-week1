import React, { useEffect } from 'react';
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const About = () => {
    useEffect(() => {
        const navList = document.querySelectorAll("li");
        navList.forEach(list => {
            if (list.classList.contains("active")) {
                list.classList.remove("active");
            }
        })
        navList[2].style.display = "none";
        navList[3].classList.add("active");
    })
    return (
        <>
        <div className="container-xl container-fluid">
        <Header/>
        <div className="row" id="about">
            <div className="col-lg-6 col-md-6 col-sm-12 about-text">
                <h2 data-aos="fade-right" data-aos-delay="100"><strong>Ab<span>out U</span>s</strong></h2>
                <p data-aos="fade-right" data-aos-delay="300">We are a team of designers and developers working synchronously to bring ideas to life, solving real life problems.</p>
                <p data-aos="fade-right" data-aos-delay="500">Diligence, attention to detail and team collaboration channel our pool of skills into stellar projects with flawless performance.</p>
                <p data-aos="fade-right" data-aos-delay="700">We are the <strong>ECX Team-20.</strong></p>
            </div>
            <div data-aos="fade-left" data-aos-delay="100" className="col-lg-6 col-md-6 col-sm-12 about-img">
            </div>
        </div>
        <Footer />
        </div>
        </>
    )
}
export default About;