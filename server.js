import express from "express";
import cors from "cors";
import abrigoRoutes from "./src/routes/abrigoRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/abrigos", abrigoRoutes);

const PORTA = 3000;
app.listen(PORTA, () => {
  console.log(`Servidor rodando com sucesso na porta ${PORTA}`);
});
