import React from 'react';

import { useAuth0 } from "@auth0/auth0-react";

import { SITE_TITLE } from "../../res/main";

import "./navbar.css";

const Navbar = () => {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <a className="navbar-brand" href="/">{SITE_TITLE}</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    {isAuthenticated ? (
                        <>
                            <a className="nav-item nav-link" href="/">Home</a>
                            <a className="nav-item nav-link" href="/addHabit">Add Habit</a>
                            <div className="nav-item nav-link" onClick={() => logout()}>Logout</div>
                        </>
                    ) : (
                        <div className="nav-item nav-link" onClick={() => loginWithRedirect()}>Login</div>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
