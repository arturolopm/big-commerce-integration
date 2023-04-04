const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());
const STORE_URL = "https://api.bigcommerce.com/stores/s9ye4xe3x0/v3";
const API_TOKEN = process.env.TOKEN;

app.get("/products", async (req, res) => {
  let url = `${STORE_URL}/catalog/products`;

  let options = {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": API_TOKEN,
    },
    body: {},
  };
  try {
    const response = await axios(url, options);
    res.send(response.data.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching products");
  }
});

// create a function for making the API call
async function createCart() {
  try {
    const url = `${STORE_URL}/carts`;
    const options = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": API_TOKEN,
      },
      data: {
        customer_id: 0,
        line_items: [
          {
            quantity: 2,
            product_id: 94,
            list_price: 5,
            name: "calendar",
          },
        ],
        channel_id: 1,

        locale: "en-US",
      },
    };
    const response = await axios(url, options);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error creating cart");
  }
}

// handle the API call in the route handler
app.post("/cart", async (req, res) => {
  try {
    const cart = await createCart();
    res.send(cart);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(3001, () => {
  console.log("Server listening on port 3001");
});
