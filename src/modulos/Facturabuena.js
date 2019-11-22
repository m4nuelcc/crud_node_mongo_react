import React, { Component } from 'react'
import { mongo, jsonToFile } from '../index'
import { Link } from 'react-router-dom';
import {ObjectID} from 'bson';
import Grupo from './Grupo';

const iconoBorrar = (<i className="material-icons" title="borrar producto"> delete </i>)
const iconoGuardar = (<i className="material-icons"> save </i>)

class Factura {
  numero = 0;
  fecha = '';
  productos = [];
  cliente = {};

  
  static listado(){
    return mongo.db('borrar').collection('facturasCompleta')
    .aggregate([]).toArray()
  }  

}

class Cliente {
  nombre = '';
  apellidos = '';
  direccion = '';
  nif = '';

  static listado(){
    return mongo.db('borrar').collection('clientes')
    .aggregate([]).toArray()
  } 
}

class Producto {
  nombre = '';
  precio = 0;
  stock = 0;

  static listado(){
    return mongo.db('borrar').collection('productos')
    .aggregate([]).toArray()
  }

}

export class Factura2 extends Component {
  // arregar selectores para poder elegir el primero de la lista
  state = { 
    productos: [], // todos los de la colección para el select
    factura: new Factura(), // la factura a enviar a Mongo
    productoSeleccionado: {  },  // el producto que hay en el select
    cantidad: 1,
    clientes: [], // para el selector de clientes
    clienteSeleccionado: {},    // 
    grabado: false
  }

  componentDidMount(){
    // llenar un select de productos
    Producto.listado().then(d => {
      this.setState({ productos: d })
    })
    // llenar un select de clientes
    Cliente.listado().then(d => {
      this.setState({ clientes: d })
    })

  }

  selectorProductos = () => {
    return (
      <div className="form-inline">
        <select onChange={ e => {
          this.setState({ productoSeleccionado: this.state.productos[e.target.value]})          
        }} className="form-control">
          <option> selecciona productos </option>
          { this.state.productos.map( (p, i) => {
            return <option key={i} value={i}> {p.nombre} </option>
          }) }
        </select>
        {this.inputCantidadProducto()}
        {this.botonSeleccionarProducto()}
      </div>
      
    )
  }

  clickBotonSeleccionarProducto = e => {
    let copia = this.state.factura.productos;
    let copiaProducto = this.state.productoSeleccionado
    copiaProducto.cantidad = this.state.cantidad;
    copia.push(this.state.productoSeleccionado);
    this.setState({ 
      factura: { ...this.state.factura, productos: copia} 
    })
  }

  botonSeleccionarProducto = () =>  {
    return (
      <button onClick={this.clickBotonSeleccionarProducto}> añadir producto a la factura </button>
    )
    
  }

  selectorClientes = () => {
    return (
    <div className="form-inline">
      <select onChange={ e => { 
        console.log(e.target.value) 
        this.setState({ clienteSeleccionado: this.state.clientes[e.target.value]})
        
      }} className="form-control">
       <option> selecciona cliente </option>
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

  inputNumeroFactura = () => {
    return ( 
    <input 
      value={this.state.factura.numero} 
      onChange={ e => {
        this.setState({ factura: { ...this.state.factura,  numero: e.target.value } })
      }} 
      placeholder="número de factura"
      type="number"
      required
      className="form-control"
      /> )
  }

  inputFechaFactura = () => {
    return ( 
      <input 
        value={this.state.factura.fecha} 
        onChange={ e => {
          this.setState({ factura: { ...this.state.factura,  fecha: e.target.value } })
        }} 
        placeholder="fecha de factura"
        type="date"
        required
        className="form-control"
        /> )
  }

  inputCantidadProducto = () => {
    return ( 
    <input 
      value={this.state.cantidad}
      onChange={ e => {
        this.setState({ cantidad: parseFloat(e.target.value) })
      }} 
      placeholder="cantidad"
      type="number"
      className="form-control"
    /> )
  }

  totalFactura = () => {
    let total = 0;
    this.state.factura.productos.forEach( (p, i) => {
      total += p.precio * p.cantidad;
    })
    return total
  }

  renderProductosFactura = () => {
    return (
      <div>
        <div className="row">
          <div className="col-2"> nombre </div>
          <div className="col-2 text-right"> precio </div>
          <div className="col-2 text-right"> cantidad </div>
          <div className="col-2 text-right"> total </div>
          <div className="col-2 text-right">  </div>

        </div>
        {this.state.factura.productos.map(
          (p, i) => <VerProducto 
            key={i} 
            {...p} 
            i={i} 
            borrarProductoDeLaFactura={this.borrarProductoDeLaFactura} />
        )}
      </div>
    )
  }

  borrarProductoDeLaFactura = (i) => {
    let copia = this.state.factura.productos;
    copia.splice(i, 1)
    this.setState({ factura: {...this.state.factura, productos: copia }})
  }

  insertOne = () => {
    mongo.db('aborrar').collection('facturas')
    .insertOne(this.state.factura)
    .then( r => {
      this.setState({ grabado: true })
      setTimeout( () => { this.setState({ grabado: false, factura: new Factura() })}, 2000)
    })
  }

  render() {   
    let condiciones = 
      this.state.factura.numero && 
      this.state.factura.fecha &&
      this.state.factura.productos.length >= 1 &&
      this.state.factura.cliente._id

    return (
      <div style={{ padding: 20 }}>

      <span hidden={!this.state.grabado}> grabado!! </span>
      
      <div className="form-inline">
        {this.inputNumeroFactura()}
        {this.inputFechaFactura()}
        <span onClick={this.insertOne} hidden={!condiciones}> {iconoGuardar} </span>
      </div>
      <br />
        {this.selectorClientes()}
        {this.selectorProductos()}
       
      <hr />
      {this.renderProductosFactura()}
      {this.totalFactura()}

       



      {/* <pre> {JSON.stringify(this.state, undefined, 2)} </pre> */}
      </div> 
    )
  }
}

export class VerProducto extends React.Component {
  render() {
    let total = (this.props.precio * this.props.cantidad).toFixed(2)
    return (
      <div className="row"> 

        <div className="col-2">
          {this.props.nombre}
        </div>
        <div className="col-2 text-right">
          {this.props.precio.toLocaleString()}
        </div>
        <div className="col-2 text-right">
          {this.props.cantidad.toLocaleString()}
        </div>
        <div className="col-2 text-right">
          {total.toLocaleString()}
        </div>
        <div className="col-2">
          <span onClick={e => {
            this.props.borrarProductoDeLaFactura(this.props.i)
          }}> {iconoBorrar} </span>
          
        </div>
      {/* {JSON.stringify(this.props, undefined, 2)}  */}
      </div>
    )
  }
}