
import express from "express";
import { listarAlumnos } from "../controllers/alumno.controller";


const router = express.Router();
router.get("/", listarAlumnos);
export default router;