import express from "express";
import practica3Routes from "./route/practica3.rooute.js";
import { connectaAlMonguito } from "./config/database.js";
import { configCollection } from "./controller/practica3.controller.js";
import type { Collection } from "mongodb";
import type { Tebeo } from "./module/practica3.module.js";

const app = express();

app.use(express.json());

const startServer = () => {

    connectaAlMonguito().then((db) => {

        const tebeosCollection: Collection<Tebeo> = db.collection("practica3");
        configCollection(tebeosCollection);

        app.use("/tebeos", practica3Routes);

        app.listen(3001, () => {
            console.log("Api funcionando en el puerto 3001")
        })

    }).catch(() => {
        console.log("No se ha podido conectar a MongoDB")
    })

};

startServer();