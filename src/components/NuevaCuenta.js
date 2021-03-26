import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import MenuCuentas from './MenuCuentas';

const NuevaCuenta = (props) => {

    const USERNAME_KEY = "authUserName";
    const TOKEN_KEY = "authToken";

    //const [form, setForm] = useState([]);
    const [tarjetas, setTarjetas] = useState([]);
    const [entidades, setEntidades] = useState([]);

    useEffect(() =>{
        if (window.sessionStorage.getItem(USERNAME_KEY) === null) {
            window.location = "/";
          };
        //CARGA TARJETAS y ENTIDADES
        getTarjetas("http://localhost:8080/api/tarjeta");
        getEntidades("http://localhost:8080/api/entidad")
    },[]);

// CaPTAMOS LAS TARJETAS
   const getTarjetas = async (url) => {
       try{
         let resp = await fetch(url, {
            method: "get",
            mode: "cors",
            headers: {
                "content-type": "application/json",
                authorization: "Bearer " + window.sessionStorage.getItem(TOKEN_KEY)
            }
       })
        let json = await resp.json();
        console.log(json)
        json.forEach((el) =>{
            setTarjetas((tarjetas) => [...tarjetas,el]);
        });
       }catch(err){
        console.log(err);
       }
   };

//    CAPTAMOS  LAS ENTIDADES

   const getEntidades = async (url) => {
       try{
            let resp = await fetch(url, {
                method: "get",
                mode: "cors",
                headers: {
                    "content-type": "application/json",
                    authorization: "Bearer " + window.sessionStorage.getItem(TOKEN_KEY)
                }
            })
            let json = await resp.json();

            json.forEach((el) => {
                setEntidades((entidades) => [...entidades,el]);
            });

       }catch(err){

       }

   };
  
    return(
        <>
        <MenuCuentas />
        <div className="container-fluid container-home py-2">
            <div className="container container-form mt-5 text-center py-2">
              <h2 className="text-white">Crear Cuenta</h2>
            </div>
           <div className="container container-form-in text-center py-5 mt-3">
               <form>
               <div className="row">
                   <div className="col-12 col-md-5 container-form ml-auto mr-auto py-4">
                      <select
                      name="tarjeta"
                      className="form-control">
                          <option>Ingresa Tarjeta</option>
                          {tarjetas.map((el) => (<option>{el.nombre}</option>))}
                      </select>
                   </div>
                   <div className="col-12 col-md-5 container-form ml-auto mr-auto py-4">
                      <select
                      name="entidad"
                      className="form-control">
                            <option>Ingresa Entidad</option>
                            {entidades.map((el) => (<option>{el.nombre}</option>))}
                       </select>
                   </div>
               </div>
               <div className="container text-center mt-5 py-4">
                    <button className="border-btn _btn-green">Guardar</button>
               </div>
               </form>
 
             
           </div>
        </div>
        
        <Footer />
        </>
    );
 
}
export default NuevaCuenta