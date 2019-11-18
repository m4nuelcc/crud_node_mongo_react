import React, { Component } from "react";

export class Listar2 extends Component {
  // este componente lista todos los clientes de la tabla
  state = { datos: [] };

  componentDidMount() {
    let datosAlServer = {
      db: "test",
      collection: "vino",
      find: { country: "Italy" },
      sort: { points: 1 }
    };
    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    let url = "http://localhost:3000/findSort";
    fetch(url, {
      method: "POST",
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
    return (
      <div>
        {JSON.stringify(this.state.datos)};
        {/* {this.state.datosRecibidos.map( (c, i) => { 
          return  <div key={i}> {c.datosRecibidos} </div> 
        })} */}
      </div>
    );
  }
}
