require ('dotenv').config();
var express = require('express');
var router = express.Router();
const session = require('express-session');
const productosModel = require ('../models/admin')

router.use(session({
  secret: 'secretkeys',
  resave: false,
  saveUninitialized: false
}));
//Get principal page
router.get('/clientes', function(req, res, next){
  productosModel
    .obteneradmin()
    .then(datos=>{
      res.render('clientes', {datos: datos});
    }) 
    .catch(err=>{
      console.error(err.message);
      return res.status(500).send('Error cargando archivos')
    })
})



//Busqueda nombre productos
router.post('/search', function(req, res, next){
  const {nombre} = req.body;
  productosModel
    .obtenerprdPorNombre(nombre)
    .then(datos=>{
      res.render('clientes', {datos: datos});
    })
    .catch(err=>{
      console.error(err.message);
      return res.status(500).send('Error buscando archivos')
    })
});

//Busqueda descripcion productos
router.post('/searchdescrp', function(req, res, next){
  const {descripcion} = req.body;
  productosModel
    .obtenerprdPorDescripcion(descripcion)
    .then(datos=>{
      res.render('clientes', {datos: datos});
    })
    .catch(err=>{
      console.error(err.message);
      return res.status(500).send('Error buscando archivos')
    })
});

//Filtrado de productos por categoria
router.post('/filtroctg', function(req, res, next){
  const {categoria} = req.body;  
  console.log(req.body);
  productosModel
    .filtradoctg(categoria)
    .then(datos=>{
      res.render('clientes', {datos: datos});
    })
    .catch(err=>{
      console.error(err.message);
      return res.status(500).send('Error buscando archivos')
    })
});

//Filtrado de productos por marcas
router.post('/filtromarca', function(req, res, next){
  const {marca} = req.body;
  console.log(req.body); 
  productosModel
    .filtradomarca(marca)
    .then(datos=>{
      res.render('clientes', {datos: datos});
    })
    .catch(err=>{
      console.error(err.message);
      return res.status(500).send('Error buscando archivos')
    })
});

//Filtrado de productos por modelo
router.post('/filtromdl', function(req, res, next){
  const {modelo} = req.body;  
  console.log(req.body);
  productosModel
    .filtradomdl(modelo)
    .then(datos=>{
      res.render('clientes', {datos: datos});
    })
    .catch(err=>{
      console.error(err.message);
      return res.status(500).send('Error buscando archivos')
    })
});







/* GET home page. */
router.get('/index', function(req, res, next) {
  if (req.session.active) {
res.redirect('home');
  } else {
    res.render('index', { title: 'Login' });
  }
});

/*Dios se apiade de nosotros*/
router.get('/', function(req, res, next){
  res.render('inicio', {title: 'inicio'});
});

/*Ruta para ir al cliente*/
router.get('/clientes', function(req, res, next){
  res.render('clientes', {title: 'clientes'});
});
//login a la pagina del administrador
router.post('/login', function(req, res, next){
  const {user, password} = req.body;
  if ((process.env.USER == user) && (process.env.PASSWORD == password)) {
    req.session.active = true;
    res.render('admin');
  } else{
    res.render('loginfail', {title: 'Login Fail'});
  }
});
router.get('/logout', (req, res) => {
  req.session.destroy();
    res.redirect('/index');
 });
//Get principal page
router.get('/home', function(req, res, next){
  if (req.session.active){
    res.render('admin'); 
  } else {
    res.redirect('/index');
  }
  
});

//Get productos page
router.get('/productos', function(req, res, next){
  if (req.session.active){
    productosModel
    .obtenerprd()
    .then(productos =>{
      res.render('productos', {productos: productos});
    })
    .catch(err =>{
      return res.status(500).send("Error buscando producto");
    })
  } else {
    res.redirect('/index');
  }
});

