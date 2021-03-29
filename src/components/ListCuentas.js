import React from 'react';
import {Link} from 'react-router-dom';

const ListCuentas = ({cuenta, tarjeta, entidad}) => {

    return(
        <tr>
            <td>{cuenta}</td>
            <td>{tarjeta}</td>
            <td>{entidad}</td>
            <td>
                <Link 
                className="btn btn-outline-primary"
                to={`/movimiento/${cuenta}`}
                cuenta={cuenta}
                >
                <i className="fas fa-pen-square"></i>
                </Link>
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