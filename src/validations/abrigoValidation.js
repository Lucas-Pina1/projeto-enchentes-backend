import Joi from 'joi';

export const abrigoSchema = Joi.object({
  nome: Joi.string().trim().required().messages({
    'string.empty': 'O nome é obrigatório.',
    'any.required': 'O nome é obrigatório.'
  }),
  estado: Joi.string().trim().length(2).required().messages({
    'string.empty': 'O estado é obrigatório.',
    'string.length': 'O estado deve ter exatamente 2 caracteres (Sigla).',
    'any.required': 'O estado é obrigatório.'
  }),
  cidade: Joi.string().trim().required().messages({
    'string.empty': 'A cidade é obrigatória.',
    'any.required': 'A cidade é obrigatória.'
  }),
  endereco: Joi.string().trim().required().messages({
    'string.empty': 'O endereço é obrigatório.',
    'any.required': 'O endereço é obrigatório.'
  }),
  capacidade: Joi.number().integer().min(1).required().messages({
    'number.base': 'A capacidade deve ser um número.',
    'number.integer': 'A capacidade deve ser um número inteiro.',
    'number.min': 'A capacidade deve ser pelo menos 1.',
    'any.required': 'A capacidade é obrigatória.'
  }),
  ocupacao: Joi.number().integer().min(0).optional().messages({
    'number.base': 'A ocupação deve ser um número.',
    'number.integer': 'A ocupação deve ser um número inteiro.',
    'number.min': 'A ocupação não pode ser negativa.'
  }),
  status: Joi.string().trim().valid('Disponivel', 'Lotado', 'Inativo').optional().messages({
    'any.only': 'O status deve ser: Disponivel, Lotado ou Inativo.'
  }),
  contato: Joi.string().trim().pattern(/^\(?[1-9]{2}\)? ?(?:[2-8]|9[0-9])[0-9]{3}\-?[0-9]{4}$/).required().messages({
    'string.empty': 'O contato é obrigatório.',
    'string.pattern.base': 'O contato deve ser um número de telefone válido com DDD (ex: 11999999999 ou 1133333333).',
    'any.required': 'O contato é obrigatório.'
  })
});

export const idSchema = Joi.object({
  id: Joi.number().integer().positive().required().messages({
    'number.base': 'O ID deve ser um número.',
    'number.integer': 'O ID deve ser um número inteiro.',
    'number.positive': 'O ID deve ser um número positivo.',
    'any.required': 'O ID é obrigatório.'
  })
});
