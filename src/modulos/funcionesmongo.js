import React, { Component } from 'react'
import { mongo, jsonToFile } from '../index'
import { Link } from 'react-router-dom';
import {ObjectID} from 'bson';
// import Grupo from './Grupo';

export class EsquemaGrupo {  

  constructor() {
    this.nombre = ''; // ok
    this.componentes = [];
  }

  insertOneToDb() {
   return mongo.db('proMusic').collection('grupos').insertOne(this)
  }
  findOneAndReplaceToDb(id){

   return mongo.db('proMusic').collection('grupos').findOneAndReplace({_id: new ObjectID( id )}, this)
  }
  deleteOneToDb(id){
   return mongo.db('proMusic').collection('grupos').deleteOne({_id: new ObjectID(id)})
  }

  static listadoGrupo(sort){
    // USO: EsquemaGrupo.listadoGrupo({ nombre: -1 }).then( l => { console.clear(); console.log(l) })
    return mongo.db('proMusic').collection('grupos').aggregate([
      {$sort: sort ? sort : { nombre: 1 } }
    ]).toArray()
  }

  static buscarCompetencias(competencia, sort) {
  // USO: EsquemaGrupo.buscarCompetencias('guitarra', {"componentes.competencias.competencia": 1} ).then( d => { console.clear(); console.log(d) });

    let s = sort ? sort : { "componentes.nombre": 1 }
    return mongo.db('proMusic').collection('grupos').aggregate([
      { $unwind: "$componentes"},
      { $unwind: "$componentes.competencias"},
      { $match: { "componentes.competencias.competencia": { $regex: competencia, $options: 'i'}  }},
      { $project: { "componentes.nombre": 1, "componentes.competencias": 1 } },
      { $sort: s }     

    ])
    .toArray()
  }

  static competenciasArtista(artista) {
    // USO: EsquemaGrupo.competenciasArtista('villa').then( d => { console.clear(); console.log(d) });

    return mongo.db('proMusic').collection('grupos').aggregate([
      { $unwind: "$componentes"},
      { $unwind: "$componentes.competencias"},
      { $match: { $or: [
        { "componentes.nombre": { $regex: artista, $options: 'i'}  },
        { "componentes.apellido": { $regex: artista, $options: 'i'}  }
      ] } },
      { $project: { nombre: 1,  "componentes.nombre": 1, "componentes.apellido": 1, "componentes.competencias": 1, _id: 0 } }
    ])
    .toArray()    
  }

  static cacheGrupos(sort){  
    // USO: EsquemaGrupo.cacheGrupos({ _id: 1 }).then( d => { console.clear(); console.log(d) });
    let s = sort ? sort : { cache: -1 }
    return mongo.db('proMusic').collection('grupos').aggregate([
      { $unwind: "$componentes"},
      { $unwind: "$componentes.competencias"},
      { $group: { 
        _id: "$nombre", 
        cache: { $sum: "$componentes.competencias.cache" } 
      } },
      { $sort: s }      
    ])
    .toArray()
  }

  static cacheArtistas(palabra, sort){  
    // USO: EsquemaGrupo.cacheArtistas({ _id: 1 }).then( d => { console.clear(); console.log(d) });

    return mongo.db('test').collection('grupos').aggregate([
      { $unwind: "$componentes"},
      { $unwind: "$componentes.competencias"},
      { $group: { 
        _id: { nombre: "$componentes.nombre", apellido: "$componentes.apellido", competencia: "$componentes.competencias.competencia"}, 
        competencias: { $sum: 1 }, 
        cache: { $avg: "$componentes.competencias.cache" } 
      }},
      { $match: { $or: [
        { "_id.nombre": { $regex: palabra, $options: 'i'} },
        { "_id.apellido": { $regex: palabra, $options: 'i'} },
        { "_id.competencia": { $regex: palabra, $options: 'i'} }
      ] } },      
      { $sort: sort ? sort : { cache: -1 } }      
    ])
    .toArray()
  }
  
  static  buscarGrupoPorNombre(nombre, sort) {
    let s = sort ? sort : {nombre: 1}
    return mongo.db('proMusic').collection('grupos').aggregate([
      { $match: { nombre:{ $regex: new RegExp(nombre), $options:'i'}}},
      { $sort: s }
    ]).toArray()
  }

  static listadoArtistas(nombre){
    return mongo.db('test').collection('grupos').aggregate([      
      { $unwind: "$componentes"}, 
      { $sortByCount: "$componentes.nombre" },
      { $match: { _id: { $regex: nombre ? nombre : '', $options:'i'}}},
    ]).toArray()
  }

  static listadoCompetencias(competencia){
    return mongo.db('test').collection('grupos').aggregate([
      { $unwind: "$componentes"}, 
      { $unwind: "$componentes.competencias" },
      { $sortByCount: "$componentes.competencias.competencia" },
      { $match: { _id: { $regex: competencia ? competencia : '', $options:'i'}}},

    ]).toArray()
  }
}

export default class Grupos extends Component {

  componentDidMount(preguntarDomingo){
  //  EsquemaGrupo.cacheArtistas('cajón').then( d => console.log(d) );
   EsquemaGrupo.cacheArtistas('jorge').then( z => console.log(z) );
  }

  render() {   
   
    return (
      <div style={{ padding: 20 }}>
   

      </div> 
    )
  }
}

