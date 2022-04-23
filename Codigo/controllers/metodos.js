const conexion = require('../database/db');
const session = require('express-session');
const nodemailer = require('nodemailer');
const { google } = require("googleapis");

//Crear un registro del cliente que se guarda en la data
exports.createcliente = (req, res)=>{
    const idcliente = req.body.nit;
    const name = req.body.nombre;
    const tipo = req.body.tipo;
    conexion.query('insert into cliente set ?',{idcliente:idcliente,name:name,tipo:tipo}, (error,results)=>{
        if(error)
        {
            console.log(error);
        }else{
            res.redirect('/propuesta');
        }
    });
}

//Crear una propuesta de proyecto que se guarda en la data
exports.createpropuesta = (req,res)=>{
    const nombre = req.body.nombre;
    const descripcion = req.body.concepto;
    const cliente = req.body.idcliente;
    conexion.query('insert into proyecto set ?', {nombre:nombre, descripcion:descripcion, estado:1, cliente:cliente}, (error,results)=>{
        if(error)
        {
            console.log(error);
        }else{
            res.redirect('/propuesta');
        }
    })
}

//El metodo se donar, funciona que en la data se hace una actualizacion del presupuesto de un proyecto en especifico o en todos los proyectos
exports.donar = (req,res)=>
{
    const idproyecto = req.body.programa;
    const presu = req.body.valor;
    conexion.query('update proyecto set presupuesto = presupuesto + "'+Number(presu)+'" where idproyecto = ?', [idproyecto], (error,results)=>{
        if(error)
        {
            console.log(error);
        }else{
           
            res.render('index',{
                alert:true,
                alertTitle: "Donación exitosa",
                alertMessage: "Su donación se realizo de manera exitosa el codigo de donacion es '"+Math.random()+"' ",
                alertIcon: 'success',
                ShowConfirmButton:true,
                timer: false,
                ruta:'index'
            });   
        }
    })
}

//Crear un registro de un usuario nuevo que se guarada en la data
exports.registrar = (req, res)=>
{
    const nombre = req.body.name;
    const sexo = req.body.sex;
    const user = req.body.user;
    const password = req.body.pass;
    const posicion = req.body.rol;
    const correo = req.body.email;
    //let passwordHaash = await bcryptjs.hash(pass,8);
    conexion.query('insert into usuarios set ?', {nombrepersona:nombre,sexo:sexo,user:user,password:password,correo:correo,posicion:posicion}, async(error, results)=>{
        if(error){
            console.log(error);
        }else{
             
            res.render('register',{
                alert:true,
                alertTitle: "Registration",
                alertMessage: "Successful Registration!",
                alertIcon: 'success',
                ShowConfirmButton:false,
                timer: 1500,
                ruta:'login'
            })
        }
    });
}

//Valida los usuarios en la data
exports.autenticar = (req, res)=>
{
    const user = req.body.user; 
    const pass = req.body.pass;
    if(user && pass)
    {
        conexion.query('SELECT * FROM usuarios WHERE user = ?', [user], async (error, results)=>
        {
            if(results.length > 0)
            {
                results.forEach(element=>{
                    if(element.password == pass)
                    {
                        if(element.posicion == 1)
                        {
                            res.render('login',{
                                alert:true,
                                alertTitle: "Login exitosa",
                                alertMessage: "¡LOGIN CORRECTO!",
                                alertIcon: 'success',
                                ShowConfirmButton:false,
                                timer: 1600,
                                ruta:'index'
                            })
                        }
                        else if(element.posicion==2)
                        {
                            res.render('login',{
                                alert:true,
                                alertTitle: "Login exitosa",
                                alertMessage: "¡LOGIN CORRECTO!",
                                alertIcon: 'success',
                                ShowConfirmButton:false,
                                timer: 1600,
                                ruta:'profesor'    
                            })
                        }
                        else{
                            res.render('login',{
                                alert:true,
                                alertTitle: "Login exitosa",
                                alertMessage: "¡LOGIN CORRECTO!",
                                alertIcon: 'success',
                                ShowConfirmButton:false,
                                timer: 1600,
                                ruta: 'estudiantes'  
                            })                          
                        }
                                       
                    }
                    else{
                        
                        res.render('login',{
                            alert:true,
                            alertTitle: "Error",
                            alertMessage: "Usuario y/o contraseña incorrectas",
                            alertIcon: 'error',
                            ShowConfirmButton:true,
                            timer: '',
                            ruta:'login'
                        })
                    }
                })
            }
            else
            {
                res.render('login',{
                    alert:true,
                    alertTitle: "Error",
                    alertMessage: "Usuario no existe",
                    alertIcon: 'error',
                    ShowConfirmButton:true,
                    timer: '',
                    ruta:'login'
                });
            }
        })
    }
    else{
        res.render('login',{
            alert:true,
            alertTitle: "Advertencia",
            alertMessage: "Por favor ingresar los datos",
            alertIcon: 'warning',
            ShowConfirmButton:true,
            timer: '',
            ruta:'login'
        });
    }
}

//Edita los campos de un proyecto en la data 
exports.editar = (req,res)=>
{
    const idproyecto = req.body.idproyecto;
    const nombre = req.body.nombreproyecto;
    const descripcion = req.body.descripcion;
    const presupuesto = req.body.presupuesto;
    const estado = req.body.estado;
    const docente = req.body.docente;
    const estudiante = req.body.estudiante;
    conexion.query('update proyecto set ? where idproyecto = ?', [{nombre:nombre,descripcion:descripcion,presupuesto:presupuesto,estado:estado,profesor:docente, estudiante:estudiante},idproyecto], (error,results)=>{
        if(error)
        {
            console.log(error);
        }
        else{
            res.redirect('act_proyecto');
        }
    })
   
}

