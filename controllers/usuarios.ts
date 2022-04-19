import { Request, Response } from "express";

export const getUsuarios = (req: Request, res: Response) => {
    res.json({msg: 'getusuarios listo'});
}
export const getUsuario = (req: Request, res: Response) => {
    const {id} = req.params
    res.json({id, msg: 'getusuario listo'});
}
export const postUsuario = (req: Request, res: Response) => {
    const body = req.body;
    res.json({body, msg: 'postusuario listo'});
}
export const putUsuario = (req: Request, res: Response) => {
    const {id} = req.params
    const body = req.body;
    res.json({id, body, msg: 'putusuario listo'});
}
export const deleteUsuario = (req: Request, res: Response) => {
    const {id} = req.params
    res.json({id, msg: 'deleteusuarios listo'});
}