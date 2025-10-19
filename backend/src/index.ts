import express from 'express';
import cors from 'cors';
import router from './routes/router';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.config';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.use('/api', router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT} | ${new Date()}`);
});
