import { Router } from "express";

import {
    getTebeos,
    getTebeosID,
    createTebeo,
    updateTebeo,
    deleteTebeo
} from "../controller/practica3.controller.js";

const router = Router();

router.get("/", getTebeos);

router.get("/:id", getTebeosID);

router.post("/", createTebeo);

router.put("/:id", updateTebeo);

router.delete("/:id", deleteTebeo);

export default router;