import express from "express"
import dotenv from "dotenv";
import cors from "cors"
import router from "./taskRoutes.js"
import { dbConnect } from "./database.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET","POST","PUT","DELETE"]
}))
app.use("/tarefas", router);

dbConnect();

app.listen(PORT, () => {
    console.log("Servidor rodando na porta " + PORT)
})