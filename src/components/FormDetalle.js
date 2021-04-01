import React from 'react';
import {Link} from 'react-router-dom';

const FormDetalle = ({handleChange, handleSubmit}) => {

    return (
        <div className="container container-form-in mt-3 py-3">
              <form onSubmit={handleSubmit}>
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
                type="text" 
                name="detalle" 
                placeholder="detalle"  
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

                       <div className="row d-flex justify-content-around">
                            <div className="col-5 mt-3 d-flex justify-content-around">
                                    <Link to="/home-cuentas" className="border-btn _btn-red">Cancelar</Link>
                                    <button 
                                    type="submit" 
                                    className="border-btn _btn-green"
                                    >Siguiente
                                    </button>
                            </div>
                        </div>
              </form>
	 </div>
    );

}

export default FormDetalle