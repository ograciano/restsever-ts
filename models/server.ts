import express, { Application } from 'express';
import cors from 'cors';
import 'dotenv/config';
import { mongoConn, mysqlConn } from '../database/connection';
import routerAuth from '../routes/auth';
import routerUsuarios from '../routes/usuarios';

class Server {
    private app: Application;
    private port: string;
    private appRoutes: any = {};

    constructor(){
        this.app = express();
        this.port = '8080';
        this.appRoutes = {
            auth: '/api/auth',
            usuarios: '/api/usuarios'
        }
        // middlewares
        this.middlewares()
        // Rutas
        this.routes()
        //bases de datos
        this.mongoConection();
        this.sqlConnection()
    }

    middlewares(){
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(express.static('public'));
    }

    async mongoConection(){
        await mongoConn();
    }

    async sqlConnection() {
        try {
            await mysqlConn.authenticate();
            console.log('Base de datos mysql online');
        } catch (error) {
            console.log(error);
            throw new Error();

        }
    }

    routes(){
        this.app.use(this.appRoutes.usuarios, routerUsuarios)
        this.app.use(this.appRoutes.auth, routerAuth)
    }

    listen() {
        this.app.listen(this.port, () => console.log(`Servidor corriendo en el puerto ${this.port}`));
    }
}

export default Server;