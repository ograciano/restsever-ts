import { Request } from "express";


export interface IUsuarioRequest extends Request {
    usuario?: any
}