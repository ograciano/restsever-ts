import { Request, Response } from "express";
import bcryptjs from 'bcryptjs';
import Usuario from "../models/usuario";
import { IUsuarioRequest } from "../middlewares/usuario-request";

export const getUsuarios = async (req: Request, res: Response) => {
    const {limite = 5, desde = 0} = req.query;
    const query = { estado: true }
    try {
        const [total, usuarios] = await Promise.all([
            Usuario.countDocuments(query),
            Usuario.find(query).skip(Number(desde)).limit(Number(limite))

        ])
        res.json({total, usuarios});
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: 'Algo salio mal. Consulte con su Administrador'})
    }
}

export const getUsuario = async (req: Request, res: Response) => {
    const {id} = req.params;
    try {
        const usuario = await Usuario.findById(id);
        res.json(usuario);
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: 'Algo salio mal. Consulte con su Administrador'})
    }
}

export const postUsuario = async (req: Request, res: Response) => {
    const {nombre, correo, password, role} = req.body;
    try {
        const usuario = await new Usuario({nombre, correo, password, role});
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(password, salt);
        usuario.save();
        res.json({usuario, msg:'Usuario Creado'});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: 'Algo salio mal. Consulte con su Administrador'})
    }
}

export const putUsuario = async (req: Request, res: Response) => {
    const {id} = req.params
    const {_id, password, correo, google, ...resto} = req.body;
    try {
        if(password){
            const salt = bcryptjs.genSaltSync();
            resto.password = bcryptjs.hashSync(password, salt);
        }

        const usuario = await Usuario.findByIdAndUpdate(id, resto, {new: true});

        res.json({usuario, msg: 'Usuario Actializado'});
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: 'Algo salio mal. Consulte con su Administrador'});
    }
}

export const deleteUsuario = async (req: IUsuarioRequest, res: Response) => {
    const {uid} = req.params
    const query = {estado: false};
    try {
        const usuario = await Usuario.findByIdAndUpdate(uid, query);
        const {id} = req.usuario;
        res.json({msg: 'Usuario Elmiminado', id})
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: 'Algo salio mal. Consulte con su Administrador'});
    }
}