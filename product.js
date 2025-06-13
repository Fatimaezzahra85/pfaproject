const express = require("express");
const router = express.Router();
const product = require("../models/product");

// POST /products
router.post("/", async (req, res) => {
  try {
    const newProduct = new product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ error: "Erreur lors de la création" });
  }
});
/*// GET /products
router.get("/", async (req, res) => {
  const products = await product.find();
  res.json(products);
});*/
// GET /products/:id
router.get("/:id", async (req, res) => {
  const product = await product.findById(req.params.id);
  if (!product) return res.status(404).json({ error: "Produit introuvable" });
  res.json(product);
});
// PUT /products/:id
router.put("/:id", async (req, res) => {
  const updated = await product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});
// DELETE /products/:id
router.delete("/:id", async (req, res) => {
  await product.findByIdAndDelete(req.params.id);
  res.json({ message: "Produit supprimé" });
});
// GET /products/category/:cat
router.get("/category/:cat", async (req, res) => {
  const products = await product.find({ category: req.params.cat });
  res.json(products);
});
// GET /products/search/:keyword
router.get("/search/:keyword", async (req, res) => {
  const regex = new RegExp(req.params.keyword, 'i'); 
  const products = await product.find({ title: regex });
  res.json(products);
});
module.exports = router;