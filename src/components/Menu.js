import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';


const Menu = (props) => {

    return(
        <Navbar bg="primary" expand="lg">
        <Navbar.Brand href="#home"><h2>Gestion Tarjetas</h2></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
           <Nav.Link href="/">Inicio</Nav.Link>
            <Nav.Link href="/login">Ingresar</Nav.Link>
            <Nav.Link href="/registro">Registrar</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
}

export default Menu