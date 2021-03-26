import React from "react";
import { Navbar, Nav } from 'react-bootstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MenuCuentas = (props) => {

  const MySwal = withReactContent(Swal);
  const USERNAME_KEY = 'authUserName';
  const TOKEN_KEY = 'authToken';
  const AUTH_KEY = 'autAuthorities';

 

  const handleBtn = (e) =>{
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(AUTH_KEY);

    setTimeout(() =>{
      window.location = "/";
     },2000);
  
     MySwal.fire({
      title: <p>Cerrando Sesion</p>
  });
  
  }
  return (
    <>
      <Navbar bg="primary" expand="lg">
        <Navbar.Brand href="#home">
          <h2>Gestion Tarjetas</h2>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/home-cuentas">Cuentas</Nav.Link>
            <Nav.Link href="/entidades-container">Entidades</Nav.Link>
            <Nav.Link href="/tarjetas-container">Tarjetas</Nav.Link>
            <button className="_border-btn _btn-red" onClick={handleBtn}>Cerrar Sesion</button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default MenuCuentas;
