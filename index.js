const express = require('express');
const passport = require('passport');
const cors = require('cors');
const routerApi = require('./routes');
const { checkApiKey } = require('./middlewares/authHandler');

const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
} = require('./middlewares/errorHandler');

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
const whiteList = ['http://127.0.0.1:5500'];
const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('No permitido'));
    }
  },
};
app.use(cors(options));
app.use(passport.initialize());
require('./utils/auth');

routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.get('/', checkApiKey, (req, res) => {
  res.send('Hola, mi server de express');
});

app.listen(port, () => {
  console.log(`Corriendo en http://localhost:${port}/`);
});
