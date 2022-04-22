import { Router } from "express";
import { check } from 'express-validator';
import { deleteUsuario, getUsuario, getUsuarios, postUsuario, putUsuario } from "../controllers/usuarios";
import { esRoleValido, existEmail, existUsuario } from "../helpers/db-validators";
import { validarCampos } from "../middlewares/validar-campos";
import { validarJWT } from "../middlewares/validar-jwt";
import { tieneRole } from "../middlewares/validar-roler";

const routerUsuarios: Router = Router();

routerUsuarios.get('/', getUsuarios);
routerUsuarios.get('/:id', [
    check('id', 'El id debe ser valido').isMongoId(),
    check('id').custom(existUsuario),
    validarCampos], getUsuario);
routerUsuarios.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser de mas de 6 letras').isLength({ min: 6 }),
    // check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(existEmail),
    // check('role', 'No es un Role valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(esRoleValido),
    validarCampos
], postUsuario);
routerUsuarios.put('/:id', [
    validarJWT,
    check('id', 'El id debe ser valido').isMongoId(),
    check('id').custom(existUsuario),
    check('role').custom(esRoleValido),
    validarCampos
], putUsuario);
routerUsuarios.delete('/:id',[
    validarJWT,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existUsuario),
    validarCampos
], deleteUsuario);

export default routerUsuarios;