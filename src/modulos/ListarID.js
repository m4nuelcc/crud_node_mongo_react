import React, { Component } from "react";

export class ListarId  extends Component {
  // este componente lista todos los clientes de la tabla
  state = { datos: [] };

  componentDidMount() {
    let datosAlServer = {
      db: "test",
      collection: "vino",
      id: "5dcaf71d775e633e9be63899"
    
    };
    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    let url = "http://localhost:3000/";
    fetch(url, {
      method: "GET",
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
