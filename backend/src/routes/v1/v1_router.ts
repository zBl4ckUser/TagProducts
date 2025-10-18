import { Router, Request, Response } from 'express';
import { getProducts, createProduct, importProducts } from '../../controller/produto.controller';
import { apiKeyMiddleware } from '../../middlewares/auth.middleware';
import upload from '../../config/multer.config';

const v1_router = Router();

/**
 * @swagger
 * /api/v1/up:
 *   get:
 *     summary: Check if the server is up and running
 *     responses:
 *       200:
 *         description: Server is up
 */
v1_router.get('/up', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Everything is up and running!' });
});

/**
 * @swagger
 * /api/v1/produtos:
 *   get:
 *     summary: Get all products
 *     parameters:
 *       - in: header
 *         name: x-api-key
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of products
 *       401:
 *         description: Unauthorized
 */
v1_router.get('/produtos', apiKeyMiddleware, getProducts);

/**
 * @swagger
 * /api/v1/produtos:
 *   post:
 *     summary: Create a new product
 *     parameters:
 *       - in: header
 *         name: x-api-key
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome: 
 *                 type: string
 *               preco:
 *                 type: number
 *               descricao:
 *                 type: string
 *               imagem:
 *                 type: string
 *     responses:
 *       200:
 *         description: The created product
 *       401:
 *         description: Unauthorized
 *       422:
 *         description: Validation error
 */
v1_router.post('/produtos', apiKeyMiddleware, createProduct);

/**
 * @swagger
 * /api/v1/produtos/importacao:
 *   post:
 *     summary: Import products from a CSV file
 *     parameters:
 *       - in: header
 *         name: x-api-key
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Products imported successfully
 *       400:
 *         description: Invalid file format or size
 *       401:
 *         description: Unauthorized
 *       422:
 *         description: Validation error in CSV rows
 */
v1_router.post('/produtos/importacao', apiKeyMiddleware, upload.single('file'), importProducts);

export default v1_router;
