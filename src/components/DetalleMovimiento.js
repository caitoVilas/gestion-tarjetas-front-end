import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table'
import Moment from 'react-moment';

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

    useEffect(() => {
        let importe_cuota = form.importe / form.cantidad_cuotas;
        form.fecha_compra = moment(form.fecha_compra).format('DD/MM/YYYY')
        
        let fechaV = new Date(form.fecha_vencimiento);
        fechaV= moment(fechaV).add(1, 'days')
        
        for(let c = 0; c < form.cantidad_cuotas; c++){

            if(c === 0){
                fechaV = moment(fechaV);
            }else{
                fechaV = moment(fechaV).add(1, 'month');
            }

            movimientoDto = {
                fecha_compra : form.fecha_compra,
                fecha_vencimiento: moment(fechaV).format('DD/MM/YYYY'),
                importe: importe_cuota,
                detalle: form.detalle,
                cuotas: form.cantidad_cuotas,
                numero_cuota: c+1,
                cuenta: {titular}
            };

            movimientos.push(movimientoDto);
            // setCuota((cuota) =>  [...cuota, movimientoDto]);
        }     
        
        console.log(movimientos)
         movimientos.forEach((el) =>{
             setCuota((cuota) => [...cuota, el]);
         });
    },[])

    return(
        <>
        <div className="container container-form-in mt-3 my-3">
            <div className="row d-md-flex">
                <div className="col-12 col-md-5 ml-auto mr-auto my-2">
                    <p>Fecha de Compra : <strong>
                        {/* <Moment format="DD/MM/YYYY"> */}
                        {form.fecha_compra}
                        {/* </Moment> */}
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
                           <td>{el.fecha_vencimiento}</td>
                           <td>{el.numero_cuota}</td>
                           <td>{el.cuotas}</td>
                           <td>{el.importe}</td>
                       </tr>))}
                    </tbody>
                    </Table>
                </div>
            </div>
        
        </div>
        </>
    );

}

export default DetalleMovimiento