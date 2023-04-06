const express = require("express");
const axios = require("axios");
const cors = require("cors");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;
const STORE_URL = process.env.STORE_URL;
const API_TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;

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
//  This is declared as function and the below get route will get declared as const function just to show that it is possible in both ways, for production plesae use ES6 syntax
async function createCart(req, res) {
  try {
    const response = await axios.post(
      `${STORE_URL}/carts`,

      req.body.body,

      {
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": API_TOKEN,
          "X-Auth-Client": CLIENT_ID,
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
app.post("/carts", async (req, res) => {
  try {
    const cart = await createCart(req, res);
    res.send(cart);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// GET route to handle cart recovery made
const getCart = async (req, res) => {
  try {
    // console.log(`${STORE_URL}/carts/${req.params.cartId}`);
    const response = await axios.get(
      `${STORE_URL}/carts/${req.params.cartId}`,
      {
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": API_TOKEN,
          "X-Auth-Client": CLIENT_ID,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching products");
  }
};

app.get("/carts/:cartId", async (req, res) => {
  try {
    const cart = await getCart(req, res);
    res.send(cart);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
