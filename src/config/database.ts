import "dotenv/config";
import { MongoClient } from "mongodb";
import type { Db } from "mongodb";

const client = new MongoClient("mongodb+srv://pablogomezromero06_db_user:IenqOzMiUoBxvv0Q@cluster0.fho5q9n.mongodb.net/");

export const connectaAlMonguito = (): Promise<Db> => {
    return client.connect().then(() => {
        console.log("Conectado a MongoDB");
        return client.db("clase1");
    }).catch(error => {
        console.log("Error al conectar a MongoDB");
        throw error;
    });
}