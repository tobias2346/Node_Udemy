const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');


const usuariosGet = (req = request, res = response) => {

    const { q, nombre = "No name", apikey } = req.query;

    res.json({
        msg: 'get API - controller',
        q,
        nombre,
        apikey
    })
}

const usuariosPost = async (req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario( { nombre, correo, password, rol } );

    //Verificar si el correo existe
    
    const existeEmail = await Usuario.findOne({ correo })
    if ( existeEmail ){
        return res.status(400).json({
            msg: ' El correo ya esta registrado '
        })
    }

    //Encriptar la password
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );
    //
    await usuario.save()

    res.json({
        usuario
    })
}

const usuariosPatch = (req, res = response) => {

    res.json({
        msg: 'patch API - controller'
    })
}

const usuariosDelete = (req, res = response) => {

    res.json({
        msg: 'delete API - controller'
    })
}




module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPatch,
    usuariosDelete
}

