var express = require('express');
var bodyParser = require('body-parser')
var router = express.Router();
const connect = require('./db_pool_connect');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('login', { title: 'Express' });
});

router.post('/', function (req, res, next) {
  connect(function (err, client, done) {

    let sql = `SELECT * FROM Persona NATURAL JOIN Usuario;`
    console.log("Trabajador: " + req.body.trabajador) //on
    console.log("Trabajador value: " + req.body.trabajador.value)

    if(req.body.trabajador.toLowerCase()=='si'){
      sql = `SELECT * FROM Persona NATURAL JOIN Trabajador AS t WHERE t.cedula='${req.body.usuarioId}' AND password='${req.body.contrasenha}';`
      console.log("BÚSQUEDA TRABAJADOR: " + sql)
      direccion = 'http://localhost:3000/trabajador/' + req.body.usuarioId
    }
    else{
      sql = `SELECT * FROM Persona NATURAL JOIN Usuario_app WHERE id_telefono='${req.body.usuarioId}' AND password='${req.body.contrasenha}';`
      console.log("BÚSQUEDA USUARIO: " + sql)
      direccion = 'http://localhost:3000/usuario/' + req.body.usuarioId
    }
    client.query(sql, function (err, result) {
      //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
      done(err);
      
      if (err) {
        console.log("No existe el usuario, vamos al login")
        res.redirect('http://localhost:3000/login');
        return console.error('error running query', err);
      }

      let usuarios = {users:result.rows}
      console.log("USUARIOS: " + result.rows);
      if(Object.keys(result.rows).length==0){ //validar si el usuario ingresado existe o no
        console.log("NO hay error pero No existe el usuario, vamos al login")
        res.redirect('http://localhost:3000/login')
      }
      else{
        res.redirect(direccion);
      }
    }); 
  })
});

module.exports = router;