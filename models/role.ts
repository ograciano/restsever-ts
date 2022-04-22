import {Schema, model} from 'mongoose';
import { IRole } from '../interfaces/role';

const RoleSchema = new Schema<IRole>({
    role: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    }
})

export default model<IRole>('Role', RoleSchema);