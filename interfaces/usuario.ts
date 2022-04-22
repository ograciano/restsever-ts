export interface IUsuario {
    id?: string,
    nombre: string,
    correo: string,
    password: string,
    img?: string,
    role: string,
    estado: boolean,
    google: boolean
};