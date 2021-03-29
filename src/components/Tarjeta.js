import React from 'react';

const Tarjeta = ({orden, nombre, deleteTarjeta}) => {

    const handleButton = (e) => {

        deleteTarjeta("http://localhost:8080/api/tarjeta/" + orden);
    }

    return(
        <tr>
            <td>{orden}</td>
            <td>{nombre}</td>
            <td>
                <button 
                className="btn btn-outline-danger"
                onClick={handleButton}
                >
                <i className="fas fa-trash-alt"></i>
                </button>
            </td>
        </tr>
    );

}

export default Tarjeta