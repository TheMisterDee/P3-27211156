const db = require ('../database/dataBase');

module.exports = {
    obteneradmin() {
        return new Promise ((resolve, reject) =>{
            const sql = 'SELECT productos.nombre AS productoNombre, productos.precio, productos.codigo, productos.descripcion, productos.marca, productos.modelo, categorias.nombre AS categoriaNombre, imagenes.url, imagenes.destacado FROM productos INNER JOIN categorias ON productos.categoria_id = categorias.id INNER JOIN imagenes ON productos.id = imagenes.producto_id';
            db.all (sql, (err, resultados) =>{
                if (err) reject (err);
                else {
                    console.log(JSON.stringify(resultados, null, 4));
                    resolve (resultados)};
            });
        });
    }, 
    //Busqueda usuarios por nombre
    obtenerprdPorNombre(nombre){
        return new Promise ((resolve, reject)=>{
            const sql = "SELECT productos.nombre AS productoNombre, productos.precio, productos.codigo, productos.descripcion, productos.marca, productos.modelo, categorias.nombre AS categoriaNombre, imagenes.url, imagenes.destacado FROM productos INNER JOIN categorias ON productos.categoria_id = categorias.id INNER JOIN imagenes ON productos.id = imagenes.producto_id WHERE productos.nombre LIKE '%' || ? || '%'"
            db.all(sql, [nombre], (err, resultados)=>{
                if (err) reject(err);
                else resolve(resultados);
            })
        })
    },
    //Busqueda usuarios por descripcion
    obtenerprdPorDescripcion(descripcion){
        return new Promise ((resolve, reject)=>{
            const sql = "SELECT productos.nombre AS productoNombre, productos.precio, productos.codigo, productos.descripcion, productos.marca, productos.modelo, categorias.nombre AS categoriaNombre, imagenes.url, imagenes.destacado FROM productos INNER JOIN categorias ON productos.categoria_id = categorias.id INNER JOIN imagenes ON productos.id = imagenes.producto_id WHERE productos.descripcion LIKE '%' || ? || '%'"
            db.all(sql, [descripcion], (err, resultados)=>{
                if (err) reject(err);
                else resolve(resultados);
            })
        })
    },
    //Filtrado categoria
    filtradoctg(categoria){
        return new Promise ((resolve, reject)=>{
            const sql='SELECT productos.nombre AS productoNombre, productos.precio, productos.codigo, productos.descripcion, productos.marca, productos.modelo, categorias.nombre AS categoriaNombre, imagenes.url, imagenes.destacado FROM productos INNER JOIN categorias ON productos.categoria_id = categorias.id INNER JOIN imagenes ON productos.id = imagenes.producto_id WHERE categorias.nombre = ?'
            db.all(sql, [categoria], (err, resultados)=>{
                if (err) reject(err);
                else resolve(resultados);
            })
        })
    },
    //Filtrado marca
    filtradomarca(marca){
        return new Promise ((resolve, reject)=>{
            const sql='SELECT productos.nombre AS productoNombre, productos.precio, productos.codigo, productos.descripcion, productos.marca, productos.modelo, categorias.nombre AS categoriaNombre, imagenes.url, imagenes.destacado FROM productos INNER JOIN categorias ON productos.categoria_id = categorias.id INNER JOIN imagenes ON productos.id = imagenes.producto_id WHERE productos.marca = ?'
            db.all(sql, [marca], (err, resultados)=>{
                if (err) reject(err);
                else resolve(resultados);
            })
        })
    },
    //Filtrado modelo
    filtradomdl(modelo){
        return new Promise ((resolve, reject)=>{
            const sql='SELECT productos.nombre AS productoNombre, productos.precio, productos.codigo, productos.descripcion, productos.marca, productos.modelo, categorias.nombre AS categoriaNombre, imagenes.url, imagenes.destacado FROM productos INNER JOIN categorias ON productos.categoria_id = categorias.id INNER JOIN imagenes ON productos.id = imagenes.producto_id WHERE productos.modelo = ?'
            db.all(sql, [modelo], (err, resultados)=>{
                if (err) reject(err);
                else resolve(resultados);
            })
        })
    },





    obtenerctg(){
        return new Promise ((resolve, reject) =>{
            const sql = 'Select * FROM categorias';
            db.all (sql, (err, resultados) =>{
                if (err) reject(err);
                else resolve(resultados);
            });
        });
    },
    obtenerctgPorId(id){
        return new Promise ((resolve, reject) => {
            const sql = 'SELECT * FROM categorias where id = ?'
            db.get(sql, [id], (err, resultados)=>{
                if (err) reject(err);
                else resolve(resultados);
            });
        });
    },
    insertarctg(nombre){
        return new Promise ((resolve, reject) =>{
            const sql = 'INSERT INTO categorias (nombre) VALUES (?)';
            db.run(sql, [nombre], (err, resultados) => {
                if (err) reject(err);
                else resolve(resultados);
            });
        });
    },
    actualizarctg(nombre, id){
        return new Promise ((resolve, reject)=>{
            const sql = 'UPDATE categorias SET nombre = ? WHERE id = ?'
            db.run(sql, [nombre, id], (err) =>{
                if (err) reject(err);
                else resolve();
            });
        });
    },
    eliminarctg(id){
        return new Promise ((resolve, reject)=>{
            const sql = 'DELETE FROM categorias WHERE id = ?'
            db.run(sql, [id], (err)=>{
                if (err) reject(err);
                else resolve();
            });
        });
    },
    obtenerprd(){
        return new Promise ((resolve, reject) =>{
            const sql = 'SELECT * from productos';
            db.all (sql, (err, resultados) =>{
                if (err) reject(err);
                else resolve(resultados);
            });
        });
    },
    obtenerprdPorId(id){
        return new Promise ((resolve, reject)=>{
            const sql = 'SELECT * FROM productos WHERE id = ?';
            db.get(sql, [id], (err, resultados)=>{
                if (err) reject(err);
                else resolve(resultados);
            });
        });
    },
    insertarprd(nombre, precio, codigo, descripcion, marca, modelo, categoria_id){
        return new Promise ((resolve, reject) =>{
            const sql = 'INSERT INTO productos (nombre, precio, codigo, descripcion, marca, modelo, categoria_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
            db.run (sql, [nombre, precio, codigo, descripcion, marca, modelo, categoria_id], (err, resultados)=>{
                if (err) reject(err);
                else resolve(resultados);
            });
        });
    },
    actualizarprd(nombre, precio, codigo, descripcion, marca, modelo, id){
        return new Promise ((resolve, reject)=>{
            const sql = 'UPDATE productos SET nombre = ?, precio = ?, codigo = ?, descripcion = ?, marca = ?, modelo = ? WHERE id = ?';
            db.run(sql, [nombre, precio, codigo, descripcion, marca, modelo, id], (err)=>{
                if (err) reject(err);
                else resolve();
            });
        });
    },
    eliminarprd(id){
        return new Promise ((resolve, reject)=>{
            const sql = 'DELETE FROM productos WHERE id = ?';
            db.run(sql, [id], (err)=>{
                if (err) reject(err);
                else resolve();
            });
        });        
    },
    obtenerimg(){
        return new Promise ((resolve, reject) =>{
            const sql = 'SELECT * FROM imagenes';
            db.all(sql, (err, resultados)=>{
                if (err) reject(err);
                else resolve(resultados);
            });
        });
    },
    obtenerimgPorId(id){
        return new Promise ((resolve, reject)=>{
            const sql = 'SELECT * FROM imagenes WHERE id = ?';
            db.get(sql, [id], (err, resultados)=>{
                if (err) reject(err);
                else resolve(resultados);
            });
        });
    },
    insertarimg(url, destacado, producto_id){
        return new Promise ((resolve, reject)=>{
            const sql = 'INSERT INTO imagenes (url, destacado, producto_id) VALUES (?, ?, ?)';
            db.run (sql, [url, destacado, producto_id], (err, resultados) =>{
                if (err) reject(err);
                else resolve(resultados);
            });
        });
    },
    actualzarimg(url, destacado, id){
        return new Promise ((resolve, reject)=>{
            const sql = 'UPDATE imagenes SET url = ?, destacado = ? WHERE id = ?';
            db.run (sql, [url, destacado, id], (err)=>{
                if (err) reject(err);
                else resolve();
            });
        });
    },
    eliminarimg(id){
        return new Promise ((resolve, reject)=>{
            const sql = 'DELETE FROM imagenes WHERE id = ?';
            db.run(sql, [id], (err)=>{
                if (err) reject (err);
                else resolve();
            });
        });
    },
};