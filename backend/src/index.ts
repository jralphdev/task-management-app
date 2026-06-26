import express from 'express';
import { ENV } from './config/env.js';

const app = express();
const PORT = ENV.PORT;

app.use(express.json());

app.get('/', (_, res) => res.send('Hello World!'));

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
