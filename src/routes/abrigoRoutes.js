import { Router } from 'express';
import { AbrigoController } from '../controllers/AbrigoController.js';

const router = Router();

// Define as rotas (endpoints) para o recurso de 'abrigos'
router.get('/', AbrigoController.listarAbrigos);
router.get('/:id', AbrigoController.buscarAbrigoPorId);
router.post('/', AbrigoController.criarAbrigo);
router.put('/:id', AbrigoController.atualizarAbrigo);
router.delete('/:id', AbrigoController.deletarAbrigo);

export default router;