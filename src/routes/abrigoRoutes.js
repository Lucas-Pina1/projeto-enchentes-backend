import { Router } from 'express';
import { AbrigoController } from '../controllers/AbrigoController.js';

const router = Router();

// Quando alguém acessar "GET /", o Controlador vai executar a função listarAbrigos
router.get('/', AbrigoController.listarAbrigos);

export default router;