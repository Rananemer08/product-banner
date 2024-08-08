import React, { useState, useEffect } from 'react';
import './navbar.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [navBlack, setNavBlack] = useState(false);

    const handleMenuClick = () => {
        setMenuOpen(!menuOpen);
    };

    const handleScroll = () => {
        if (window.scrollY > 0) {
            setNavBlack(true);
        } else {
            setNavBlack(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header>
            <nav className={navBlack ? 'black' : ''}>
                <div className="menu-icon" onClick={handleMenuClick}>
                    <i className="fa fa-bars fa-2x"></i>
                </div>
                <div className="logo">
                    LOGO
                </div>
                <div className="menu">
                    <ul className={menuOpen ? 'showing' : ''}>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Shop</a></li>
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">Contact</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Login</a></li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
