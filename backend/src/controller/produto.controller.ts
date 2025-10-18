import { Request, Response } from 'express';
import client from '../config/db.initializer';
import { productSchema } from '../schemas/produto.schema';
import csv from 'csv-parser';
import { Readable } from 'stream';

const getProducts = async (req: Request, res: Response) => {
  try {
    // Delay de 3 segundos
    await new Promise(resolve => setTimeout(resolve, 3000));

    const products = await client.produto.findMany();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: `${error || 'Internal server error'}` });
  }
};

const createProduct = async (req: Request, res: Response) => {
  try {
    // Delay de 3 segundos
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Valida o req.body de acordo com o schema Zod de Produto
    const validation = productSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(422).json({ erros: validation.error.issues.map(e => e.message) });
    }

    const { nome, preco, descricao, imagem } = validation.data;

    if (imagem) {
      // Faz p decode da imagem de base64 para um objeto Buffer em memória
      const imageSize = Buffer.from(imagem, 'base64').length;
      if (imageSize > 2 * 1024 * 1024) { // 2MB
        return res.status(422).json({ erros: ['Imagem maior que 2MB'] });
      }
    }

    const product = await client.produto.create({
      data: {
        nome,
        preco,
        descricao,
        imagem,
      },
    });

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: `${error || 'Internal server error'}` });
  }
};

const importProducts = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ erros: ['Nenhum arquivo enviado'] });
    }

    const results: any[] = [];
    const errors: string[] = [];
    let line = 1;

    const readable = new Readable();
    readable._read = () => {};
    readable.push(req.file.buffer);
    readable.push(null);

    readable
      .pipe(csv())
      .on('data', (data) => {
        line++;
        const validation = productSchema.safeParse({
          ...data,
          preco: Number(data.preco),
        });

        if (!validation.success) {
          errors.push(`Erro na linha ${line}: ${validation.error.issues.map(e => e.path).join(', ')}`);
        } else {
          results.push(validation.data);
        }
      })
      .on('end', async () => {
        if (errors.length > 0) {
          return res.status(422).json({ erros: errors });
        }

        try {
          await client.produto.createMany({ data: results });
          return res.status(200).send();
        } catch (error) {
          return res.status(500).json({ message: `${error || 'Internal server error'}` });
        }
      });
  } catch (error) {
    return res.status(500).json({ message: `${error || 'Internal server error'}` });
  }
};

export { getProducts, createProduct, importProducts };