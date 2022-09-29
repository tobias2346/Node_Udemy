const {Router} = require('express');
const { check } = require('express-validator');

const {usuariosGet} = require('../controllers/mange_users');
const {usuariosPost} = require('../controllers/mange_users');
const {usuariosPatch} = require('../controllers/mange_users');
const {usuariosDelete} = require('../controllers/mange_users');

const { validarCampos } = require('../middlewares/validar-campos');

//Importa el Schema del Rol
const Role = require('../models/rol')
const router = Router();

//Rutea todos los campos y los manda en el server principal
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