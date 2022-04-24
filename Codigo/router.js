const express=require('express');
const router = express.Router();
const conexion = require('./database/db.js')
const metodos = require('./controllers/metodos.js');
const res = require('express/lib/response');
const req = require('express/lib/request');

//Ruta principal
router.get('/',(req,res)=>{
  res.render('inicio');
})

//Ruta para realizar la visualización de los proyectos
router.get('/proyectos',(req,res)=>{
    conexion.query('select pro.idproyecto, pro.nombre, pro.descripcion, pro.presupuesto, es.nomb, cl.name  from proyecto pro inner join cliente cl on pro.cliente = cl.idcliente inner join estado es on pro.estado = es.idestado',(error,results)=>{
      if(error)
      {
        throw error;
      }
      else
      {
        res.render('proyectos',{results:results})
      }
    })

})

//Ruta para realizar las donaciones
router.get('/donar',(req,res)=>{
  conexion.query('select idproyecto, nombre from proyecto',(error,results)=>{
    if(error)
    {
      throw error;
    }
    else
    {
      res.render('donar',{results:results})
    }
  })

})

//Ruta para mostrar una pagina que servira para registrar las propuestas y los clientes
router.get('/propuesta', (req,res)=>{
  res.render('propuesta');
})

//Rura para inscribir las propuestas
router.get('/inscribir_propuesta', (req,res)=>{
  conexion.query('select idcliente, name from cliente', (error,results)=>{
    if(error)
    {
      throw error
    }else{
      res.render('inscripcion',{results:results});
    }
  })
})

//Ruta para inscribir los clientes
router.get('/inscribir_cliente',(req,res)=>{
  res.render('cliente')
})

//Ruta que se invoca luego del login
router.get('/index',(req,res)=>{
  res.render('index')
})

//Ruta para realizar el login
router.get('/login', (req, res)=>{
  res.render('login');
});

//Ruta para registrar los usuarios
router.get('/register', (req, res)=>{
  res.render('register');
});

//Ruta para realizar la actualización de los proyectos
router.get('/act_proyecto',(req,res)=>
{
  res.render('act_proyecto');
})

//Ruta para registrar los usuarios
router.get('/estudiantes', (req,res)=>{
  conexion.query('select *from proyecto pro inner join usuarios user on pro.estudiante = user.idusuario where user.posicion = 2', (error, results)=>
  {
    if(error)
    {
      throw error;
    }
    else{
      res.render('estudiantes', {results:results});
    }
  })
})

//Ruta para asignar docentes a los proyectos que no lo tengan y modificar todos sus parametros
router.get('/asignar_docente',(req,res)=>{
  conexion.query('select pro.idproyecto, pro.nombre, pro.descripcion, pro.presupuesto, es.nomb, cl.name from proyecto pro inner join cliente cl on pro.cliente = cl.idcliente inner join estado es on pro.estado = es.idestado where pro.profesor is NULL order by idproyecto asc',(error,results)=>{  
    if(error)
    {
      throw error;
    }
    else
    {
      res.render('asignar_docentes',{results:results})
    }
  })
})

//Ruta para editar los registros generales
router.get('/editar_registros',(req,res)=>{
  conexion.query('select pro.idproyecto, pro.nombre, pro.descripcion, pro.presupuesto, pro.estudiante, user.nombrepersona, es.nomb, cl.name  from proyecto pro inner join cliente cl on pro.cliente = cl.idcliente inner join estado es on pro.estado = es.idestado inner join usuarios user on (pro.profesor = user.idusuario) order by idproyecto asc',(error,results)=>{
    if(error)
    {
      throw error;
    }
    else
    {
      conexion.query('select  user.idusuario, user.nombrepersona   from usuarios user inner join proyecto pro on user.idusuario = pro.estudiante', (error,estudiante)=>{
        if (error)
        {
          throw error;
        }else
        {
          res.render('editar_registros',{results:results, estudiante:estudiante});
          
        }
      })
    }
  })
})



//Ruta para asignar docentes a los proyectos que no lo tengan y modificar todos sus parametros
router.get('/editar/:id',(req,res)=>{ 
  const id = req.params.id;
   conexion.query('select *from proyecto where idproyecto = ? ', [id], (error,results)=>{
    if(error)
     {
       throw error;
     }else{
      conexion.query('select *from usuarios where posicion = 2 ', (error,result)=>{
        if(error)
         {
           throw error;
         }else{
           conexion.query('select idestado, nomb from estado', (error,estado)=>{
             if(error)
             {
               throw error;
             }else{
              conexion.query('select *from usuarios where posicion = 3', (error,estudiante)=>{
                if(error)
                {
                  throw error;
                }
                else{
                  res.render('editar',{proyecto:results[0], usuarios:result, estados:estado, estudiantes:estudiante});
                }
              })
              
             }
           })
         }
       })
     }
   })
})

