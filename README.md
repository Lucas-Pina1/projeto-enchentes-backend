# Projeto Enchentes - Sistema de Gerenciamento de Abrigos (Back-end)

🔗 **Link da API em Produção:** [https://projeto-enchentes-backend.onrender.com](https://projeto-enchentes-backend.onrender.com/abrigos)

## 1 - Apresentação da Ideia

Esse projeto surgiu a partir do desafio sobre enchentes no Brasil proporcionado pelo Vai na Web. Pensando no cenário crítico de calamidade e perda de lares, o foco foi resolver o problema da **falta de informação centralizada sobre abrigos**. O objetivo é criar um sistema que unifica e organiza essas informações de forma confiável e em tempo real.

## 2 - Solução Proposta

Foi desenvolvida uma API REST em Node.js para atuar como o gerenciador central de abrigos. A API permite que voluntários, ONGs e equipes de resgate possam:
- Listar abrigos disponíveis.
- Registrar novos abrigos com validação estrita.
- Atualizar a ocupação e o status (Disponível/Lotado).

A população, por meio da aplicação web (Front-end), consome esses dados para encontrar locais seguros rapidamente.

## 3 - O Que Foi Feito (Atualizações Recentes)

- **Deploy na Nuvem:** A API foi hospedada de forma gratuita no **Render**, juntamente com um banco de dados **PostgreSQL** em produção.
- **Script de Setup Automático:** Criação de um script (`npm run setup`) integrado ao `package.json` para criar as tabelas e inserir dados mockados de forma automatizada e segura (utilizando `IF NOT EXISTS`) durante o processo de deploy.
- **Validação de Dados:** Implementação de regras de negócio e sanitização utilizando a biblioteca `Joi`. Garante a integridade de dados críticos como formato de telefone (DDD) e consistência na capacidade dos abrigos.
- **CORS e SSL:** Configuração de SSL para o banco de dados e liberação de CORS para permitir a comunicação contínua e segura com o Front-end.

## 4 - Estrutura do Sistema e Tecnologias

- **Node.js** e **Express**: Construção do servidor e rotas HTTP.
- **PostgreSQL**: Banco de dados relacional para persistência segura.
- **pg**: Driver oficial de conexão com o banco.
- **Joi**: Camada de validação de esquemas (Schema Validation).
- **Cors & Dotenv**: Segurança e controle de variáveis de ambiente.
- **Postman**: Documentação e teste de rotas (`projeto-enchentes.postman_collection.json`).

***

## 5 - Como Rodar o Projeto Localmente

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Configure o Banco de Dados:**
   - Crie um arquivo `.env` na raiz do projeto.
   - Adicione sua string de conexão (pode ser a External URL do Render ou um banco local):
     ```env
     DATABASE_URL=postgresql://usuario:senha@host:5432/banco
     PORT=3000
     ```

3. **Inicialize as Tabelas:**
   ```bash
   npm run setup
   ```

4. **Inicie o Servidor:**
   ```bash
   npm run dev
   ```

***

## 6 - Documentação Visual da API (Postman)

Para facilitar o entendimento das rotas, os formatos de requisição e os retornos esperados, a documentação completa da API foi exportada.

1. Baixe o aplicativo ou acesse a versão web do **[Postman](https://www.postman.com/)**.
2. Clique no botão **"Import"** (no canto superior esquerdo).
3. Selecione ou arraste o arquivo `projeto-enchentes.postman_collection.json` localizado na raiz deste projeto.
4. A coleção **"Projeto Enchentes API"** aparecerá na sua aba lateral de *Collections*.
5. **Para visualizar de forma rica e detalhada:** Clique em cima do nome da coleção recém-importada e, no painel central/direito, clique no ícone de documento ou na aba **"Documentation"** (View complete documentation).
6. O Postman irá gerar uma página visual completa, apresentando exemplos de JSON, rotas detalhadas e descrições para cada endpoint da aplicação.

***
> O projeto prioriza servir rapidamente informações atualizadas que salvam vidas, garantindo estabilidade e fácil manutenibilidade na camada do servidor.
