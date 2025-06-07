


let alumnos = [
    { id: 1, nombre: "Juan", apellido: "Pérez" },
    { id: 2, nombre: "Ana", apellido: "Gómez" },
    { id: 3, nombre: "Luis", apellido: "Martínez" },
    { id: 4, nombre: "María", apellido: "López" },
    { id: 5, nombre: "Carlos", apellido: "Sánchez" }
];


export const listarAlumnos = async () => {
    console.log("alumno.service.ts: listarAlumnos");
    try {
        
        return alumnos;
    } catch (error) {
        console.error("Error al listar alumnos:", error);
        throw new Error("Error al listar alumnos");
    }
}