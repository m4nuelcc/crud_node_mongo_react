import React, { Component } from 'react'
import { mongo } from '../index'
import { Link } from 'react-router-dom';


export class Listar extends Component {
  // este componente lista todos los clientes de la tabla
  state = { datos: [] }
  
  componentDidMount(){
    let datosAlServer = {
     db: 'caja', 
     collection: 'clientes',
     find: {nombre: "Carlos"}, 
     sort: {cp:1} }
    let headers = {
      "Accept": "application/json",
      "Content-Type": "application/json"
      }
    let url = 'http://localhost:3000/findSort'
    fetch( url, { 
      method: 'POST',
      headers: headers,
      body: JSON.stringify(datosAlServer)
    })
    .then( res => {
       return res.json() })
    .then( datosRecibidos => {
      console.log(datosRecibidos);
      this.setState({datos:datosRecibidos });
       
    })
  }

  render() {   
    return (
      <div>
      {JSON.stringify(this.state.datos)}
       
        {/* {this.state.datos.map( (c, i) => { 
          return  <div key={i}> {c.nombres} </div> 
        })} */}

      </div> 
    )
  }
}

