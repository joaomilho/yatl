import express from 'express';
import {all, add, remove, update} from './models/note';

const ok = (fn) => (req, res) => res.sendStatus(fn(req) ? 200 : 500);

export default express()
  .get('/notes', (_, res) => res.json(all()))
  .post('/notes', (req, res) => res.json(add(req.body)))
  .delete('/notes/:id', ok(req => remove(req.params.id)))
  .put('/notes/:id', ok(req => update(req.params.id, req.body)))
