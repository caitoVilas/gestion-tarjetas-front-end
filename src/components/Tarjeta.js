import React from 'react';

const Tarjeta = ({orden, nombre}) => {

    return(
        <tr>
            <td>{orden}</td>
            <td>{nombre}</td>
            <td>
                <button className="btn btn-outline-danger">
                <i className="fas fa-trash-alt"></i>
                </button>
            </td>
        </tr>
    );

}

export default Tarjeta