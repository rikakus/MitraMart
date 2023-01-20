const express = require("express");
const { list, detail, input, update, deleted } = require("../controllers/market.controller");

const router = express.Router();

router
  .get("/goods/all", list)
  .get("/goods/detail/:id", detail)
  .post("/goods/input",input)
  .put("/goods/update/:id", update)
  .delete("/goods/delete/:id", deleted)

module.exports = router;
