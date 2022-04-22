import { NextFunction, Request, Response } from 'express';
import {validationResult, Result} from 'express-validator';


export const validarCampos = (req:Request, res:Response, next:NextFunction) => {
    const error = validationResult(req);
    if(!error.isEmpty()) {
        return res.status(400).json(error)
    }
    next();
}