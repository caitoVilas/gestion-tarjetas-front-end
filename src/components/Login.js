import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import Menu from './Menu';
import Footer from './Footer';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const Login = (props) => {

    const [form, setForm] = useState([]);

    const MySwal = withReactContent(Swal);

    const USERNAME_KEY = 'authUserName';
    const TOKEN_KEY = 'authToken';
    const AUTH_KEY = 'autAuthorities';

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // let check = true;

        // //Validacion
        // if(form.nombreUsuario === undefined){
        //     check = false;
        // }

        // if(form.password === undefined){
        //     check = false;
        // }

        const onLogin = async (url) => {
            try{
                let res = await fetch(url, {
                    method: "post",
                    headers: {"content-type": "application/json"},
                    body: JSON.stringify(form)
                }) 

                let json = await res.json();
                window.sessionStorage.removeItem(USERNAME_KEY);
                window.sessionStorage.setItem(USERNAME_KEY, json.nombreUsuario);
                window.sessionStorage.removeItem(TOKEN_KEY);
                window.sessionStorage.setItem(TOKEN_KEY, json.token);
                window.sessionStorage.removeItem(AUTH_KEY);
                window.sessionStorage.setItem(AUTH_KEY, json.authorities[0].authority);
              
               var mensaje = json.nombreUsuario;
               
                MySwal.fire({
                    title: <p>Bienvenido {mensaje}</p>
                });
                // reseteo del formulario
                setForm({});
               Array.from(document.querySelectorAll("input")).forEach(input => (input.value = ""));

               setTimeout(() =>{
                window.location = "/home-cuentas";
               },2000);
            //    window.location.href ="/home-cuentas";

            }catch(err){
                MySwal.fire({
                 title: <p>No Autorizado</p>
             });
            }
     };
     onLogin("http://localhost:8080/api/auth/login");
    }
return(
    <>
    <Menu />
    <div className="container-fluid container-registro">
       <div className="container container-form py-5">
           <h3 className="text-center mb-3">Ingreso Usuario</h3>
           <form onSubmit={handleSubmit}>
               
               <input
                   type="text"
                   name="nombreUsuario"
                   placeholder="Ingresa nombre de usuario"
                   className="form-control mb-1"
                   onChange={handleChange}
               />
             
              <input
                   type="password"
                   name="password"
                   placeholder="Ingresa tu contraseña"
                   className="form-control mb-1"
                  onChange={handleChange}
               />
                <div className="container container-btns">
                   <Link to="/" className="border-btn _btn-red">Cancelar</Link>
                   <button className="border-btn _btn-green" type="submit">Ingresar</button>
                </div>
           </form>
       </div>
      
    </div>

    <Footer />
</>
);
}

export default Login