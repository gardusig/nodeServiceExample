import express from 'express';
import mainController from './controller/mainController';

const app = express();
const port = process.env.PORT || 3000;

app.use('/', mainController);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
