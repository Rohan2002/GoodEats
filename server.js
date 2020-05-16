const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');

const app = express();
const router = require('./routes/index');

app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(cors());
app.use(logger('dev'));

app.get('/', (req, res) => {
  res.send('Everything workin!').status(200);
});

app.use('/api', router);
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(8080, (err) => {
  if (err) {
    console.error(err);
  }
  console.log('server ready at port 8080!');
});