//Get categorias page
router.get('/categorias', function(req, res, next){
  if (req.session.active) {
    productosModel
    .obtenerctg()
    .then(categorias =>{
      res.render('categorias', {categorias: categorias});
    })
    .catch(err =>{
      return res.status(500).send("Error buscando categorias");
    })
  } else {
    res.redirect('/index');
  }
});

//Get imagenes page
router.get('/imagenes', function(req, res, next){
  if (req.session.active) {
    productosModel
    .obtenerimg()
    .then(imagenes =>{
      res.render('imagenes', {imagenes: imagenes});
    })
    .catch(err =>{
      return res.status(500).send("Error buscando imagenes");
    })
  } else {
    res.redirect('/index');
  }

});

//Get productos page agg
router.get('/prdagg', function(req, res, next){
  if (req.session.active) {
    productosModel
  .obtenerctg()
  .then(categorias=>{
    res.render('aggprd', {categorias: categorias});
  })
  .catch(err =>{
    return res.status(500).send("Error a cargar la pagina");
  })
  } else {
    res.redirect('/index');
  }
  
})

//Get categorias page agg
router.get('/ctgagg', function(req, res, next){
  if (req.session.active) {
    res.render('aggctg');
  } else {
    res.redirect('/index');
  }
})

//Get imagenes page agg
router.get('/imgagg', function(req, res, next){
  if (req.session.active) {
    productosModel
    .obtenerprd()
    .then(productos=>{
      res.render('aggimg', {productos: productos});
    })
    .catch(err =>{
      return res.status(500).send("Error a cargar la pagina");
    })
  } else {
    res.redirect('/index');
  }
 
})

//agregar categoria
router.post('/aggctg', function(req, res, next){
  const {nombre} = req.body;
  console.log(nombre);
  productosModel
  .insertarctg(nombre)
  .then(idCategoriaInsertado =>{
    res.redirect('/categorias');
  })
  .catch(err =>{
    console.error(err.message);
    return res.status(500).send("Error insertando producto");
  });
})

//agregar producto
router.post('/aggprd', function(req, res, next){
  const {nombre, precio, codigo, descripcion, marca, modelo, categoria_id} = req.body;
  productosModel
  .insertarprd(nombre, precio, codigo, descripcion, marca, modelo, categoria_id)
  .then(idProductoInsertado =>{
    res.redirect('/productos');
  })
  .catch(err =>{
    console.error(err.message);
    return res.status(500).send("Error insertando producto");
  })
});

//agregar imagenes
router.post('/aggimg', function(req, res, next){
  const {url, destacado, producto_id} = req.body;
  productosModel
  .insertarimg(url, destacado, producto_id)
  .then(idImagenInsertada=>{
    res.redirect('/imagenes');
  })
  .catch(err=>{
    console.error(err.message);
    return res.status(500).send('Error insertando imagen');
  })
});

//Get productos page edit
router.get('/prdedit/:id', function(req,res,next){
  if (req.session.active) {
    const id=req.params.id;
  productosModel
  .obtenerprdPorId(id)
  .then(productos=>{
    res.render('editprd', {productos: productos});
  })
  .catch(err=>{
    console.error(err.message);
    return res.status(500).send('Error buscando el producto')
  })
  } else {
    res.redirect('/index');
  }
  
});

//Get categorias page edit
router.get('/ctgedit/:id', function(req,res,next){
  if (req.session.active) {
    const id=req.params.id;
  productosModel
  .obtenerctgPorId(id)
  .then(categorias=>{
    res.render('editctg', {categorias: categorias});
  })
  .catch(err=>{
    console.error(err.message);
    return res.status(500).send('Error buscando la categoria')
  })
  } else {
    res.redirect('/index');
  }
  
});

//Get imagenes page edit
router.get('/imgedit/:id', function(req,res,next){
  if (req.session.active) {
    const id=req.params.id;
    productosModel
    .obtenerimgPorId(id)
    .then(imagenes=>{
      res.render('editimg', {imagenes: imagenes});
    })
    .catch(err=>{
      console.error(err.message);
      return res.status(500).send('Error buscando la imagen')
    })
  } else {
    res.redirect('/index');
  }

});

