const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

//Conexión a la base de datos
const dbname = path.join(__dirname,'../db','base.db');
const db = new sqlite3.Database(dbname,err=>{
  if(err) return console.error(err.message);
  console.log('Conexion Exitosa con la Base de Datos')
});

db.serialize(() => {
// Creación de las tablas
db.run(`
  CREATE TABLE IF NOT EXISTS categorias (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL
  )
`);
//------------------------------------------------------------------
db.run(`
  CREATE TABLE IF NOT EXISTS productos (
    producto_id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    codigo INTEGER NOT NULL,
    precio INTEGER NOT NULL,
    descripcion TEXT NOT NULL,
    marca TEXT NOT NULL,
    cantidad TEXT NOT NULL,
    categoria_id INTEGER,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
  )
`);
//-----------------------------------------------------------------
db.run(`
  CREATE TABLE IF NOT EXISTS imagenes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    url TEXT NOT NULL,
    destacado TEXT
  )
`);

});

function agregarDato(req,res){
  const {nombre,codigo,precio,descripcion,marca,cantidad} = req.body;  
  const sql = `INSERT INTO productos(nombre, codigo, precio, descripcion, marca, cantidad) 
    VALUES (?, ?, ?, ?, ?, ?)`;
  db.run(sql, [nombre, codigo, precio, descripcion, marca, cantidad], err => {
    if (err) return console.error(err.message);
    console.log('Registros Ingresados Correctamente a la base de datos ');
    res.redirect('/productos');
  });
}

function mostrarProductos(req,res){
  const sql = `SELECT * FROM productos`;
  db.all(sql,[],(err,rows)=>{
  console.log(rows,);
  if(err) return console.error(err.message);
    res.render('productos.ejs',{modelo:rows});
  });
};

function mostrarActualizacion(req,res){
  const id = req.params.id;
  const sql = `SELECT * FROM productos WHERE producto_id = ?`;
  db.get(sql, [id], (err, row) => {
    if (err) return console.error(err.message);
    res.render('actualizar.ejs', {modelo:row});
  });
};

function actualizarProducto(req,res){
  const id = req.params.id;
  const {nombre, codigo, precio, descripcion, marca, cantidad} = req.body;
  const sql = `UPDATE productos SET nombre = ?, codigo = ?, precio = ?, descripcion = ?, marca = ?, cantidad = ? WHERE producto_id = ?`;
  db.run(sql, [nombre, codigo, precio, descripcion ,marca, cantidad, id], err => {
    if (err) return console.error(err.message);
      res.redirect('/productos');
  });
};

function mostrarBorrado(req,res){
  const id = req.params.id;
  const sql = `SELECT * FROM productos WHERE producto_id = ?`;
  db.get(sql, [id], (err, row) => {
    if (err){
      res.status(500).send({ error: err.message });
      return console.error(err.message);
    };
    res.render('borrar.ejs', { modelo:row});
  });
};

function borrarProducto(req,res){
  const id = req.params.id;
  const sql = `
    DELETE FROM productos WHERE producto_id = ?
  `;
  db.run(sql, [id], err => {
    if (err) {
      res.status(500).send({ error: err.message });
      return console.error(err.message);
    };
    res.redirect('/productos');
  });
};

function agregarImagen(req,res){
  const {destacado,img} = req.body;
  const sql = `INSERT INTO imagenes(url,destacado) VALUES (?,?)`;
  db.run(sql, [img,destacado], err => {
    if (err) return console.error(err.message);
    res.redirect('/productos');
  });
}


function getCategorias(req,res){
  const sql = `SELECT * FROM categorias`;
  db.all(sql,[],(err,rows)=>{
  console.log(rows,);
  if(err) return console.error(err.message);
    res.render('categorias.ejs',{modelo:rows});
  });
};

function postCategorias(req,res){
  const {nombre} = req.body
  const sql = `INSERT INTO categorias(nombre) VALUES (?)`;
  db.run(sql, [nombre], err => {
    if (err) return console.error(err.message);
    res.redirect('/categorias');
  });
};

function mostrarActualizacionCategoria(req,res){
  //Metodo GET
    const id = req.params.id;
    const sql = `SELECT * FROM categorias WHERE id = ?`;
    db.get(sql, [id], (err, row) => {
    console.log(row);
    if (err) return console.error(err.message);
    res.render('actualizarCategorias.ejs', {modelo:row});
  });
};

function actualizarCategoria(req,res){
//Método POST
   const id = req.params.id;
    const {nombre} = req.body;
    const sql = `UPDATE categorias SET nombre = ? WHERE id = ?`;
  db.run(sql, [nombre,id], err => {
    if (err) return console.error(err.message);
    res.redirect('/categorias');
  });
};

//Exportación

module.exports={
  agregarDato,
  mostrarProductos,
  mostrarActualizacion,
  actualizarProducto,
  mostrarBorrado,
  borrarProducto,
  agregarImagen,
  getCategorias,
  postCategorias,
  mostrarActualizacionCategoria,
  actualizarCategoria
};