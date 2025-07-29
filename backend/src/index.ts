import express from 'express';
import mainRouter from './router/index';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1', mainRouter); 

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});