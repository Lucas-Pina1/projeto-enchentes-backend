// Por enquanto, vamos criar uma lista falsa de abrigos aqui mesmo.
// Mais tarde, o nosso Model vai buscar isso do PostgreSQL!
const abrigosMock = [
  { id: 1, nome: "Ginásio Municipal", estado: "PA", cidade: "Belém", endereço: "Av. Brasil, 1000", capacidade: 200, ocupacao: 160, status: "Disponivel" },
  { id: 2, nome: "Escola Estadual Centro", estado: "PA", cidade: "Belém", endereço: "Rua das Flores, 500", capacidade: 100, ocupacao: 100, status: "Lotado" },
];

export class AbrigoController {
  // Método para listar todos os abrigos
  static listarAbrigos(req, res) {
    // O res.status(200) significa "OK, deu tudo certo"
    // O .json() envia a nossa lista no formato que o Front-end entende
    return res.status(200).json(abrigosMock);
  }
}
