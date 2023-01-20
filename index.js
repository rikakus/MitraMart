const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const path = require("path");
const marketRoute = require("./src/route/market.route");
const swaggerUi = require('swagger-ui-express')
const apiDocumentation = require('./apidocs.json')
const app = express();
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(apiDocumentation))
app.use(bodyParser.json());
app.use(xss());
app.use(helmet());
app.use(
  cors({
    origin: "*",
  })
);

app.use((req, res, next) => {
  res.header("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});

app.use(marketRoute);
app.use(express.static(path.join(__dirname, "public")));

const APP_PORT = process.env.PORT || 3003
app.listen(APP_PORT, () => {
  console.log(`service running on PORT ${APP_PORT}`);
});
