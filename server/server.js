const express = require("express");
const axios = require("axios");
const cors = require("cors");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;
const STORE_URL = process.env.STORE_URL;
const API_TOKEN = process.env.TOKEN;

app.use(cors());
app.use(express.json());

// GET route to fetch products
app.get("/products", async (req, res) => {
  try {
    const response = await axios.get(`${STORE_URL}/catalog/products`, {
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": API_TOKEN,
      },
    });
    res.send(response.data.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching products");
  }
});

// function to make the API call to create cart
async function createCart(req, res) {
  try {
    const response = await axios.post(
      `${STORE_URL}/carts`,

      req.body.body,

      {
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": API_TOKEN,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error creating cart");
  }
}

// POST route to handle cart creation
app.post("/cart", async (req, res) => {
  try {
    const cart = await createCart(req, res);
    res.send(cart);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
