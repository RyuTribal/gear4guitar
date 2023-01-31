import React from 'react';
import logo from './react.png';
import './home.css';

function Home() {
    return (
        <div className="Home">
            <img src={logo} className="Home-logo" alt="logo" />
            <h1>
                Testicals
            </h1>
        </div>
    );
}

export default Home;
