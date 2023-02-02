var express = require('express');
var bodyParser = require('body-parser')
var idUsuario
var router = express.Router();
var count=0;
const connect = require('./db_pool_connect');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('crear', { title: 'Express' });
});

/**
 * Crear una mascota dados los datos que se requieren.
 * !Antes de crearlo debería verificar si ya existe.
 */
 router.post('/', function (req, res, next) {
    connect(function (err, client, done) {
      if (err) {
        return console.error('error fetching client from pool', err);
      }
  
      //use the client for executing the query
     
      client.query(`INSERT INTO  Persona VALUES (${req.body.cedula}, '${req.body.direccion}', '${req.body.nombre}', '${req.body.apellido}', '${req.body.telefono}', '${req.body.password}');
                    INSERT INTO  Usuario_app(id_telefono, cedula, email, medio_pago) VALUES ('${req.body.telefono}', ${req.body.cedula}, '${req.body.email}', '${req.body.metodopago}');`, function (err, result) {
        //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
        done(err);
        if (err) {
          return console.error('error running query', err);
        }
        res.redirect('http://localhost:3000/metodopago');
      });
    });
  
  })
  
  module.exports = router;