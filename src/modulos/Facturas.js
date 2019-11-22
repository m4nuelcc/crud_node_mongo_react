import React, { Component } from "react";
import { mongo, jsonToFile } from "../index";
import { Link } from "react-router-dom";
import { ObjectID } from "bson";

class Factura {
  numero = 0;
  fecha = "";
  productos = [];
  cliente = {};

  static listado() {
    return mongo
      .db("borrar")
      .collection("facturasCompleta")
      .aggregate([])
      .toArray();
  }
}

class Cliente {
  nombre = "";
  apellidos = "";
  direccion = "";
  nif = "";

  static listado() {
    return mongo
      .db("borrar")
      .collection("clientes")
      .aggregate([])
      .toArray();
  }
}

class Producto {
  nombre = "";
  precio = 0;
  stock = 0;

  static listado() {
    return mongo
      .db("borrar")
      .collection("productos")
      .aggregate([])
      .toArray();
  }
}

export class Facturas extends Component {
  state = {
    productos: [], // todos los de la colección para el select
    factura: new Factura(), // la factura a enviar a Mongo
    productoSeleccionado: {}, // el producto que hay en el select
    clientes: [], // para el selector de clientes
    clienteSeleccionado: {} //
  };

  componentDidMount() {
    // necesitamos una factura - OK
    // llenar un select de productos - OK
    Producto.listado().then(d => {
      this.setState({ productos: d });
    });
    // llenar un select de clientes
    Cliente.listado().then(d => {
      this.setState({ clientes: d });
    });
    // pintar inputs para la factura
  }

  selectorProductos = () => {
    return (
      <div>
        <select
          onChange={e => {
            this.setState({
              productoSeleccionado: this.state.productos[e.target.value]
            });
            console.log(
              "productoseleccionado",
              this.state.productoSeleccionado
            );
          }}
        >
          {this.state.productos.map((p, i) => {
            return (
              <option key={i} value={i}>
                {" "}
                {p.nombre}{" "}
              </option>
            );
          })}
        </select>
        <button
          onClick={e => {
            let copia = this.state.factura.productos;
            copia.push(this.state.productoSeleccionado);
            this.setState({
              factura: { ...this.state.factura, productos: copia }
            });

            // buscar en Mongo y añadir a la factura
          }}
        >
          {" "}
          añadir producto a la factura{" "}
        </button>
      </div>
    );
  };

  selectorClientes = () => {
    return (
      <div>
        <select
          onChange={e => {
            // console.log(e.target.value)
            this.setState({
              clienteSeleccionado: this.state.clientes[e.target.value]
            });
          }}
        >
          {this.state.clientes.map((c, i) => {
            return (
              <option key={i} value={i}>
                {" "}
                {c.nombre} {c.apellidos}{" "}
              </option>
            );
          })}
        </select>
        {this.botonSeleccionarCliente()}
      </div>
    );
  };

  botonSeleccionarCliente = () => {
    // añade el cliente seleccionado a la factura
    return (
      <button
        onClick={e => {
          this.setState({
            factura: {
              ...this.state.factura,
              cliente: this.state.clienteSeleccionado
            }
          });
        }}
      >
        {" "}
        seleccionar cliente{" "}
      </button>
    );
  };
  listado = () => {
    return (
      <div class="container">
        <div class="text-center">
          <h1>Factura</h1>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="panel panel-default">
              <div class="panel-heading">
                <h3 class="panel-title">Cabecera</h3>
                <hr></hr>
                <div class="row" style={{ backgroundColor: "green" }}>
                  <div class="col-md-5" style={{ backgroundcolor: "white" }}>
                    <div class="form-group">
                      <label for="cliente" class="col-sm-2 control-label">
                        Cliente
                      </label>
                      <div class="col-sm-10">
                      {this.selectorClientes()}
                        {/* <input
                          class="form-control"
                          id="cliente"
                          placeholder="cliente"
                          type="text"
                        /> */}
                      </div>
                    </div>
                  </div>

                  <div class="col-md-4" style={{ backgroundcolor: "white" }}>
                    <div class="form-group">
                      <label for="fecha" class="col-sm-5 control-label">
                        Fecha factura
                      </label>
                      <div class="col-sm-7">
                        <input
                          class="form-control"
                          id="fecha"
                          placeholder="fecha factura"
                          type="date"
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    class="col-md-3 target"
                    style={{ backgroundcolor: "white" }}
                  >
                    <div class="form-group">
                      <label for="id" class="col-sm-3 control-label">
                        Apellido
                      </label>
                      <div class="col-sm-9">
                        <input 
                        class="form-control"
                        id="apellidos"
                        type="text" />
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div style={{ padding: 20 }}>
        {this.selectorProductos()}
        {this.selectorClientes()}
        {this.listado()}

        <pre>
          {" "}
          {JSON.stringify(this.state.productoSeleccionado, undefined, 2)}{" "}
        </pre>
        <pre>
          {" "}
          {JSON.stringify(this.state.clienteSeleccionado, undefined, 2)}{" "}
        </pre>
        <pre> {JSON.stringify(this.state.factura, undefined, 2)} </pre>
      </div>
    );
  }
}
