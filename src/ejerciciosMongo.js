


db.productos.insertMany(

[
  {nombre: 'camion Grndote', precio: 40000, stock: 3},
  {nombre: 'fregoneta', precio: 15000, stock: 5},
  {nombre: 'patinete', precio: 300, stock: 10},
  {nombre: 'Bicicleta', precio: 1500, stock: 20},
]
)
db.productos.find().pretty()

db.facturas.insertOne({
  numero:1, fecha: '2019-11-21',
  productos: [
    ObjectId("5dd6a8ef0a683b29de7b0fea"),
    ObjectId("5dd6a8ef0a683b29de7b0fed")
  ]
})



db.facturas.find().pretty()


// cruce de las collecions productos y facturas

// principal:facturas-------------> productos
// otra:     productos------------> id
// db.facturas.aggregate([
//   {$lookup: {}}
// ])

db.facturas.aggregate([
  {$lookup: {
    from:'productos',
    localField:'productos',
    foreignField: '_id',
    as: 'infoProductos'
  }}
]).pretty()



// creacion de un createview con el cruce de facturas y productos

db.createView (
  "facturascompleta",
  "facturas",
  [
    {$lookup: {
      from:'productos',
      localField:'productos',
      foreignField: '_id',
      as: 'infoProductos'
    }}
  ]
)
// para ver el view
db.facturascompleta.find().pretty()

// muestra toda la estructura de la coleccion
db.getCollectionInfos()