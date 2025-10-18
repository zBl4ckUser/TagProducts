import { z } from 'zod';

const productSchema = z.object({
  nome: z.string().min(3).max(50),
  preco: z.number().min(10),
  descricao: z.string().min(30).max(255),
  imagem: z.string().optional(),
});

export { productSchema };
