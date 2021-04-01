import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import Table from 'react-bootstrap/Table'
import Moment from 'react-moment';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

var movimientoDto = {
    fecha_compra: null,
    fecha_vencimiento: null,
    importe: null,
    detalle: "",
    cuotas: 0,
    numero_cuota: 0,
    cuenta: 0
};

const DetalleMovimiento = ({form, titular}) => {

    const [cuota, setCuota] = useState([]);
    const movimientos = [];
    const MySwal = withReactContent(Swal);
    const TOKEN_KEY = "authToken";
    moment.locale('es');
    const titularDTO = titular;
    var todoOk = '';

    useEffect(() =>{

        let importe_cuota = form.importe / form.cantidad_cuotas;

        for(let c = 0;  c < form.cantidad_cuotas; c++){
            if( c === 0){
                form.fecha_vencimiento = form.fecha_vencimiento;
            }else {
                form.fecha_vencimiento = moment(form.fecha_vencimiento).add(1, 'month').format("YYYY/MM/DD");
            }
             movimientoDto = {
                 fecha_compra: form.fecha_compra,
                 fecha_vencimiento: form.fecha_vencimiento,
                 importe: importe_cuota,
                 detalle: form.detalle,
                 cuotas: Number(form.cantidad_cuotas),
                 numero_cuota: c+1,
                 cuenta: Number(titularDTO) 
             }

             movimientos.push(movimientoDto);

        }

        movimientos.forEach((el) => {
            setCuota((cuota) => [...cuota, el]);
        });
    },[]);

    const handleSave = () => {


        cuota.forEach((el) => {
           
            el.fecha_compra = moment(el.fecha_compra).format("YYYY-MM-DD");
            el.fecha_vencimiento = moment(el.fecha_vencimiento).format("YYYY-MM-DD");
            console.log(el)
            saveMovimientos("http://localhost:8080/api/movimientos", el, todoOk);

        });

       
            MySwal.fire({
                title: <p>{todoOk}</p>
            })
      

    };

    const saveMovimientos = async (url, el, todoOk) => {

        try{
            const resp = await fetch(url, {
                method: "post",
                mode: "cors",
                headers: {
                    "content-type": "application/json",
                    authorization: "Bearer " + window.sessionStorage.getItem(TOKEN_KEY)
                },
                body: JSON.stringify(el)
            })

            const json = await resp.json();

            console.log(json);
            todoOk = json.mensaje;

        }catch(err){

            todoOk = 'Error al Cargar los Datos!';

        }

    };
   

    return(
        <>
        <div className="container container-form-in mt-3 my-3">
            <div className="row d-md-flex">
                <div className="col-12 col-md-5 ml-auto mr-auto my-2">
                    <p>Fecha de Compra : <strong>
                        <Moment format="DD/MM/YYYY">
                        {form.fecha_compra}
                        </Moment>
                       </strong></p>
                </div>
                <div className="col-12 col-md-5 ml-auto mr-auto my-2">
                    <p>Fecha de Vencimiento : <strong>
                            <Moment format="DD/MM/YYYY">
                            {form.fecha_vencimiento}
                            </Moment>
                        </strong></p>
                </div>
            </div>
            <div className="row d-md-flex">
                <div className="col-12 col-md-5 ml-auto mr-auto my-2">
                    <p>Detalle : <strong>{form.detalle}</strong></p>
                </div>
                <div className="col-12 col-md-5 ml-auto mr-auto my-2">
                    <p>Importe : <strong>{form.importe}</strong></p>
                </div>
                <hr />
                <div className="container">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Fecha cuota</th>
                        <th>Cuota</th>
                        <th>Cuotas</th>
                        <th>Importe</th>
                        </tr>
                    </thead>
                    <tbody>
                       {cuota.map((el) => (<tr key={el.numero_cuota}>
                           <td>
                               <Moment format="DD/MM/YYY">
                               {el.fecha_vencimiento}
                               </Moment>
                           </td>
                           <td>{el.numero_cuota}</td>
                           <td>{el.cuotas}</td>
                           <td>{el.importe}</td>
                       </tr>))}
                    </tbody>
                    </Table>
                </div>
            </div>
                        <div className="row d-flex justify-content-around">
                            <div className="col-5 mt-3 mb-3 d-flex justify-content-around">
                                    <Link to="/home-cuentas" className="border-btn _btn-red">Cancelar</Link>
                            </div>
                            <div className="col-5 mt-3 mb-3 d-flex justify-content-around">
                                    <button 
                                    type="button" 
                                    className="border-btn _btn-green"
                                    onClick={handleSave}
                                    >Guardar
                                    </button>
                            </div>
                        </div>
        </div>
        </>
    );

}

export default DetalleMovimiento