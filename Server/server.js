//En la carpeta server se hacen todos los llamados y se importa o se linkea lo neceasario para mandar finalmnte la app a pantalla

const express = require('express')
const cors = require('cors');

//Conecta el server con la base de Datos
const  {dbConection}  = require('../database/conectDB');
 

const app = express();
const port = process.env.PORT;


// Conectar a base de datos
conectarDB()

//Middlewares
middlewares();

//Rutas de mi aplicacion
routes()
    
//Conecta el servidor con la base de datos de forma async
async function conectarDB() {
    await dbConection();
}



function middlewares(){
//Utiliza cors para prevenir El Intercambio de Recursos de Origen Cruzado para que la pp corra
    app.use(cors())

    app.use( express.json() )

    app.use( express.static('public') )
}

// Rutea a un archivo para no sobrecargar este y utiliza el metodo router para hacerlo mas facil
function routes() {

    app.use('/api/users', require('../routes/endPoints'))

} 

app.listen(port);


module.exports = app;
