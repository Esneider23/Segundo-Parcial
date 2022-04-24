const mysql = require('mysql2');

const conexion= mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:"gestion"
});

/* host:'us-cdbr-east-05.cleardb.net',
user:'bf1f95f81115a4',
password:'d7796d35',
database:"heroku_2c2c3c72d923f6f" */

//Es para determinar la conexion a la base de datos
conexion.connect((error)=>{
    if(error)
    {
        console.error('El error de conexion es:' + error);
        return
    }
    console.log('!Conexion exitosa');
})

module.exports = conexion;