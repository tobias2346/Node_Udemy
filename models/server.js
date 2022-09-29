const express = require('express')
const cors = require('cors');
const  {dbConection}  = require('../database/config');

class Server {

    constructor() {
        this.app = express()  
        this.port = process.env.PORT;


        // Conectar a base de datos
        this.conectarDB()

        //Middlewares
        this.middlewares();

        //Rutas de mi aplicacion
        this.routes()
    }

    async conectarDB() {
        await dbConection();
    }



    middlewares(){

        this.app.use(cors())

        this.app.use( express.json() )

        this.app.use( express.static('public') )

    }

    routes() {

        this.app.use('/api/users', require('../routes/user'))

    } 


    listen(){
        
        this.app.listen(this.port)
        
        }

}



module.exports = Server;