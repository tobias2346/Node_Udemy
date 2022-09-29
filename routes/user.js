const {Router} = require('express');
const { check } = require('express-validator');
const Role = require('../models/rol')
const {usuariosGet} = require('../controllers/usuarios');
const {usuariosPost} = require('../controllers/usuarios');
const {usuariosPatch} = require('../controllers/usuarios');
const {usuariosDelete} = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();



router.get('/', usuariosGet );

router.post('/', [
    check( 'nombre', 'El nombre es obligatorio' ).not().isEmpty(),
    check( 'correo', 'El correo no es valido' ).isEmail(),
    check( 'password', 'El password debe de ser de mas de 6 letras' ).isLength({ min:6 }),
    //check( 'rol', 'No es un rol valido' ).isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom( async( rol = '')  => {
        const existeRol = await Role.findOne({rol})
        if(!existeRol){
            throw new Error(`El rol ${rol} no esta registrado en la base de datos`);
        }
    }),
    validarCampos
], usuariosPost);

router.patch('/', usuariosPatch);

router.delete('/', usuariosDelete);

module.exports = router