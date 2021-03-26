import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import Footer from './Footer';
import Menu from './Menu';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';



const Registro = (props) => {

    const [form, setForm] = useState([{}]);

    const MySwal = withReactContent(Swal);

    const handleChanged = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        let check = true;

        if(form.nombre === undefined){
            check = false;
        }
        if(form.nombreUsuario === undefined){
            check = false;
        } 

        if(check){
            console.log("todo ok")
        }else {
            console.log("faltan datos")
        };

        const newUser = async (url) => {

          
                try{
                    let res = await fetch(url, {
                        method: "post",
                        headers: {"content-type": "application/json"},
                        body: JSON.stringify(form)
                    }) 

                    let json = await res.json();
                  
                   var mensaje = json.mensaje;
                   
                    MySwal.fire({
                        title: <p>{mensaje}</p>
                    })

                    // reseteo del formulario
                    setForm({});
                   Array.from(document.querySelectorAll("input")).forEach(input => (input.value = ""));
                }catch(err){
                   mensaje = err.mensaje;
                   MySwal.fire({
                    title: <p>{mensaje}</p>
                })
                }
            
        }

        newUser("http://localhost:8080/api/auth/nuevo");
    }

    return(
        <>
             <Menu />
             <div className="container-fluid container-registro">
                <div className="container container-form py-5">
                    <h3 className="text-center mb-3">Registro Usuario</h3>
                    <form onSubmit={handleSubmit}>
                        <input
                                type="text"
                                name="nombre"
                                placeholder="Ingresa tu nombre"
                                className="form-control mb-1"
                                onChange={handleChanged}
                        />
                        <input
                            type="text"
                            name="nombreUsuario"
                            placeholder="Ingresa nombre de usuario"
                            className="form-control mb-1"
                            onChange={handleChanged}
                        />
                       <input
                            type="email"
                            name="email"
                            placeholder="Ingresa tu email"
                            className="form-control mb-1"
                            onChange={handleChanged}
                        />
                       <input
                            type="password"
                            name="password"
                            placeholder="Ingresa tu contraseña"
                            className="form-control mb-1"
                            onChange={handleChanged}
                        />
                         <div className="container container-btns">
                            <Link to="/" className="border-btn _btn-red">Cancelar</Link>
                            <button className="border-btn _btn-green" type="submit">Guardar</button>
                         </div>
                    </form>
                </div>
               
             </div>

             <Footer />
        </>
       

    );
}

export default Registro