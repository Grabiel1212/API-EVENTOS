import { Request, Response } from 'express';
import * as alumnoService from '../services/alumno.service';




export const listarAlumnos = async (req: Request, res: Response) => {
        console.log("alumno.controller.ts: listarAlumnos");
    try {
        // Simulate fetching data from a database
        const response = await alumnoService.listarAlumnos();

        // Send the list of students as a response
        res.status(200).json(response);
    }catch (error) {
        console.error("Error al listar alumnos:", error);
        res.status(500).json({ message: "Error al listar alumnos" });
    }



}