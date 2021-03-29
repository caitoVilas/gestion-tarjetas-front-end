import React, { useEffect, useState } from 'react';
import {useParams, Link} from 'react-router-dom';
import MenuCuentas from './MenuCuentas';
import Footer from './Footer';

const HomeMovimiento = () => {

    const USERNAME_KEY = "authUserName";
    const TOKEN_KEY = "authToken";

    const {id} = useParams();
    const [form, setForm] = useState([]);

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
            <div className="container container-form-in mt-3 py-3">
              <form>
                  <div className="row d-md-flex">
                      <div className="col-12 col-md-5 ml-auto mr-auto mb-1">
                        <label htmlFor="fecha_compra">Fecha de Compra</label>
                        <input
                            type="date" 
                            name="fecha_compra" 
                            placeholder="Fecha Compra"  
                            className="form-control"
                            onChange={handleChange}
                         />
                      </div>
                      <div className="col-12 col-md-5 ml-auto mr-auto mb-1">
                          <label htmlFor="fecha_vencimiento">Fecha de Vencimiento</label>
                         <input 
                            type="date" 
                            name="fecha_vencimiento" 
                            placeholder="Fecha vencimiento"  
                            className="form-control mb-1"
                            onChange={handleChange}
                         />
                      </div>
                  </div>
                <input 
                type="number" 
                name="importe" 
                placeholder="Importe"  
                className="form-control mb-1"
                onChange={handleChange}
                />
                <input 
                type="number" 
                name="cantidad_cuotas" 
                placeholder="Cantidad de Cuotas"  
                className="form-control mb-1"
                onChange={handleChange}
                />
              </form>
            </div>
                <div className="row d-flex justify-content-around">
                    <div className="col-5 mt-3 d-flex justify-content-around">
                            <Link to="/home-cuentas" className="border-btn _btn-red">Cancelar</Link>
                            <button type="submit" className="border-btn _btn-green">Siguiente</button>
                    </div>
                </div>
          </div>
        </div>
      </div>
      <Footer />
        </>
    );

}

export default HomeMovimiento