exports.editar_usuario = (req,res)=>{
    const idusuario = req.body.idusuarios;
    const nombrepersona = req.body.nombre;
    const sexo = req.body.sexo;
    const email = req.body.email;
    const rol = req.body.rol;
    conexion.query('update usuarios set ? where idusuario = ?', [{nombrepersona:nombrepersona, sexo:sexo, correo:email, posicion: rol}, idusuario],(error,results)=>{
        if(error)
        {
            throw error;
        }
        else
        {
            res.render('usuarios',{
                alert:true,
                alertTitle: "Edición",
                alertMessage: "Edicion realizada con exito!",
                alertIcon: 'success',
                ShowConfirmButton:false,
                timer: 1500,
                ruta:'usuarios'
            })
        }
    })
}

exports.send_email= (req,res)=>{
    const {name, email, message} = req.body;
    contentHtml = `
        <h1>Reporte</h1>
        <ul>
            <li>${message}</li>
        </ul>
    `;

    const CLIENTD_ID = "570043184630-akm305qb57kcu7t3tdmk5vai8p4d9rnh.apps.googleusercontent.com";
    const CLIENT_SECRET ="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";
    const REDIRECT_URI ="https://developers.google.com/oauthplayground";
    const REFRESH_TOKEN ="1//04rv2SwHsZPJ7CgYIARAAGAQSNwF-L9IrQC0-robwMs1pgklRqO_ReNE1nEAS3EjY3bbtcsWc2kFF-694amb5S7bvQ04QBL8H7gw";
    
    const oAuth2Client = new google.auth.OAuth2(
        CLIENTD_ID,
        CLIENT_SECRET,
        REDIRECT_URI
    );
        
    oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
        
    async function sendMail() {
        try{
            const accessToke=await oAuth2Client.getAccessToken()
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth:{
                type: "OAuth2",
                user: "soporgps@gmail.com",
                clientId:CLIENTD_ID,
                clientSecret:CLIENT_SECRET,
                refreshToken:REFRESH_TOKEN,
                accessToke:accessToke
            },
        });
            
            
            const mailOptions={
                from: "Pagina wep gapston proyect system <soporgps@gmail.com>",
                to: email,
                subject: "Reporte de " + name,                
                html: contentHtml,
            };    
            const result = await transporter.sendMail(mailOptions);
            return result;
            
        }catch(error){
            console.log(error);
        }
    }

    sendMail()
        .then((result)=> res.render('',{
            alert:true,
            alertTitle: "Mensaje",
            alertMessage: "Mensaje eviado al correo con exito!",
            alertIcon: 'success',
            ShowConfirmButton:false,
            timer: 2500,
            ruta:''
        }))
        .catch((error)=>console.log(error.menssage));
}

exports.psend_email= (req,res)=>{
    const {name, email, message} = req.body;
    contentHtml = `
        <h1>Reporte</h1>
        <ul>
            <li>${message}</li>
        </ul>
    `;

    const CLIENTD_ID = "570043184630-akm305qb57kcu7t3tdmk5vai8p4d9rnh.apps.googleusercontent.com";
    const CLIENT_SECRET ="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";
    const REDIRECT_URI ="https://developers.google.com/oauthplayground";
    const REFRESH_TOKEN ="1//04rv2SwHsZPJ7CgYIARAAGAQSNwF-L9IrQC0-robwMs1pgklRqO_ReNE1nEAS3EjY3bbtcsWc2kFF-694amb5S7bvQ04QBL8H7gw";
    
    const oAuth2Client = new google.auth.OAuth2(
        CLIENTD_ID,
        CLIENT_SECRET,
        REDIRECT_URI
    );
        
    oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
        
    async function sendMail() {
        try{
            const accessToke=await oAuth2Client.getAccessToken()
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth:{
                type: "OAuth2",
                user: "soporgps@gmail.com",
                clientId:CLIENTD_ID,
                clientSecret:CLIENT_SECRET,
                refreshToken:REFRESH_TOKEN,
                accessToke:accessToke
            },
        });
            
            
            const mailOptions={
                from: "Pagina wep gapston proyect system <soporgps@gmail.com>",
                to: email,
                subject: "Reporte de " + name,                
                html: contentHtml,
            };    
            const result = await transporter.sendMail(mailOptions);
            return result;
            
        }catch(error){
            console.log(error);
        }
    }

    sendMail()
        .then((result)=> res.render('notas',{
            alert:true,
            alertTitle: "Mensaje",
            alertMessage: "Mensaje eviado al correo con exito!",
            alertIcon: 'success',
            ShowConfirmButton:false,
            timer: 2500,
            ruta:"notas"
        }))
        .catch((error)=>console.log(error.menssage));
}

exports.editar_pro = (req,res)=>{
    const idproyecto = req.body.idproyecto;
    const estado = req.body.estado;
    conexion.query('update proyecto set ? where idproyecto = ?', [{estado:estado},idproyecto], (error,results)=>{
        if(error)
        {
            console.log(error);
        }
        else{
            res.redirect('/profesor');
        }
    })
}