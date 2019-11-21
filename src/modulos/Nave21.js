import React, { Component } from 'react'
import { mongo, jsonToFile } from '../index'
import { Link } from 'react-router-dom';
import {ObjectID} from 'bson';

export class Nave {

  constructor( nombre, peso){
    // USO: new Nave('Halcón Milenario', 10500)
    this.nombre = nombre ? nombre : 'Cuidado Nave Pirata';
    this.pesoMaximo = peso ? peso : 0 ; // peso sin Aliens
    this.ocupantes = [];          // los ocupantes siempre son Aliens
    this.posicion = { x: 0, y: 0, z: 0 } // 
  }

  embarca(alien){
    let cabe = this.cuantoPesas() + alien.peso <= this.pesoMaximo
    if ( cabe ) { 
      this.ocupantes.push(alien); 
      return true;
    } else { return false }
  }

  saveToDb(){
   return mongo.db('aborrar').collection('naves').insertOne(this);
  }

  cuantoPesas(){
    let total = 0;
    this.ocupantes.forEach( alien => { 
      total += alien.peso
    });
    return total;
  }

  static pesoPorNave(sort){
    return mongo.db('aborrar').collection('naves')
    .aggregate([
      { $unwind: "$ocupantes" },
      { $group: { 
        _id: "$nombre", 
        naves: { $sum: 1 },
        peso: { $sum: "$ocupantes.peso" },
        mediaPesos: { $avg: "$ocupantes.peso" }
      }},
      { $sort: sort ? sort : { peso: -1 } }
    ])
    .toArray() 
  }

  static listado(sort){
    // devuelve un Promise
    return mongo.db('aborrar').collection('naves')
    .aggregate([
      { $sort: sort ? sort : { nombre: 1 } }
    ])
    .toArray() 
  }

  static listadoConCallback(sort, cosa){
    // devuelve un Promise
    mongo.db('aborrar').collection('naves')
    .aggregate([
      { $sort: sort ? sort : { nombre: 1 } }
    ])
    .toArray()
    .then( naves => cosa(naves) )
  }


}

// class Alien {
//   constructor(nombre, peso){
//     this.nombre = nombre ? nombre : 'Alien desconocido' ;
//     this.peso = peso ? peso : 0 ;
//   }
// }
export class Nave21 extends Component {
// probando el método de clase Nave.listado()
  state = { nave: new Nave(), ordenNombre: 1, ordenPeso: -1, ordenOcupantes: -1  }

  componentDidMount() {   
    mongo.db('aborrar').collection('naves')
    .findOne({ _id: new ObjectID('5dcd3e677cd785f89e233d32') }) 
    .then( nave => { 
      this.setState({ nave: Object.assign( new Nave(), nave) });
      console.log(this.state.nave.cuantoPesas());
      console.log(this.state.nave);

    })

  }

  render() {   
    let icondown = <i className="material-icons"> call_made </i>

    let iconup = <i className="material-icons"> call_received </i>

    let icon1 = this.state.ordenNombre === 1 ? iconup : icondown;

    return (
      <div style={{ padding: 20 }}>
   
        <div className="row"> 
          <div
            onClick={ e => {
              Nave.pesoPorNave({ _id: this.state.ordenNombre })
              .then( naves => { 
                this.setState({
                  naves: naves,
                  ordenNombre: this.state.ordenNombre === 1 ? -1 : 1
                })
              }); 
            }} 
            className="col cpointer">  
            Nave {icon1}  
          </div>
          <div
            onClick={ e => {
              Nave.pesoPorNave({ peso: this.state.ordenPeso }).then( naves => { 
                this.setState({
                  naves: naves,
                  ordenPeso: this.state.ordenPeso === 1 ? -1 : 1
                })
              }); 
            }} 
            className="col cpointer"> Peso </div>
          <div
            onClick={ e => {
              Nave.pesoPorNave({ ocupantes: this.state.ordenOcupantes }).then( naves => { 
                this.setState({
                  naves: naves,
                  ordenOcupantes: this.state.ordenOcupantes === 1 ? -1 : 1
                })
              });
            }} 
            className="col cpointer"> tripulantes </div>
        </div>

      </div> 
    )
  }
}

