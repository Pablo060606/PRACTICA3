import type { Request, Response } from "express";
import { ObjectId, type Collection } from "mongodb";
import type { Tebeo } from "../module/practica3.module.js";

let tebeosCollection: Collection<Tebeo>;

export const configCollection = (collection: Collection<Tebeo>) => {
    tebeosCollection = collection
}


export const getTebeos = (
    req: Request,
    res: Response
) => {
    tebeosCollection.find().toArray().then((tebeos) => {
        res.status(200).json(tebeos)
    }).catch(() => {
        res.status(500).json({
            error: "Error al obtener los tebeos"
        })
    })
}


export const getTebeosID = (
    req: Request,
    res: Response
) => {
    const id = String(req.params.id);

    if (!ObjectId.isValid(id)) {
        res.status(400).json({
            error: "Identificador incorrecto"
        })
        return
    }

    tebeosCollection.findOne({
        _id: new ObjectId(id)
    }).then((result) => {
        if (!result) {
            res.status(404).json({
                error: "Tebeo no encontrado"
            })
            return
        }

        res.json({
            ...result,
            _id: result._id
        })

    }).catch((error) => {
        console.log(error)
        res.status(500).json({
            error: "Error al buscar el tebeo"
        })
    })
}


export const createTebeo = (
    req: Request,
    res: Response
) => {
    
if (!req.body) {
        res.status(400).json({
            error: "Datos incorrectos"
        })
        return
    }

    if (typeof req.body.titulo !== "string" || req.body.titulo === "") {
        res.status(400).json({
            error: "Título incorrecto"
        })
        return
    }

    if (typeof req.body.autor !== "string" || req.body.autor === "") {
        res.status(400).json({
            error: "Autor incorrecto"
        })
        return
    }

    if (typeof req.body.editorial !== "string" || req.body.editorial === "") {
        res.status(400).json({
            error: "Editorial incorrecta"
        })
        return
    }

    if (typeof req.body.numero !== "number" || req.body.numero <= 0 || req.body.numero % 1 !== 0) {
        res.status(400).json({
            error: "Número incorrecto"
        })
        return
    }

    if (typeof req.body.precio !== "number" || req.body.precio < 0) {
        res.status(400).json({
            error: "Precio incorrecto"
        })
        return
    }

    if (typeof req.body.leido !== "boolean") {
        res.status(400).json({
            error: "Leído incorrecto"
        })
        return
    }

    const nuevoTebeo: Tebeo = {
        titulo: req.body.titulo,
        autor: req.body.autor,
        editorial: req.body.editorial,
        numero: req.body.numero,
        fechaPublicacion: req.body.fechaPublicacion,
        precio: req.body.precio,
        leido: req.body.leido
    };

    tebeosCollection.insertOne(nuevoTebeo).then((result) => {
        res.status(201).json({
            ...nuevoTebeo,
            _id: result.insertedId
        })
    }).catch(() => {
        res.status(500).json({
            error: "Error al crear el tebeo"
        })
    })
}


export const deleteTebeo = (
    req: Request,
    res: Response
) => {
    const id = String(req.params.id);

    if (!ObjectId.isValid(id)) {
        res.status(400).json({
            error: "Identificador incorrecto"
        })
        return
    }

    tebeosCollection.findOneAndDelete({
        _id: new ObjectId(id)
    }).then((result) => {
        if (!result) {
            res.status(404).json({
                error: "Tebeo no encontrado"
            })
            return
        }

        res.json({
            ...result,
            _id: result._id
        })

    }).catch(() => {
        res.status(500).json({
            error: "Error al eliminar el tebeo"
        })
    })
}


export const updateTebeo = (
    req: Request,
    res: Response
) => {
    const id = String(req.params.id);

    if (!ObjectId.isValid(id)) {
        res.status(400).json({
            error: "Identificador incorrecto"
        })
        return
    }

    if (!req.body) {
        res.status(400).json({
            error: "Datos incorrectos"
        })
        return
    }

    
    if (typeof req.body.titulo !== "string" || req.body.titulo === "") {
        res.status(400).json({
            error: "Título incorrecto"
        })
        return
    }

    if (typeof req.body.autor !== "string" || req.body.autor === "") {
        res.status(400).json({
            error: "Autor incorrecto"
        })
        return
    }

    if (typeof req.body.editorial !== "string" || req.body.editorial === "") {
        res.status(400).json({
            error: "Editorial incorrecta"
        })
        return
    }

    if (typeof req.body.numero !== "number" || req.body.numero <= 0 || req.body.numero % 1 !== 0) {
        res.status(400).json({
            error: "Número incorrecto"
        })
        return
    }

    if (typeof req.body.precio !== "number" || req.body.precio < 0) {
        res.status(400).json({
            error: "Precio incorrecto"
        })
        return
    }

    if (typeof req.body.leido !== "boolean") {
        res.status(400).json({
            error: "Leído incorrecto"
        })
        return
    }

    const tebeoActualizado: Tebeo = {
        titulo: req.body.titulo,
        autor: req.body.autor,
        editorial: req.body.editorial,
        numero: req.body.numero,
        fechaPublicacion: req.body.fechaPublicacion,
        precio: req.body.precio,
        leido: req.body.leido
    };

    

    tebeosCollection.replaceOne({
        _id: new ObjectId(id)
    }, tebeoActualizado).then((result) => {
        if (result.matchedCount === 0) {
            res.status(404).json({
                error: "Tebeo no encontrado"
            })
            return
        }

        res.json({
            ...tebeoActualizado,
            _id: id
        })

    }).catch(() => {
        res.status(500).json({
            error: "Error al actualizar el tebeo"
        })
    })
}