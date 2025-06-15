const pkg = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
})

async function dbConnect() {
    try {
        await pool.connect();
        console.log("Conexão com banco de dados realizada com sucesso!");
    } catch (error) {
        if (error instanceof Error) {
            console.log("Erro na conexão do banco de dados. Erro: " + error.stack);
        } else {
            console.log("Erro inesperado. Erro: " + error);
        }
    }
}


module.exports = { dbConnect, pool };

export {}