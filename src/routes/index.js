const route = require('express').Router();
const cors = require('cors');

route.use("/brand", cors(), require('./brand'));

module.exports = route;
