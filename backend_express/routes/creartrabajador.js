var express = require('express');
var bodyParser = require('body-parser')
var idUsuario
var router = express.Router();
var count=0;
const connect = require('./db_pool_connect');
const uploadFile = require('./storage');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('creartrabajador', { title: 'Express' });
});

/**
 * Crear una mascota dados los datos que se requieren.
 * !Antes de crearlo debería verificar si ya existe.
 */
 router.post('/',uploadFile(), function (req, res, next) {
    connect(function (err, client, done) {
      if (err) {
        return console.error('error fetching client from pool', err);
      }
      console.log("Labor: "+req.body.labor);
      console.log("Cedula:"+req.body.cedula);
      //use the client for executing the query
      client.query(`INSERT INTO Persona VALUES (${req.body.cedula}, '${req.body.direccion}', '${req.body.nombre}', '${req.body.apellido}', '${req.body.telefono}', '${req.body.password}');
                    INSERT INTO Trabajador(cedula) VALUES (${req.body.cedula});
                    INSERT INTO Labor(id_trabajador,precioHora,nombreLabor) VALUES((SELECT MAX(id_trabajador) FROM Trabajador), ${req.body.precioHora}, '${req.body.nombreLabor}');
                    INSERT INTO Trabajador_labor(id_labor,id_trabajador) VALUES((SELECT MAX(id_labor) FROM Labor),(SELECT MAX(id_trabajador) FROM Trabajador));`, function (err, result) {
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