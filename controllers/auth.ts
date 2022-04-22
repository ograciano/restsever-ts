import { Request, Response } from "express";
import Usuario from "../models/usuario";
import bcryptjs from "bcryptjs";
import { generarJWT } from "../helpers/generar-jwt";


export const login = async (req: Request, res: Response) => {
    const {correo, password} = req.body;
    try {
        const usuario = await Usuario.findOne({correo});

        if (!usuario) {
            return res.status(404).json({msg: 'Usuario y/o contraseña son incorrectos'});
        }

        if (!usuario.estado) {
            return res.status(404).json({msg: 'Usuario y/o contraseña son incorrectos'});
        }
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(404).json({msg: 'Usuario y/o contraseña son incorrectos'});
        }
        const token = await generarJWT(usuario.id)
        res.json({usuario, token})
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: 'Algo salio mal. Consulte con su Administrador'})
    }
}