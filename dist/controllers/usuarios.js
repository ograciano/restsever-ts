"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsuario = exports.putUsuario = exports.postUsuario = exports.getUsuario = exports.getUsuarios = void 0;
const getUsuarios = (req, res) => {
    res.json({ msg: 'getusuarios listo' });
};
exports.getUsuarios = getUsuarios;
const getUsuario = (req, res) => {
    const { id } = req.params;
    res.json({ id, msg: 'getusuario listo' });
};
exports.getUsuario = getUsuario;
const postUsuario = (req, res) => {
    const body = req.body;
    res.json({ body, msg: 'postusuario listo' });
};
exports.postUsuario = postUsuario;
const putUsuario = (req, res) => {
    const { id } = req.params;
    const body = req.body;
    res.json({ id, body, msg: 'putusuario listo' });
};
exports.putUsuario = putUsuario;
const deleteUsuario = (req, res) => {
    const { id } = req.params;
    res.json({ id, msg: 'deleteusuarios listo' });
};
exports.deleteUsuario = deleteUsuario;
//# sourceMappingURL=usuarios.js.map