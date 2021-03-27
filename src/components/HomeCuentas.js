import React, { useEffect, useState } from "react";
import MenuCuentas from "./MenuCuentas";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import ListCuentas from "./ListCuentas";

const HomeCuentas = (props) => {
  const USERNAME_KEY = "authUserName";
  const TOKEN_KEY = "authToken";
  const [cuentas, setCuentas] = useState([]);

  const findCuentas = async (url) => {
    try {
      let resp = await fetch(url, {
        method: "get",
        mode: "cors",
        headers: {
          "content-type": "application/json",
          authorization: "Bearer " + window.sessionStorage.getItem(TOKEN_KEY),
        },
      });

      let json = await resp.json();
      
      json.forEach(el =>{
        setCuentas((cuentas) => [...cuentas, el]);
      })
     
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (window.sessionStorage.getItem(USERNAME_KEY) === null) {
      window.location = "/";
    }
    findCuentas(
      "http://localhost:8080/api/cuentas/cuenta/" +
        window.sessionStorage.getItem(USERNAME_KEY)
    );
  }, []);

  return (
    <>
      <MenuCuentas />
      <div className="container-fluid container-home py-2">
        <div className="container-form mt-5 text-center">
          <h2 className=" text-white mt-5">Cuentas</h2>
          <hr />
          <h3 className="text-white">
            Titular : {window.sessionStorage.getItem(USERNAME_KEY)}
          </h3>
        </div>
        <div className="container-form-in mt-5 py-3">
          <div className="container container-form text-center py-4">
            <Link to="/nueva-cuenta" className="border-btn _btn-green">
              <i className="fas fa-plus-circle"></i> Crear Nueva Cuenta
            </Link>
            <div className="container container-form-in mt-3 py-3">
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Tarjeta</th>
                    <th>Entidad</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cuentas.map((el) => <ListCuentas  
                                                        key={el.id}
                                                        cuenta={el.id}
                                                        tarjeta={el.tarjeta.nombre}
                                                        entidad={el.entidad.nombre}
                                                        />)}
                    
                
                </tbody>
              </Table>
            </div>
            <br />
            <br />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomeCuentas;
