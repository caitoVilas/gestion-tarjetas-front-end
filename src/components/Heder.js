import React from 'react';
import banner from '../assets/image/banner-cards.jpg';

const Header = (props) => {

    return(

        <header className="container-fluid container-header">
            <img src={banner}alt="fondo"></img>
        </header>
       
    );
}

export default Header