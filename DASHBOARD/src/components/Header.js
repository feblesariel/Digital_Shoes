import logo from '../assets/images/logo.png';
import React from 'react';

function Header() {
    return (
        <React.Fragment>
            <header>
                <nav className="navbar navbar-expand-lg bg-white fs-5">
                    <div className="container-fluid">
                        <a className="navbar-brand m-0" href="/">
                            <img src={logo} alt="" width="90" height="110" />
                        </a>
                    </div>
                </nav>
            </header>
        </React.Fragment>
    )
}

export default Header;
