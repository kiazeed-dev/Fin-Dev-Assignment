const axios = require("axios");
const express = require("express");
const cors = require("cors")
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors())

app.get("/", (req, res) => {
  axios.get("https://ftx.com/api/markets/BTC/USDT")
    .then(response => {
      res.send(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(PORT);