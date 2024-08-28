import express from 'express';
import bcrypt from 'bcrypt'; 
import model from '../models/model.js'

const router = express.Router();

// Ruta para GET /
router.get('/', (req, res) => {
    res.send('¡Hola, Mundo!'); 
});


// Inicializar la tabla
router.get("/init", async (req, res) => {
    try {
        await model.initTable();
        res.send("Tabla 'users' creada");
    } catch (error) {
        res.status(500).send("Error al crear la tabla.");
    }
});

// Crear un usuario
router.post("/users", async (req, res) => {
    try {
        const { username, password, email } = req.body;
        console.log("Datos recibidos:", { username, password, email });
        const hashedPassword = await bcrypt.hash(password, 10);
        await model.createUser(username, hashedPassword, email);
        console.log("Usuario creado exitosamente");
        res.send("Usuario creado");
    } catch (error) {
        console.error("Error al manejar la petición de creación de usuario:", error);
        res.status(500).send("Error al crear usuario.");
    }
});

// Leer usuarios
router.get("/users", async (req, res) => {
    try {
        const users = await model.getUsers();
        res.json(users);
    } catch (error) {
        res.status(500).send("Error al consultar los usuarios.");
    }
});

// Actualizar un usuario
router.put("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { username, password, email } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await model.updateUser(id, username, hashedPassword, email);
        res.send("Usuario actualizado");
    } catch (error) {
        res.status(500).send("Error al actualizar usuario.");
    }
});

// Eliminar un usuario
router.delete("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await model.deleteUser(id);
        res.send("Usuario eliminado");
    } catch (error) {
        res.status(500).send("Error al eliminar usuario.");
    }
});

export default router;