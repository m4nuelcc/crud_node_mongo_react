import React, { Component } from 'react'
import { mongo } from '../index'
import { Link } from 'react-router-dom';

export class Test extends Component {
  // este componente lista todos los clientes de la tabla
  state = { datos: [] }
  
  componentDidMount(){
    let datosAlServer = { db: 'test', collection: 'vino',
     find: {nombre: "Carlos"}, 
     sort: {cp:1} }
    let headers = {
      "Accept": "application/json",
      "Content-Type": "application/"
      }
    let url = 'http://localhost:3000/findSort'
    fetch( url, { 
      method: 'POST',
      headers: headers,
      body: JSON.stringify(datosAlServer)
    })
    .then( res => { return res.json() })
    .then( datosRecibidos => {
       
    })
  }

  render() {   
    return (
      <div>
        {this.state.datosRecibidos.map( (c, i) => { 
          return  <div key={i}> {c.datosRecibidos} </div> 
        })}

      </div> 
    )
  }
}

