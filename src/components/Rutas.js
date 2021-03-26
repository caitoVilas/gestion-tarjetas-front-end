import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import EntidadesContainer from "./EntidadesContainer";
import Home from "./Home";
import HomeCuentas from "./HomeCuentas";
import Login from "./Login";
import NuevaCuenta from "./NuevaCuenta";
import Registro from "./Registro";
import TarjetasContainer from "./TarjetasContainer";

const Rutas = (props) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/registro" component={Registro}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/home-cuentas" component={HomeCuentas}></Route>
        <Route exact path="/entidades-container" component={EntidadesContainer}></Route>
        <Route exact path="/tarjetas-container" component={TarjetasContainer}></Route>
        <Route exact path="/nueva-cuenta" component={NuevaCuenta}></Route>
      </Switch>
    </Router>
  );
};

export default Rutas;
