import express, { Application } from 'express';
import cors from 'cors';
import router from '../routes/usuarios';

class Server {
    private app: Application;
    private port: string;
    private appRoutes: any = {};

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8000';
        this.appRoutes = {
            usuarios: '/api/usuarios'
        }
        this.middlewares()
        this.routes()
    }

    middlewares(){
        this.app.use(express.json())
        this.app.use(cors())
    }

    routes(){
        this.app.use(this.appRoutes.usuarios, router)
    }

    listen() {
        this.app.listen(this.port, () => console.log(`Servidor corriendo en el puerto ${this.port}`));
    }
}

export default Server;