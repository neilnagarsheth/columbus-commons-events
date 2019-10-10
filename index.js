import express from 'express';
const app = express();

import { readByRequest } from './events-service';
import { PORT } from './config';

app.listen(PORT, () => console.log(`Running app listening on port ${PORT}`));

app.get('/events', async (req, res) => {
  try {
    const events = await readByRequest(req.query.when);
    res.json(events);
  } catch(err) {
    res.status(400);
    res.send({error: err.message});
  }
});


