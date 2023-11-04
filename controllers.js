require('dotenv').config();
const http = require('http');
const express = require('express');
const app = express();
const path = require('path');
const baseDatosModels = require('./models/baseDeDatos.js');
const {PASSWORD,ADMIN} = process.env;
console.log(PASSWORD,ADMIN);
let login= false;
app.use(express.static(__dirname+'/static'));


//Configuración del Servidor
app.set('view engine','ejs');
app.set('views',path.join(__dirname,"./views"));
app.use(express.urlencoded({extended:false}));
port = app.listen(5000);
console.log('Servidor corriendo exitosamente en el puerto 5000');



//Rutas
app.get('/',(req,res)=>{
  res.render('index.ejs')
});

app.get('/login',(req,res)=>{
res.render('inicioDeSesion.ejs');
});

app.post('/login',(req,res)=>{
  const {admin,password} = req.body;

  if(admin === ADMIN && password === PASSWORD){
    login=true;
    res.redirect('/productos');
  }else{
    login=false;
    res.redirect('/sesionInvalida');
  };
});
  


app.get('/agregar',(req,res)=>{
  res.render('agregar.ejs');
});

app.get('/agregarImagen',(req,res)=>{
res.render('agregarImagen.ejs');
});

app.post('/agregarImagen',(req,res)=>{
baseDatosModels.agregarImagen(req,res);
});

app.post('/addPost',(req,res)=>{   
baseDatosModels.agregarDato(req,res);
});

app.get('/productos',(req,res)=>{
  baseDatosModels.mostrarProductos(req,res);
});

app.get('/actualizar/:id',(req, res) => {
baseDatosModels.mostrarActualizacion(req,res);
});

app.post('/actualizar/:id', (req, res) => {
baseDatosModels.actualizarProducto(req,res);
});

app.get('/borrar/:id', (req, res) => {
baseDatosModels.mostrarBorrado(req,res);
});

app.post('/borrar/:id', (req, res) => {
 baseDatosModels.borrarProducto(req,res);
});

app.get('/categorias', (req, res) => {
 baseDatosModels.getCategorias(req,res);
});

app.get('/agregarCategorias', (req, res) => {
 res.render('agregarCategoria.ejs');
});

app.post('/agregarCategorias', (req, res) => {
 baseDatosModels.postCategorias(req,res);
});

app.get('/actualizarCategoria/:id',(req,res)=>{
 baseDatosModels.mostrarActualizacionCategoria(req,res);
});

app.post('/actualizarCategoria/:id',(req,res)=>{
baseDatosModels.actualizarCategoria(req,res);
});

//Para rutas no encontradas
app.get('/*',(req,res)=>{
res.render('notfound.ejs')
});