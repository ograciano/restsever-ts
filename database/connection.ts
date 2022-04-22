import mongoose from "mongoose";
import "dotenv/config";
import { Sequelize } from "sequelize";

export const mongoConn = async () => {
    try {
        await mongoose.connect(`mongodb://localhost:27017/cafeDB`);
        console.log('Base de datos mongo online');
    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar la base de datos');
    }
}

export const mysqlConn = new Sequelize('curso_node', 'root', 'Supp0rt!', {
    host: 'localhost',
    dialect: 'mysql',
    // logging: false
})