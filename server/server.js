const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let url = "https://api.bigcommerce.com/stores/s9ye4xe3x0/v3/catalog/products";

let options = {
  method: "get",
  headers: {
    "Content-Type": "application/json",
    "X-Auth-Token": "wo9e40w72wf7f21kpz3xfgfiwmeffz",
  },
  body: {},
};

// {
//     headers: {
//       "X-Auth-Token": "wo9e40w72wf7f21kpz3xfgfiwmeffz",
//       "X-Auth-Client": "gpl0gdypka6xdtp5oyo9uzz5i3hvgsr",
//       "Content-Type": "application/json",
//       Accept: "application/json",
//     },
//   }

app.get("/products", async (req, res) => {
  try {
    const response = await axios(url, options);
    res.send(response.data.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching products");
  }
});

app.listen(3001, () => {
  console.log("Server listening on port 3001");
});
