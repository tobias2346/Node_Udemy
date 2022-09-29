const mongoose = require('mongoose')

//Llama a la base de datos y conecta mongo Db con mongoose
const dbConection = async() => {

    const uri = 'mongodb+srv://user_node:XLGKimg6hCXUgtLI@cluster0.bgckn6k.mongodb.net/cafeDB'

    try {
        await mongoose.connect( uri );

        console.log('base de datos online')

    } catch (error) {

        console.log(error)
        throw new Error('Error en la Data base')

    }

};


//Devuelve la funcion async y la exporta al server.js
module.exports = {
    dbConection
}