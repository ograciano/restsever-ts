import { NextFunction, Response } from "express"
import { IUsuarioRequest } from "./usuario-request"

export const tieneRole = (...roles: string[]) => {
    return (req: IUsuarioRequest, res: Response, next: NextFunction) => {
        if(!req.usuario) {
            return res.status(500).json({msg: 'Se queire verificar el role si validar el token primero'});
        }
        if(!roles.includes(req.usuario.role)) {
            return res.status(500).json({msg: `EL servicio requiere uno de estos roles: ${roles}`});
        }
        next();
    }
}