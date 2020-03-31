const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

require('./database/index');

const app = express();

// Understanding req in json
app.use(bodyParser.json());
// Understanding params via url
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());

app.use(routes);

app.listen(3333);