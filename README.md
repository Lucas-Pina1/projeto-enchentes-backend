# Projeto Enchentes - Sistema de Gerenciamento de Abrigos

## 1 - Apresentação da Ideia

Esse é o meu projeto. A ideia surgiu a partir do desafio sobre enchentes no Brasil proporcionado pelo Vai na Web. Pensando nesse cenário crítico e desolador de calamidade e perda repentina de lares por milhares de pessoas, decidi focar no problema da **falta de informação sobre abrigos**, buscando criar um sistema que unifica e organiza essas informações de forma confiável.

## 2 - Problema Escolhido

**Caso 1: Falta de Informação sobre Abrigos.** 
Durante enchentes, encontrar um e deslocar-se para um abrigo seguro torna-se uma corrida contra o tempo, muitas vezes frustrada pela desinformação e lotação desconhecida. Pessoas afetadas e voluntários precisam de um meio ágil para consultar para onde seguir com segurança sem agravar o risco das famílias.

## 3 - Solução Proposta

Desenvolvi o back-end para um sistema chamado "Projeto Enchentes: Gerenciador de Abrigos". A ideia geral do sistema é prover uma API REST (Application Programming Interface) padronizada onde voluntários, organizações não-governamentais (ONGs) e equipes de resgate podem registrar, atualizar vagas, e deletar abrigos, e a população possa, por meio de uma aplicação web, listar e encontrar abrigos com capacidade disponível em sua cidade.

## 4 - Estrutura do Sistema

O projeto foi organizado para facilitar a manutenabilidade, priorizando a divisão de responsabilidades. O back-end é estruturado da seguinte forma:

### Back-end
Desenvolvido em **Node.js** e **Express**, utilizando a arquitetura Model-View-Controller (MVC adaptada para API).
- **`server.js`**: Ponto central da aplicação, inicializa o servidor de rotas, middlewares de CORS e tratamento JSON.
- **`src/config/database.js`**: Centraliza a responsabilidade da conexão com o banco de dados via Pool para suportar alto tráfego.
- **`src/routes/abrigoRoutes.js`**: Mapeia todas as requisições HTTP (GET, POST, PUT, DELETE) voltadas aos abrigos.
- **`src/controllers/AbrigoController.js`**: Contém a lógica de negócio principal do CRUD e consultas SQL.

### Banco de Dados
Foi utilizado o **PostgreSQL**, sendo estruturado com foco em simplicidade para armazenamento e rápida leitura e busca.
- Tabela `abrigos` armazenando: nome, estado, cidade, endereco, capacidade máxima, ocupação atual e status (ex: Total, Disponivel).
- Um script de configuração automatizado incluído (`src/db/setup.js`) que prepara a tabela e introduz dados "mock" de testes.

### Tecnologias e Ferramentas
- NodeJS e Express para robustez;
- `pg` como driver e query builder do postgres;
- `dotenv` para proteção de credenciais localmente;
- `cors` que permite a conexão entre front-end e aplicação futuramente;
- O arquivo `projeto-enchentes.postman_collection.json` pode ser diretamente importado no Postman para o envio e teste de todas as requisições prontas na aplicação.

***

## 5 - Como Rodar o Projeto

Caso você tenha clonado o repositório, siga o passo a passo abaixo para rodar o Back-end localmente:

1. **Instale as dependências**
   Abra o terminal na pasta raiz (`projeto-enchentes-backend`) e execute:
   ```bash
   npm install
   ```

2. **Configure o Banco de Dados (PostgreSQL)**
   - Crie um banco de dados vazio no seu PostgreSQL (ex: `db_abrigos`).
   - Na raiz do projeto, crie um arquivo chamado `.env`.
   - Adicione sua string de conexão e a porta, substituindo com seus dados:
     ```env
     DATABASE_URL=postgresql://seu_usuario:sua_senha@localhost:5432/nome_do_banco
     PORT=3000
     ```

3. **Inicialize as Tabelas**
   Rode o script automático para criar a tabela `abrigos` no seu banco de dados:
   ```bash
   node src/db/setup.js
   ```

4. **Inicie o Servidor**
   ```bash
   npm run dev
   ```
   *O servidor estará escutando na porta configurada (ex: `http://localhost:3000`). Se quiser rodar a interface (Front-end), inicie o Vite na respectiva pasta que se conectará automaticamente a este servidor.*

***

> **Observação Final:** O projeto prioriza servir rapidamente informações atualizadas que salvam vidas, garantindo clareza por trás da camada do servidor.
