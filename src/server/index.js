import express from 'express';

import './config';
import renderer from './renderer';

const app = express();

const port = process.env.PORT || 4000;

app.use(express.static('dist'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('*', (req, res) => {
  const content = renderer(req);
  res.send(content);
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
