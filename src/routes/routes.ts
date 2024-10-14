import { Application } from "express"; 
import generoRoutes from "./genero.routes";
import filmeRoutes from "./filme.routes";

// Concetrador de rotas

export default class Routs{
    constructor(app: Application){
        app.use("/locadoraFAP", generoRoutes);
        app.use("/locadoraFAP", filmeRoutes);
    }
}