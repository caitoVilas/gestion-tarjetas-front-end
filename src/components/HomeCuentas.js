import React, {useEffect} from 'react';
import MenuCuentas from './MenuCuentas';
import Footer from './Footer'
import {Link} from 'react-router-dom';


const HomeCuentas = (props) => {

    const USERNAME_KEY = "authUserName";

    useEffect(() => {
        console.log(window.sessionStorage.getItem(USERNAME_KEY));
        if (window.sessionStorage.getItem(USERNAME_KEY) === null) {
          window.location = "/";
        }
      },[] );
    
    return(
        <>
            <MenuCuentas />
            <div className="container-fluid container-home py-2">
                <div className="container-form mt-5 text-center">
                    <h2 className=" text-white mt-5">Cuentas</h2>
                    <hr />
                    <h3 className="text-white">Titular :  {window.sessionStorage.getItem(USERNAME_KEY)}</h3>
                </div>
                <div className="container-form-in mt-5 py-3">
                    <div className="container container-form text-center py-4">
                      <Link to="/nueva-cuenta" className="border-btn _btn-green">
                        <i className="fas fa-plus-circle"></i> Crear Nueva Cuenta
                      </Link>
                      <div className="container container-form-in mt-3 py-3">
                         <p>Home Cuentas works!</p>
                      </div>
                      <br /><br />
                    </div>
                </div>
            </div>
           <Footer />
        </>
    );

}

export default HomeCuentas