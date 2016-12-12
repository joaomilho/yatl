import express from 'express';
import bodyParser from 'body-parser';
import logger from './helpers/logger';
import errorHandler from './helpers/errorHandler';
import api from './api'
import path from 'path'

express()
  .use('/static', express.static('static'))
  .use(bodyParser.json())
  .use(logger)
  .use('/api', api)
  .get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')))
  .get('/notes/:id', (req, res) => res.type('html').send('TODO'))
  .use(errorHandler)
  .listen(3000, 'localhost', () => console.log('API listening at http://localhost:3000'));
