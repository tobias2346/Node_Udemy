const mongoose = require('mongoose')

const dbConection = async() => {

    const uri = 'mongodb+srv://user_node:XLGKimg6hCXUgtLI@cluster0.bgckn6k.mongodb.net/cafeDB'

    try {
        await mongoose.connect( uri);

        console.log('base de datos online')

    } catch (error) {
        console.log(error)
        throw new Error('Error en la Data base')
    }

};



module.exports = {
    dbConection
}