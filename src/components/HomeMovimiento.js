import React, { useEffect, useState } from 'react';
import {useParams, Link} from 'react-router-dom';
import MenuCuentas from './MenuCuentas';
import Footer from './Footer';
import FormDetalle from './FormDetalle';
import DetalleMovimiento from './DetalleMovimiento';

const HomeMovimiento = () => {

    const USERNAME_KEY = "authUserName";
    //const TOKEN_KEY = "authToken";

    const {id} = useParams();
    const [form, setForm] = useState([]);
    const [pase, SetPase] = useState(false);

    useEffect(() =>{
        if (window.sessionStorage.getItem(USERNAME_KEY) === null) {
            window.location = "/";
          }

    },[]);

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        SetPase({
            pase: true
        })
    }

    return(
        <>
        <MenuCuentas />
        <div className="container-fluid container-home py-2">
        <div className="container-form mt-5 text-center">
          <h2 className=" text-white mt-5">Movimientos</h2>
          <hr />
          <h3 className="text-white">
            Titular : {window.sessionStorage.getItem(USERNAME_KEY)}
          </h3>
          <p> cuenta : {id}</p>
        </div>
        <div className="container-form-in mt-5 py-3">
          <div className="container container-form text-center py-4">
            <h4>Detalle Movimiento</h4>
            {!pase && 
                <FormDetalle 
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                />
            }
            {pase &&
                <DetalleMovimiento 
                form={form}
                titular={id}
                />
            }   
            </div>
          
            {pase &&
                            <div className="row d-flex justify-content-around">
                            <div className="col-5 mt-3 d-flex justify-content-around">
                                    <Link to="/home-cuentas" className="border-btn _btn-red">Cancelar</Link>
                                    <button type="submit" className="border-btn _btn-green">Guardar</button>
                            </div>
                        </div>
            }

          </div>
       
      </div>
      <Footer />
        </>
    );

}

export default HomeMovimiento