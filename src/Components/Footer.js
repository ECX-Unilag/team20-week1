import React from 'react';
import { Link } from "react-router-dom";

const Footer = ()=> {
    return (
            <footer id="footer">
                <div className="row">
                    <div className="col-lg-4 col-md-12 col-sm-12 logo">
                        <div className="footer-icon"><h1><Link to="/">CMS</Link></h1></div>
                        <h4><span>CENSUS</span><span>MANAGEMENT</span><span>SYSTEM</span></h4>
                    </div>
                    <div className="col-lg-8 col-md-12 col-sm-12 right">
                        <div className="footer-links">
                        <li className="active"><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fa fa-twitter"></i></a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fa fa-facebook"></i></a>
                        </div>
                        <div className="copyright"> Copyright &copy; 2020</div>
                    </div>
                </div>
            </footer>
    )
}
export default Footer;