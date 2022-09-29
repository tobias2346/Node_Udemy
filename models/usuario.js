
const { Schema, model } = require('mongoose');

const UsusarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatirio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio']
    },
    password: {
        type: String,
        required: [true, 'La contrasenia es obligatoria']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado : {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }


})



module.exports = model( 'Usuario', UsusarioSchema );