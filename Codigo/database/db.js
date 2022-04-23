const mysql = require('mysql2');

const conexion= mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:"gestion"
});

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