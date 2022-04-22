import usuario from "../models/usuario";
import Role from "../models/role";


export const existUsuario = async (id: string) => {
    const existeUsuario = await usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El ID no existe: ${id}`)
    }
}

export const existEmail = async (correo: string) => {
    const existeEmail = await usuario.findOne({correo});
    if (existeEmail) {
        throw new Error(`El correo: ${correo} ya existe en la base de datos`)
    }
}

export const esRoleValido = async (role: string) => {
    const existeUsuario = await Role.findOne({role});
    if (!existeUsuario) {
        throw new Error(`El role: ${role} no existe en la base de datos`);
    }
}