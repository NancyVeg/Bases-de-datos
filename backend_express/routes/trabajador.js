var express = require('express');
var bodyParser = require('body-parser')

var router = express.Router();

const connect = require('./db_pool_connect');

/**
 * Cuando el trabajador se loguee
 */
router.get('/:id', function (req, res, next) {
  
  
  connect(function (err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    console.log("GET " + JSON.stringify(req.body));
    var primerRender
    var segundoRender
    client.query(`SELECT * FROM Trabajador_labor NATURAL JOIN Labor NATURAL JOIN Trabajador WHERE ocupado=TRUE
                  AND cedula='${req.params.id}';`, function (err, result) {
      //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
      //done(err);

      if (err) {
        return console.error('error running query', err);
      }
      primerRender=result.rows
    });

    client.query(`SELECT * FROM Usuario_trabajador NATURAL JOIN Usuario_app AS u NATURAL JOIN Persona AS p 
                  WHERE u.cedula=p.cedula;`, function (err, result) {
      //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
      done(err);

      if (err) {
        return console.error('userserror running query', err);
      }
      segundoRender = result.rows
      console.log('Primer render: ' + primerRender + 'Segundo render: ' + segundoRender)
      res.render('trabajador', {users:primerRender, usuarios:segundoRender});
      
    });
    
  });

})


router.post('/:id', function (req, res, next) {
  
  connect(function (err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }

    client.query(`UPDATE Trabajador SET ocupado=FALSE WHERE id_trabajador=${req.body.terminarLabor};`, function (err, result) {
      //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
      done(err);

      if (err) {
        return console.error('userserror running query', err);
      }
      console.log(JSON.stringify(result.rows))
      res.render('trabajador', {users:result.rows});
      
    });
    
  });

})

module.exports = router;
