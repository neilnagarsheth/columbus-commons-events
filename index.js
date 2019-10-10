import express from 'express';
import bodyParser from 'body-parser';
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

import { readByRequest } from './events-service';
import { verifySignatureFromRequest } from './slack-service/auth';
import { readByCommandRequest } from './slack-service';
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

app.post('/events/slack/command', async(req, res) => {
  try {
    verifySignatureFromRequest(req);
    const slackResponse = await readByCommandRequest(req.body);
    res.json(slackResponse);
  } catch(err) {
    res.status(400);
    res.json(err);
  }
});


