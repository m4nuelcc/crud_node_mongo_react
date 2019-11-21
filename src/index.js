import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import "./index.css";
import {Listar} from "./modulos/Listar";
import { Listar2 } from "./modulos/Listar2";
import Encontrar, { ListarId, Grabardb} from "./modulos/Crud";
import {Nave21} from "./modulos/Nave21"
import config from "./config.json";
import Grupos from "./modulos/funcionesmongo"
import {Facturas} from "./modulos/Facturas"

//conexion a mongo mediante stich
import {
  Stitch,
  RemoteMongoClient,
  // AnonymousCredential,
  // UserPasswordCredential
} from "mongodb-stitch-browser-sdk";
export const stitch = Stitch.initializeDefaultAppClient(config.appId);
export const mongo = stitch.getServiceClient(
  RemoteMongoClient.factory,
  "mongodb-atlas"
);


const rutas = (
  <BrowserRouter>
    <Route exact path="/" component={Listar} />
    <Route path="/listar2" component={Listar2} />
    <Route path="/listarid" component={ListarId} />
    <Route path="/encontrar" component={Encontrar} />
    <Route path="/grabar" component={Grabardb} />
    <Route path="/nave21" component={Nave21} />  
    <Route path="/grupo" component={Grupos} />
    <Route path="/factura" component={Facturas} />
    
    
  </BrowserRouter>
);

ReactDOM.render(rutas, document.getElementById("root"));












