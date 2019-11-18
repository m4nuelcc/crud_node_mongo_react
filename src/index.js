import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import "./index.css";
import {Listar} from "./modulos/Listar";
import { Listar2 } from "./modulos/Listar2";
import { ListarId } from "./modulos/ListarID";




export function br(n) {
  let ret = []
  for (let index = 1; index <= n; index++) {
    ret.push(<br key={index} />);    
  }
  return ret
}


const rutas = (
  <BrowserRouter>
    <Route exact path="/" component={Listar} />
    <Route path="/listar2" component={Listar2} />
    <Route path="/listarid" component={ListarId} />
  </BrowserRouter>
);

ReactDOM.render(rutas, document.getElementById("root"));












// {/* <Route path="/NuevoCliente/:id" component={NuevoCliente} />
// <Route path="/lista" component={ListarPrendas} />
// <Route path="/test2" component={Test2} />
// <Route path="/test1" component={Test1} />
// <Route path="/recepcion" component={Recepcion} />
// <Route path="/actor/:id" component={EditarActor} />
// <Route path="/ModificarCliente/:id" component={ModificarCliente} />
// <Route path="/login" component={Login} /> */}
// {/* <Route path="/test" component={Test} /> */}
