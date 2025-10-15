import express from 'express';
import router from './routes/router';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT} | ${new Date()}`);
});
