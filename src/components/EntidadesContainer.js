import React, { useEffect, useState } from "react";
import MenuCuentas from "./MenuCuentas";
import Footer from "./Footer";
import Table from "react-bootstrap/Table";
import Entidad from "./Entidad";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const EntidadesContainer = (props) => {
  const USERNAME_KEY = "authUserName";
  const TOKEN_KEY = "authToken";

  const [entidades, setEntidades] = useState([]);
  const [form, setForm] = useState([]);
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    console.log(window.sessionStorage.getItem(USERNAME_KEY));
    if (window.sessionStorage.getItem(USERNAME_KEY) === null) {
      window.location = "/";
    }
    getEntidades("http://localhost:8080/api/entidad");
    
  }, []);

  const getEntidades = async (url) => {
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

      json.forEach( el => {
          setEntidades( (entidades) => [...entidades, el])
      })
     
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {

    setForm({
        ...form,
        [e.target.name]: e.target.value
    });
};

const handleSubmit = (e) => {
    e.preventDefault();

    const addEntidad = async (url) => {
        try{
            let resp = await fetch(url ,{
                method: "post",
                headers: {"content-type": "application/json",
                authorization: "Bearer " + window.sessionStorage.getItem(TOKEN_KEY) },
                body: JSON.stringify(form.nombre)
            })

            let json = await resp.json();
            MySwal.fire({
                title: <p>{json.mensaje}</p>
            })
            
            setEntidades((entidades) => []);
                                // reseteo del formulario
                                setForm({});
                                Array.from(document.querySelectorAll("input")).forEach(input => (input.value = ""));
            getEntidades("http://localhost:8080/api/entidad");
        }catch(err){
            MySwal.fire({
                title: <p>{err.mensaje}</p>
            })
        }
    }
    addEntidad("http://localhost:8080/api/entidad")
};
  return (
    <>
      <MenuCuentas />
      <div className="container-fluid container-home py-2">
        <div className="container-form mt-5">
          <h2 className="text-center text-white mt-5">Entidades</h2>
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
                  {entidades.map((en) => (
                    <Entidad 
                    key={en.id}
                    orden={en.id} 
                    nombre={en.nombre} 
                    />
                  ))}
                </tbody>
              </Table>
                </div>

            </div>
            <div className="col-12 col-md-5 container-form px-2 ml-auto mr-auto mt-3 mb-3">
                <div className="container text-center">
                <h4 className="text-center">Agregar Entidades</h4>
                <hr />
                <form onSubmit={handleSubmit}>
                    <input type="text" 
                    name="nombre" 
                    placeholder="Ingresa nombre de la Entidad"
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

export default EntidadesContainer;
