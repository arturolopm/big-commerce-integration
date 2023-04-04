const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;
const STORE_URL = "https://api.bigcommerce.com/stores/s9ye4xe3x0/v3";
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
  console.log(req.body);
  try {
    const response = await axios.post(
      `${STORE_URL}/carts`,
      {
        customer_id: 0,
        line_items: [
          {
            quantity: 1,
            product_id: 77,
            list_price: 49,
            name: "[Sample] Fog Linen Chambray Towel - Beige Stripe",
            variant_id: 14,
          },
        ],
        channel_id: 1,
        locale: "en-US",
      },
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
  console.log(req.body);
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