//Update productos page
router.post('/updateprd/:id', function(req, res, nexte){
  const id= req.params.id;
  const {nombre, precio, codigo, descripcion, marca, modelo} = req.body;
  productosModel
  .actualizarprd(nombre, precio, codigo, descripcion, marca, modelo, id)
  .then(()=>{
    res.redirect('/productos');
  })
  .catch(err =>{
    console.error(err.message);
    res.status(500).send('Error actualizando el producto');
  })
});

//Update categorias page
router.post ('/updatectg/:id', function(req, res, next){
  const id = req.params.id;
  const {nombre} = req.body;
  productosModel
  .actualizarctg(nombre, id)
  .then(()=>{
    res.redirect('/categorias');
  })
  .catch(err =>{
    console.error(err.message);
    res.status(500).send('Error actualizando la categoria');
  })
});

//Update imagenes page
router.post('/updateimg/:id', function(req, res, next){
  const id = req.params.id;
  const {url, destacado} = req.body;
  productosModel
  .actualzarimg(url, destacado, id)
  .then(()=>{
    res.redirect('/imagenes');
  })
  .catch(err =>{
    console.error(err.message);
    res.status(500).send('Error actualizando la imagen');
  })
});

//Get productos page delete
router.get('/prddelete/:id', function(req,res,next){
  if (req.session.active) {
    const id=req.params.id;
  productosModel
  .obtenerprdPorId(id)
  .then(productos=>{
    res.render('deleteprd', {productos: productos});
  })
  .catch(err=>{
    console.error(err.message);
    return res.status(500).send('Error buscando el producto')
  })
  } else {
    res.redirect('/index');
  }
  
});

//Get categorias page delete
router.get('/ctgdelete/:id', function(req,res,next){
  if (req.session.active) {
    const id=req.params.id;
    productosModel
    .obtenerctgPorId(id)
    .then(categorias=>{
      res.render('deletectg', {categorias: categorias});
    })
    .catch(err=>{
      console.error(err.message);
      return res.status(500).send('Error buscando la categoria')
    })
  } else {
    res.redirect('/index');
  }

});

//Get imagenes page delete
router.get('/imgdelete/:id', function(req,res,next){
  if (req.session.active) {
    const id=req.params.id;
    productosModel
    .obtenerimgPorId(id)
    .then(imagenes=>{
      res.render('deleteimg', {imagenes: imagenes});
    })
    .catch(err=>{
      console.error(err.message);
      return res.status(500).send('Error buscando la imagen')
    })
  } else {
    res.redirect('/index');
  }
 
});

//Delete productos page
router.get('/deleteprd/:id', function(req,res,next){
  if (req.session.active) {
    const id = req.params.id;
    productosModel
    .eliminarprd(id)
    .then(()=>{
      res.redirect('/productos');
    })
    .catch(err=>{
      console.error(err.message);
      return res.status(500).send('Error elimando el producto')
    })
  } else {
    res.redirect('/index');
  }
 
});

//Delete categorias page
router.get('/deletectg/:id', function(req,res,next){
  if (req.session.active) {
    const id = req.params.id;
    productosModel
    .eliminarctg(id)
    .then(()=>{
      res.redirect('/categorias');
    })
    .catch(err=>{
      console.error(err.message);
      return res.status(500).send('Error elimando la categoria')
    })
  } else {
    res.redirect('/index');
  }

});

//Delete imagenes page
router.get('/deleteimg/:id', function(req,res,next){
  if (req.session.active) {
    const id = req.params.id;
    productosModel
    .eliminarimg(id)
    .then(()=>{
      res.redirect('/imagenes');
    })
    .catch(err=>{
      console.error(err.message);
      return res.status(500).send('Error elimando la imagen')
    })
  } else {
    res.redirect('/index');
  }
 
});

/*Non-existent route
router.get('/*', function(req, res, next) {
  res.render('error', { title: 'Error 404'});
});
*/
module.exports = router;