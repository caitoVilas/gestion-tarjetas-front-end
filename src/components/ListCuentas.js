import React from 'react';

const ListCuentas = ({cuenta, tarjeta, entidad}) => {

    return(
        <tr>
            <td>{cuenta}</td>
            <td>{tarjeta}</td>
            <td>{entidad}</td>
            <td>
                <button className="btn btn-outline-primary">
                <i className="fas fa-pen-square"></i>
                </button>
            </td>
            <td>
                <button className="btn btn-outline-danger">
                <i className="fas fa-trash-alt"></i>
                </button>
            </td>
        </tr>
    );
}

export default ListCuentas