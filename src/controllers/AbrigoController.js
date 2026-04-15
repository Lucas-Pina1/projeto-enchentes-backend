import { pool } from '../config/database.js';

export class AbrigoController {
  
  // GET /abrigos
  static async listarAbrigos(req, res) {
    try {
      const result = await pool.query('SELECT * FROM abrigos ORDER BY criado_em DESC');
      return res.status(200).json(result.rows);
    } catch (error) {
      console.error('Erro ao listar abrigos:', error);
      return res.status(500).json({ error: 'Erro interno ao tentar listar abrigos.' });
    }
  }

  // GET /abrigos/:id
  static async buscarAbrigoPorId(req, res) {
    try {
      const { id } = req.params;
      const result = await pool.query('SELECT * FROM abrigos WHERE id = $1', [id]);
      
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Abrigo não encontrado.' });
      }
      
      return res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error('Erro ao buscar abrigo:', error);
      return res.status(500).json({ error: 'Erro interno ao tentar buscar o abrigo.' });
    }
  }

  // POST /abrigos
  static async criarAbrigo(req, res) {
    try {
      const { nome, estado, cidade, endereco, capacidade, ocupacao, status, contato } = req.body;
      
      // Validação Back-end de campos obrigatórios
      if (!nome || !estado || !cidade || !endereco || !capacidade || !contato) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios. (Nome, estado, cidade, endereço, capacidade, contato)' });
      }

      const query = `
        INSERT INTO abrigos (nome, estado, cidade, endereco, capacidade, ocupacao, status, contato)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *
      `;
      const values = [nome, estado, cidade, endereco, capacidade, ocupacao || 0, status || 'Disponivel', contato];
      
      const result = await pool.query(query, values);
      return res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Erro ao criar abrigo:', error);
      return res.status(500).json({ error: 'Erro interno ao tentar criar abrigo.' });
    }
  }

  // PUT /abrigos/:id
  static async atualizarAbrigo(req, res) {
    try {
      const { id } = req.params;
      const { nome, estado, cidade, endereco, capacidade, ocupacao, status, contato } = req.body;

      if (!nome || !estado || !cidade || !endereco || !capacidade || !contato) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
      }

      // Verifica se existe
      const abrigoExiste = await pool.query('SELECT * FROM abrigos WHERE id = $1', [id]);
      if (abrigoExiste.rows.length === 0) {
        return res.status(404).json({ error: 'Abrigo não encontrado para atualizar.' });
      }

      const query = `
        UPDATE abrigos
        SET nome = $1, estado = $2, cidade = $3, endereco = $4, capacidade = $5, ocupacao = $6, status = $7, contato = $9, atualizado_em = CURRENT_TIMESTAMP
        WHERE id = $8
        RETURNING *
      `;
      const values = [nome, estado, cidade, endereco, capacidade, ocupacao, status, id, contato];
      
      const result = await pool.query(query, values);
      return res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error('Erro ao atualizar abrigo:', error);
      return res.status(500).json({ error: 'Erro interno ao tentar atualizar abrigo.' });
    }
  }

  // DELETE /abrigos/:id
  static async deletarAbrigo(req, res) {
    try {
      const { id } = req.params;

      const abrigoExiste = await pool.query('SELECT * FROM abrigos WHERE id = $1', [id]);
      if (abrigoExiste.rows.length === 0) {
        return res.status(404).json({ error: 'Abrigo não encontrado para deletar.' });
      }

      await pool.query('DELETE FROM abrigos WHERE id = $1', [id]);
      return res.status(200).json({ message: 'Abrigo deletado com sucesso.' });
    } catch (error) {
      console.error('Erro ao deletar abrigo:', error);
      return res.status(500).json({ error: 'Erro interno ao tentar deletar abrigo.' });
    }
  }
}
