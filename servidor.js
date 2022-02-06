var express = require('express');
const { createQuery } = require('mysql');
var app = express();

var mysql = require('mysql');
var conexion = mysql.createConnection({
    host:"localhost",
    database :"ese",
    user:"root",
    password:"1a2BRoot4c5E"
});

const Connection = require('mysql/lib/Connection');

conexion.connect(function(err){
    if(err){
        console.error('error de conexión: ' + err.stack);
        return;
    }
    console.log('conectado con id: ' + conexion.threadId);
});

var cors =require('cors');

app.use(cors());
app.configure(function(){
    app.use(express.static(__dirname + '/publico'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
})

// Copiado de https://enable-cors.org/server_expressjs.html 
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  // sin cors => todos orígenes 
app.get('/responsable/:id', function(req, res, next){
    consulta = "SELECT * FROM responsable WHERE id_responsable = " + conexion.escape(req.params.id);
    conexion.query(consulta, function(err, rows, fields){
        if(err){
            console.error('error de consulta: SELECT * FROM responsable WHERE id_responsable = ' + req.params.id + err.stack);
            return;
        }
        //res.json(rows)
        //console.log(consulta);
        console.log(rows);
        res.send(rows);
    });
})

app.get('/inspeccion/:id', function(req, res, next){
    consulta = "SELECT * FROM view_inspecciones WHERE id_personal = " + conexion.escape(req.params.id);
    conexion.query(consulta, function(err, rows, fields){
        if(err){
            console.error('error de consulta: SELECT * FROM responsable WHERE id_responsable = ' + req.params.id + err.stack);
            return;
        }
        //res.json(rows)
        //console.log(consulta);
        console.log(rows);
        res.send(rows);
    });
})

app.get('/personal', function(req, res, next){
    var campos = "nombre, apellido1, apellido2,doc_empresa, documento, licencia, nacionalidad "
    consulta = "SELECT " + campos  + " FROM personal WHERE fecha_baja is not null";
    conexion.query(consulta, function(err, rows, fields){
        if(err){
            console.error('error de consulta: SELECT " + campos + " FROM personal WHERE fecha_baja is not null' + req.params.id + err.stack);
            return;
        }
        //res.json(rows)
        //console.log(consulta);
        console.log(rows);
        res.send(rows);
    });
    //res.json({msg:'El GET ha funcionado ' })

    //res.json(resultado)
})


app.post('/api/lista', function(peticion, respuesta){
    conexion.createQuery({
        query:peticion.body.query
    }, function(error, lista){
        if(error){
            respuesta.send(error);
        }
        respuesta.send("Éxito");
    })
})

app.delete('*:item', function(peticion, respuesta){
   // id : peticion.params.item
   respuesta.send("Operación no permitida");
})

app.put('*:item', function(peticion, respuesta){
    // método de update
   respuesta.send("Operación no permitida");
})



app.listen(8082, function(){
    console.log("Servidor a la escucha")
})
