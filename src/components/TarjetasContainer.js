import React, { useEffect, useState } from "react";
import MenuCuentas from "./MenuCuentas";
import Footer from "./Footer";
import Table from "react-bootstrap/Table";
import Tarjeta from './Tarjeta';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const TarjetasContainer = (props) => {
  const USERNAME_KEY = "authUserName";
  const TOKEN_KEY = "authToken";

  const [tarjetas, setTarjetas] = useState([]);
  const [form, setForm] = useState([]);
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    console.log(window.sessionStorage.getItem(USERNAME_KEY));
    if (window.sessionStorage.getItem(USERNAME_KEY) === null) {
      window.location = "/";
    }
    getTarjetas("http://localhost:8080/api/tarjeta");
  }, []);

  const getTarjetas = async (url) => {
    try {
      let res = await fetch(url, {
        method: "get",
        mode: "cors",
        headers: {
          "content-type": "application/json",
          authorization: "Bearer " + window.sessionStorage.getItem(TOKEN_KEY),
        },
      });
      
      let json = await res.json();

       json.forEach( (el => {
         setTarjetas( (tarjetas) => [...tarjetas, el])
       }))
      
      // setTarjetas( (tarjetas) => [...tarjetas, json])
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name] : e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const addTarjeta = async (url) => {
      try{
        let resp = await fetch(url, {
          method: "post",
          headers: {"content-type": "application/json",
          authorization: "Bearer " + window.sessionStorage.getItem(TOKEN_KEY) },
          body: JSON.stringify(form.nombre)
        })
        let json = await resp.json();
        MySwal.fire({
          title: <p>{json.mensaje}</p>
      })
        setTarjetas((tarjetas) => [])
                     // reseteo del formulario
                     setForm({});
                     Array.from(document.querySelectorAll("input")).forEach(input => (input.value = ""));
        getTarjetas("http://localhost:8080/api/tarjeta");
      }catch(err){
        MySwal.fire({
          title: <p>{err.mensaje}</p>
      })
      }
    }
    addTarjeta("http://localhost:8080/api/tarjeta");
  };

  const deleteTarjeta = async (url) => {

    try{
      let resp = await fetch(url,{
        method: "delete",
        mode: "cors",
        headers: {
          "content-type": "application/json",
          authorization: "Bearer " + window.sessionStorage.getItem(TOKEN_KEY),
        }
      })
  
      let json = await resp.json();
  
      MySwal.fire({
        title: <p>{json.mensaje}</p>
    })
  
    setTarjetas((tarjetas) => []);
    getTarjetas("http://localhost:8080/api/tarjeta");
  
    }catch(err){
      MySwal.fire({
        title: <p>{err.mensaje}</p>
    })
    }
  }

  return (
    <>
      <MenuCuentas />
      <div className="container-fluid container-home py-2">
        <div className="container-form mt-5">
          <h2 className="text-center text-white mt-5">Tarjetas</h2>
        </div>

        <div className="container-form-in mt-5">
          <div className="row">
            <div className="col-12 col-md-5 container-form px-2  ml-auto mr-auto mt-3 mb-3">
              <div className="container py-2">
                <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Nombre</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {tarjetas.map((en) => (
                      <Tarjeta 
                      key={en.id} 
                      orden={en.id} 
                      nombre={en.nombre} 
                      deleteTarjeta={deleteTarjeta}
                      />
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
            <div className="col-12 col-md-5 container-form px-2 ml-auto mr-auto mt-3 mb-3">
              <div className="container text-center">
                <h4 className="text-center">Agregar Tarjetas</h4>
                <hr />
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="nombre"
                    placeholder="Ingresa nombre de la Tarjeta"
                    className="form-control mb-3"
                    onChange={handleChange}
                  />
                  <button className="border-btn _btn-green" type="submit">Ingresar</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TarjetasContainer;
