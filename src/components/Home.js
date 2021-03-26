import React from 'react';
import Footer from './Footer';
import Header from './Heder';
import Menu from './Menu';

const Home = (props) => {

    return(
        <>
        <Menu />
        <Header />
            <div className="container text-center container-home">
                <h1>Sistema Gestion Tatjetas</h1>
                <hr />
                <h3 className="py-5">Registrate e Ingresa para Operar</h3>
            </div>
       
        <Footer />
        
        </>
    );

}

export default Home