import {check} from 'express-validator';
import { Router } from "express";
import { login } from "../controllers/auth";
import { validarCampos } from "../middlewares/validar-campos";


const routerAuth = Router();

routerAuth.post('/login',[
    check('correo', 'El Correo es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser de mas de 6 letras').isLength({ min: 6 }),
    validarCampos
], login);


export default routerAuth;