router.get('/editar/:id',(req,res)=>{ 
  const id = req.params.id;
   conexion.query('select *from proyecto where idproyecto = ? ', [id], (error,results)=>{
    if(error)
     {
       throw error;
     }else{
      conexion.query('select *from usuarios where posicion = 2 ', (error,result)=>{
        if(error)
         {
           throw error;
         }else{
           conexion.query('select idestado, nomb from estado', (error,estado)=>{
             if(error)
             {
               throw error;
             }else{
              conexion.query('select *from usuarios where posicion = 3', (error,estudiante)=>{
                if(error)
                {
                  throw error;
                }
                else{
                  res.render('editar',{proyecto:results[0], usuarios:result, estados:estado, estudiantes:estudiante});
                }
              })
              
             }
           })
         }
       })
     }
   })
})

router.get('/editar/pro/:id',(req,res)=>{ 
  const id = req.params.id;
   conexion.query('select *from proyecto where idproyecto = ? ', [id], (error,results)=>{
    if(error)
     {
       throw error;
     }else{
      conexion.query('select *from usuarios where posicion = 2 ', (error,result)=>{
        if(error)
         {
           throw error;
         }else{
           conexion.query('select idestado, nomb from estado', (error,estado)=>{
             if(error)
             {
               throw error;
             }else{
              conexion.query('select *from usuarios where posicion = 3', (error,estudiante)=>{
                if(error)
                {
                  throw error;
                }
                else{
                  res.render('editar_pro',{proyecto:results[0], usuarios:result, estados:estado, estudiantes:estudiante});
                }
              })
              
             }
           })
         }
       })
     }
   })
})

//Ruta para mostrar los usuarios ademas que se encuentran registrados en la tabla
router.get('/usuarios',(req,res)=>
{
  conexion.query('select *from usuarios user inner join posicion pos on user.posicion = pos.idposicion', (error,results)=>{
    if(error)
    {
      throw error;
    }else{
      res.render('usuarios',{results:results});
    }
  })
})

router.get('/nota',(req,res)=>{
  res.render('reporte');
})

router.get('/editar/usuarios/:id', (req,res)=>{
  const id = req.params.id;
  conexion.query('select *from usuarios user inner join posicion pos on user.posicion = pos.idposicion where user.idusuario = ? ', [id], (error, results)=>{
    if(error)
    {
      throw error;
    }
    else{
      res.render('editar_usuarios',{results:results[0]});
    }
  })
})

router.get('/eliminar/usuarios/:id',(req,res)=>{
  const id=req.params.id;
  conexion.query('delete from usuarios where idusuario = ?', [id], (error,results)=>{
    if(error)
    {
      throw error;
    }
    else{
      res.render('usuarios');
    }
  })
})

router.get('/profesor',(req,res)=>{
  conexion.query('select *from proyecto pro inner join usuarios user on pro.profesor = user.idusuario inner join estado es on es.idestado = pro.estado',(error,results)=>{
    if(error)
    {
      throw error;
    }
    else
    {
      res.render('profesor', {results:results});
    }
  })
});


//Ruta de Cerrar Seccion
router.get('/logout', (req, res)=>{
    res.redirect('login')
})


router.get('/reporte', (req,res)=>{
  res.render('reporte');
})

router.get('/donaciones', (req,res)=>{
  res.render('donaciones');
})


router.get('/asignados', (req,res)=>{  
  conexion.query('select *from proyecto pro inner join usuarios user on pro.estudiante = user.idusuario inner join cliente cl on pro.cliente = cl.idcliente; ', (error,results)=>{
    if(error)
    {
      throw error;
    }
    else
    {
      conexion.query('select  user.idusuario ,user.nombrepersona  from usuarios user inner join proyecto pro on user.idusuario = pro.profesor', (error,profesor)=>{
        if (error)
        {
          throw error;
        }else
        {
          res.render('asignado', {results:results, profesor:profesor});          
        }
      })
     
    }
  })
})

router.get('/notas',(req,res)=>{
  res.render('notas');
})

//Metodos post
router.post('/createcliente', metodos.createcliente);
router.post('/createpropuesta', metodos.createpropuesta);
router.post('/donar',metodos.donar);
router.post('/register',metodos.registrar);
router.post('/auth',metodos.autenticar);
router.post('/editar', metodos.editar);
router.post('/editar_usuario',metodos.editar_usuario);
router.post('/send-email',metodos.send_email);
router.post('/editar/pro',metodos.editar_pro);
router.post('/psend-email',metodos.psend_email)

//Para exportar en router
module.exports=router;
