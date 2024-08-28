import db from '../config/db.js';

// Crear tabla si no existe
const initTable = async () => {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE
            )
        `);
    } catch (error) {
        console.error("Error al crear la tabla:", error);
        throw error;
    }
};

// Crear un usuario
const createUser = async (username, password, email) => {
    try {
        const [result] = await db.query("INSERT INTO users (username, password, email) VALUES (?, ?, ?)", [username, password, email]);
        console.log("Resultado de la inserción:", result);
        return result.insertId;
    } catch (error) {
        console.error("Error al crear usuario:", error);    
        throw error;
    }
};

// Leer usuarios
const getUsers = async () => {
    try {
        const rows = await db.query("SELECT * FROM users");
        return rows;
    } catch (error) {
        console.error("Error al consultar los usuarios:", error);
        throw error;
    }
};

// Actualizar un usuario
const updateUser = async (id, username, password, email) => {
    try {
        await db.query("UPDATE users SET username = ?, password = ?, email = ? WHERE id = ?", [username, password, email, id]);
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        throw error;
    }
};

// Eliminar un usuario
const deleteUser = async (id) => {
    try {
        await db.query("DELETE FROM users WHERE id = ?", [id]);
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        throw error;
    }
};

export default {
    initTable,
    createUser,
    getUsers,
    updateUser,
    deleteUser
};
