import React from "react";
import { NavLink } from 'react-router-dom';


import './Navigation.css';

function Navigation() {

    return (
        <nav className="main-nav">
            <div className="main-nav__logo">
                <NavLink to="/">
                    <h1 className="logo">Brighte Eats</h1>
                </NavLink>
            </div>
            <div className="spacer" />
            <ul className="main-nav__items">
                <li  className="navigation-item">
                    <NavLink to="/">
                        Survey
                    </NavLink>
                </li>
                <li className="navigation-item">
                    <NavLink to="/leads">
                        Leads
                    </NavLink>
                </li>
            </ul>
        
        </nav>
    );
}

export default Navigation;