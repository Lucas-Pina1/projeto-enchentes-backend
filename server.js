import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Nosso servidor de Enchentes está online!");
});

const PORTA = 3000;
app.listen(PORTA, () => {
  console.log(`Servidor rodando com sucesso na porta ${PORTA}`);
});
