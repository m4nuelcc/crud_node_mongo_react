import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import "./index.css";


import {Listar} from "./modulos/Listar"

// *******
// {import App from "./App"}

// import {
//   Stitch,
//   RemoteMongoClient,
//   // AnonymousCredential,
//   // UserPasswordCredential
// } from "mongodb-stitch-browser-sdk";
// export const stitch = Stitch.initializeDefaultAppClient(config.appId);
// export const mongo = stitch.getServiceClient(
//   RemoteMongoClient.factory,
//   "mongodb-atlas"
// );


// autentificacion con la base de datos de mongo de forma anonima
// if (!stitch.auth.isLoggedId) {
//   stitch.auth.loginWithCredential(new AnonymousCredential());
// }

// console.log("logged?", stitch.auth.isLoggedIn);

// export function nbsp(n) {
//   let ret = []
//   for (let index = 1; index <= n; index++) {
//     ret.push(<span key={index}>&nbsp;</span>);    
//   }
//   return ret
// }


export function br(n) {
  let ret = []
  for (let index = 1; index <= n; index++) {
    ret.push(<br key={index} />);    
  }
  return ret
}


// export class ClienteDef {
//   constructor() {
//     this.pedidos = [];
//     this.nombre = "";
//     this.primerApellido = "";
//     this.segundoApellido = "";
//     this.telefono = "";
//     this.direccion = "";
//     this.cp = "";
//     this.nif = "";
//     this.correo = "";
//   }
// }

// export class PedidosDef {
//   constructor() {
//     this.prendas = [];
//     this.pendiente = [];
//     this.cliente = "";
//     this.fechaEntrega = "";
//     this.fechaPedido = "";
//     this.numeroPedido = "";
//   }
// }

// export class PrendasDef {
//   constructor() {
//     this.prenda = "";
//     this.precio = "";
//     this.entregado = false;
//   }
// }

const rutas = (
  <BrowserRouter>
    <Route exact path="/" component={Listar} />
    {/* <Route path="/NuevoCliente/:id" component={NuevoCliente} />
    <Route path="/lista" component={ListarPrendas} />
    <Route path="/test2" component={Test2} />
    <Route path="/test1" component={Test1} />
    <Route path="/recepcion" component={Recepcion} />
    <Route path="/actor/:id" component={EditarActor} />
    <Route path="/ModificarCliente/:id" component={ModificarCliente} />
    <Route path="/login" component={Login} /> */}
    {/* <Route path="/test" component={Test} /> */}
    
  </BrowserRouter>
);
ReactDOM.render(rutas, document.getElementById("root"));
