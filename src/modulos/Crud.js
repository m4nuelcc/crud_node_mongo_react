import React, { Component } from "react";

export class ListarId extends Component {
  // este componente lista todos los clientes de la tabla
  state = { datos: [],
  db: "caja",
  collection: "clientes", };

  componentDidMount() {
     
    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json"

      // como va por GET recoge los datos en la url como por ejemplo
      // http://localhost:3000/test/vino/5dcaf71d775e633e9be63899
      //  si pusieramos http://localhost:3000/aborrar/naves nos sacaria toda la
      //  base de datos de vino
    };
    // let url = "http://localhost:3000/";
    let url =`http://localhost:3000/${this.state.db}/${this.state.collection}`;
    fetch(url, {
      method: "GET",
      headers: headers
      // body: JSON.stringify(datosAlServer)
    })
      .then(res => {
        return res.json();
      })
      .then(datosRecibidos => {
        console.log(datosRecibidos);
        this.setState({ datos: datosRecibidos });
      });
  }

  render() {
    let iconodown = <i className="material-icons"> arrow_downward  </i>;
    let iconoup =  <i className="material-icons"> arrow_upward  </i>;
    let icono1 = this.state.ordenNombre === 1 ? iconoup : iconodown;
    return (
      <div style={{ padding: 20 }}>
      <div className="row"> 
        <div className="col manita"> Nombre {icono1} </div>
        <div className="col manita"> Primer apellido {icono1} </div>
        <div className="col manita"> Segundo apellido {icono1} </div>
        <div className="col manita"> Telefono {icono1} </div>
      </div>

    {this.state.datos.map( (c, i) => (
      <div key={i} className="row"> 
         <div className="col"> {c.nombre} </div>
        <div className="col"> {c.primerApellido} </div>
        <div className="col"> {c.segundoApellido} </div>
        <div className="col"> {c.telefono} </div>

      </div>
    ))}
    </div>
    );
  }
}

export default class Encontrar extends Component {
  // este componente lista todos los clientes de la tabla
  state = { datos: [] };

  componentDidMount() {
    let datosAlServer = {
      db: "caja",
      collection: "clientes"
    };
    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json"

      // como va por GET recoge los datos en la url como por ejemplo
      // http://localhost:3000/test/vino/5dcaf71d775e633e9be63899
      //  si pusieramos http://localhost:3000/test/vino nos sacaria toda la
      //  base de datos de vino
    };
    let url = "http://localhost:3000/findSort";
    fetch(url, {
      method: "post",
      headers: headers,
      body: JSON.stringify(datosAlServer)
    })
      .then(res => {
        return res.json();
      })
      .then(datosRecibidos => {
        console.log(datosRecibidos);
        this.setState({ datos: datosRecibidos });
      });
  }

  render() {
    let iconodown = <i class="material-icons"> arrow_downward  </i>;
    let iconoup =  <i class="material-icons"> arrow_upward  </i>;
    let icono1 = this.state.ordenNombre === 1 ? iconoup : iconodown;
    return (
      <div style={{ padding: 20 }}>
        <div className="row"> 
          <div className="col manita"> Nombre {icono1} </div>
          <div className="col manita"> Primer apellido {icono1} </div>
          <div className="col manita"> Segundo apellido {icono1} </div>
          <div className="col manita"> Telefono {icono1} </div>
        </div>

      {this.state.datos.map( (c, i) => (
        <div key={i} className="row"> 
           <div className="col"> {c.nombre} </div>
          <div className="col"> {c.primerApellido} </div>
          <div className="col"> {c.segundoApellido} </div>
          <div className="col"> {c.telefono} </div>

        </div>
      ))}
      </div> 
      );
    }
  }
  