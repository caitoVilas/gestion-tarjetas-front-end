import React from 'react';

const Entidad = ({orden, nombre,deleteEntidad}) => {

    const handleButton = (e) => {

        deleteEntidad("http://localhost:8080/api/entidad/" + orden);
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

export default Entidad