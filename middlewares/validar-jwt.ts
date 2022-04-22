import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { IPayload } from "../interfaces/payload";
import Usuario from "../models/usuario";
import { IUsuarioRequest } from "./usuario-request";

export const validarJWT = async (req: IUsuarioRequest, res: Response, next: NextFunction) => {
    const token = req.header('x-token');
    // console.log(token);
    if (!token) {
        return res.status(401).json({ msg: 'no Hay token en la peticion' })
    }

    try {
        const { uid } = jwt.verify(token, `Est03sMyPub1icK3y23@`) as IPayload;
        const usuario = await Usuario.findById(uid);
        if(!usuario){
            return res.status(401).json({ msg: 'token no valido' })
        }
        if(!usuario.estado) {
            return res.status(401).json({ msg: 'token no valido' })
        }
        req.usuario = usuario;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ msg: 'token no valido' })
    }

}