const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const router = require("./taskRoutes")
const { dbConnect } = require("./database")

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