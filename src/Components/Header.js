import React, { useState } from 'react';
import { Link } from "react-router-dom";

const Header = () => {
    const width = window.innerWidth;
    const inputRef = React.createRef();
    const input2Ref = React.createRef();
    const nav = React.createRef();
    const navMenu = React.createRef();

    const [showMenu, setShowMenu] = useState(false);
    const toggleMenu = () =>{
    if(!showMenu) {
        inputRef.current.classList.add("open");
        input2Ref.current.classList.add("open");
        nav.current.classList.add("open");
        navMenu.current.classList.add("open");
        setShowMenu(true);
  } else {
        inputRef.current.classList.remove("open");
        input2Ref.current.classList.remove("open");
        nav.current.classList.remove("open");
        navMenu.current.classList.remove("open");
        setShowMenu(false);
  }
}
   const navType = (width) => {
   if(width > 545) {
        return (
        <header data-aos="fade-down" id="header">
        <div className="row">
            <div className="col-3">
                <div className="icon"><h1><Link to="/">CMS</Link></h1> </div>
            </div>
            <div className="col-9 navbar">
                <li className="active"><Link to="/">Home</Link></li>
                <li><Link to="/official">Official</Link></li>
                <li><Link to="/administrative">Administrative</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
            </div>
        </div>
        </header>
    )
} else return (
    <>
     <div className="menu-btn" ref={inputRef} onClick={toggleMenu}>
        <span className="menu-btn-burger" ref={input2Ref}></span>
    </div>
    <div className="icon"><h2>CMS</h2></div>
    <header className="mobile-header" ref={nav}>
        <div className="row">
            <div className="col-3">
            </div>
            <div className="col-9 mobile-nav" ref={navMenu}>
                <li className="active"><Link to="/">Home</Link></li>
                <li><Link to="/official">Official</Link></li>
                <li><Link to="/administrative">Administrative</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
            </div>
        </div>
        </header>
    </>
)
}


   return navType(width);
}

export default Header;