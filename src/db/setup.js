import { pool } from '../config/database.js';

async function setupDatabase() {
    console.log('Iniciando configuração do banco de dados...');
    
    // Tabela abrigos com os campos em português
    const criarTabelaQuery = `
        CREATE TABLE IF NOT EXISTS abrigos (
            id SERIAL PRIMARY KEY,
            nome VARCHAR(255) NOT NULL,
            estado VARCHAR(50) NOT NULL,
            cidade VARCHAR(100) NOT NULL,
            endereco TEXT NOT NULL,
            contato VARCHAR(50),
            capacidade INTEGER NOT NULL,
            ocupacao INTEGER DEFAULT 0,
            status VARCHAR(50) DEFAULT 'Disponivel',
            criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

    try {
        await pool.query(criarTabelaQuery);
        console.log('Tabela "abrigos" criada/verificada com sucesso!');

        // Verifica se a tabela já possui dados
        const verificaDados = await pool.query('SELECT COUNT(*) FROM abrigos');
        
        if (parseInt(verificaDados.rows[0].count) === 0) {
            console.log('Inserindo dados de teste (Abrigamentos falsos)...');
            const insertQuery = `
                INSERT INTO abrigos (nome, estado, cidade, endereco, contato, capacidade, ocupacao, status)
                VALUES 
                ('Ginásio Municipal', 'PA', 'Belém', 'Av. Brasil, 1000', '(91) 98000-0000', 200, 160, 'Disponivel'),
                ('Escola Estadual Centro', 'PA', 'Belém', 'Rua das Flores, 500', '(91) 98111-1111', 100, 100, 'Lotado')
            `;
            await pool.query(insertQuery);
            console.log('Dados de teste inseridos com sucesso!');
        } else {
            console.log('A tabela já contém dados. Nenhuma inserção teste foi feita.');
        }
        
    } catch (error) {
        console.error('Erro ao configurar banco de dados:', error);
    } finally {
        await pool.end();
        console.log('Conexão encerrada.');
    }
}

setupDatabase();
