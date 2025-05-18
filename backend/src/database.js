import pkg from "pg"
import dotenv from "dotenv"

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT || 5432,
})

async function dbConnect() {
    try {
        await pool.connect();
        console.log("Conexão com banco de dados realizada com sucesso!");
    } catch (error) {
        console.log("Erro na conexão do banco de dados. Erro: " + error.stack);
    }
}


export { dbConnect, pool };