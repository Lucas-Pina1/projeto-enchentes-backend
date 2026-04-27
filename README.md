# Projeto Enchentes - Sistema de Gerenciamento de Abrigos (Back-end)
🔗 **Link da API em Produção:** [https://projeto-enchentes-backend.onrender.com](https://projeto-enchentes-backend.onrender.com/abrigos)  

🔗 **Repositório do Front-end:** [https://github.com/Lucas-Pina1/projeto-enchentes-frontend](https://github.com/Lucas-Pina1/projeto-enchentes-frontend)

🔗 **Aplicação Web (Deploy):** [https://projeto-enchentes-frontend.vercel.app](https://projeto-enchentes-frontend.vercel.app/)


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

### 4.1 - Estrutura de Pastas

```text
📁 projeto-enchentes-backend
├── 📄 server.js             # Ponto de entrada do servidor (inicia a aplicação)
├── 📄 package.json          # Dependências e scripts do projeto
├── 📁 src                   # Código-fonte principal
│   ├── 📁 config            # Configurações gerais (ex: conexão com o banco em database.js)
│   ├── 📁 controllers       # Lógica central da API (recebe requisição, processa e devolve resposta)
│   ├── 📁 db                # Scripts isolados de banco de dados (ex: setup.js para rodar no Render)
│   ├── 📁 routes            # Definição das rotas e endpoints disponíveis da API
│   └── 📁 validations       # Schemas do Joi para validação de dados antes de ir ao banco
```

### 4.2 - Arquitetura da API e Pensamento
A arquitetura do back-end segue o padrão **MVC (Model-View-Controller)** adaptado para o contexto de uma API REST, dividindo a lógica em Rotas (`routes`) e Controladores (`controllers`).
- **Motivação:** Escolhemos essa arquitetura por sua escalabilidade e separação de responsabilidades. Isso garante que a lógica de "como uma requisição chega" fique separada da lógica de "o que o sistema faz com ela", tornando o código fácil de dar manutenção. Caso queiramos adicionar novas funcionalidades no futuro (ex: "Doações" ou "Voluntários"), podemos criar novos arquivos sem bagunçar a organização do que já existe.
- **Validação Antecipada:** A camada de validação com Joi foi adicionada diretamente no Controller, bloqueando dados inválidos de entrarem no banco e poupando custos de processamento desnecessários.

### 4.3 - Modelagem do Banco de Dados (PostgreSQL)
A prioridade do banco de dados neste MVP é **rapidez, resiliência e simplicidade**.

O banco foi modelado com uma tabela única principal (`abrigos`), estruturada para buscas velozes. Em um cenário de crise climática, não podemos ter queries complexas atrasando a página. O foco é a leitura rápida.

**Estrutura da Tabela `abrigos`**:
- `id` (SERIAL PRIMARY KEY): Identificador único do abrigo.
- `nome` (VARCHAR): Nome do local (ex: "Ginásio Municipal").
- `estado` e `cidade` (VARCHAR): Isolados do endereço completo para permitir filtros nativos rápidos no Front-end por localização.
- `endereco` e `contato` (VARCHAR): Informações textuais.
- `capacidade` e `ocupacao` (INTEGER): Dois campos numéricos vitais. O Controller implementa travas para que a ocupação não exceda a capacidade do local.
- `status` (VARCHAR): Um campo que guarda `'Disponivel'` ou `'Lotado'`. Embora o status possa ser calculado pelo Back-end comparando a ocupação e a capacidade, optou-se por salvar esse valor estático no banco para baratear pesquisas simples de voluntários buscando abrigos vagos ("WHERE status = 'Disponivel'").
- `created_at` (TIMESTAMP): Data de registro.

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
