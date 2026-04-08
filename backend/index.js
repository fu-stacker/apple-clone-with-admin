const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "apple_clone",
});

db.connect((err) => {
  if (err) {
    return console.log("error is happen while connecting to the database");
  }
  console.log("connect succesfully to the database ");

  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      price DECIMAL(10,2) NOT NULL,
      category VARCHAR(100),
      description TEXT,
      image_url VARCHAR(500),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  db.query(createTableSQL, (err, data) => {
    if (err) {
      console.log("can't create the table ");
      throw err;
    }
    console.log("table is created succesfully");
  });
});

app.get("/", (req, res) => {
  res.json("name=fuad ");
});
app.get("/products", (req, res) => {
  const sql = `SELECT * FROM products`;

  db.query(sql, (err, data) => {
    if (err) {
      res.end("error is happen while fetching the data");
      return res.status(500).json({ error: "Failed to fetch products" });
    }
    res.json(data);
  });
});
// POST - Add a new product
app.post("/products", (req, res) => {
  const { name, price, category, description, image_url } = req.body;

  if (!name || !price) {
    return res.status(400).json({
      error: "Name and price are required",
    });
  }

  const sql = `
    INSERT INTO products (name, price, category, description, image_url) 
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [name, price, category, description, image_url],
    (err, result) => {
      if (err) {
        console.error(" Error inserting product:", err.message);
        return res.status(500).json({
          error: "Failed to add product to database",
        });
      }

      res.status(201).json({
        message: " Product added successfully",
        productId: result.insertId,
      });
    },
  );
});

app.put("update/:id", (req, res) => {
  const id = req.params.id;
  const { name, price, category, description, image_url } = req.body;
  if (!name || !price) {
    return res.status(400).json({
      error: "Name and price are required",
    });
  }
  const sql = `
    UPDATE products 
    SET name = ?, price = ?, category = ?, description = ?, image_url = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [name, price, category, description, image_url, id],
    (err, data) => {
      if (err) {
        console.error(" Error updating product:", err.message);
        return res.status(500).json({
          error: "Failed to update product in database",
        });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({
          error: "Product not found with that id",
        });
      }
      res.json({ message: "products update succesfully" });
    },
  );
});

const PORT = 8888;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
