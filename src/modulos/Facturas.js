import React, { Component } from 'react'
import { mongo, jsonToFile } from '../index'
import { Link } from 'react-router-dom';
import {ObjectID} from 'bson';
import Grupo from './Grupo';

class Factura {
  numero = 0;
  fecha = '';
  productos = [];
  cliente = {};

  
  static listado(){
    return mongo.db('aborrar').collection('facturasCompleta')
    .aggregate([]).toArray()
  }  

}

class Cliente {
  nombre = '';
  apellidos = '';
  direccion = '';
  nif = '';

  static listado(){
    return mongo.db('aborrar').collection('clientes')
    .aggregate([]).toArray()
  } 
}

class Producto {
  nombre = '';
  precio = 0;
  stock = 0;

  static listado(){
    return mongo.db('aborrar').collection('productos')
    .aggregate([]).toArray()
  }

}

export class Test extends Component {
  state = { 
    productos: [], // todos los de la colección para el select
    factura: new Factura(), // la factura a enviar a Mongo
    productoSeleccionado: {},  // el producto que hay en el select
    clientes: [], // para el selector de clientes
    clienteSeleccionado: {}    // 
  }

  componentDidMount(){
    // necesitamos una factura - OK
    // llenar un select de productos
    Producto.listado().then(d => {
      this.setState({ productos: d })
    })
    // llenar un select de clientes
    Cliente.listado().then(d => {
      this.setState({ clientes: d })
    })
    // pintar inputs para la factura

  }

  selectorProductos = () => {
    return (
      <div>
        <select onChange={ e => {
          this.setState({ productoSeleccionado: this.state.productos[e.target.value]})
          
        }}>
          { this.state.productos.map( (p, i) => {
            return <option key={i} value={i}> {p.nombre} </option>
          }) }
        </select>
        <button onClick={e => {
          let copia = this.state.factura.productos;
          copia.push(this.state.productoSeleccionado);
          this.setState({ 
            factura: { ...this.state.factura, productos: copia} 
          })

          // buscar en Mongo y añadir a la factura
        }}> añadir producto a la factura </button>
      </div>
      
    )
  }

  selectorClientes = () => {
    return (
    <div>
      <select onChange={ e => { 
        console.log(e.target.value) 
        this.setState({ clienteSeleccionado: this.state.clientes[e.target.value]})
        
      }}>
      {this.state.clientes.map( (c, i) => {
        return <option key={i} value={i}> {c.nombre} {c.apellidos} </option>
      })}
      </select>
      {this.botonSeleccionarCliente()}     
    </div>)
  }
  
  botonSeleccionarCliente = () => {
    // añade el cliente seleccionado a la factura
    return ( <button onClick={ e => {
      this.setState({ 
        factura: {...this.state.factura, cliente: this.state.clienteSeleccionado} 
      })
    }}> seleccionar cliente </button>)
  }

  render() {   

    return (
      <div style={{ padding: 20 }}>

  
      {this.selectorProductos()}
      {this.selectorClientes()}


      <pre> {JSON.stringify(this.state, undefined, 2)} </pre>
      </div> 
    )
  }
}

