const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const Bid = require("../models/Bid");
const mongoose = require("mongoose");

router.get('/category/:cat', async (req, res) => {
  try {
    const categoryParam = req.params.cat;

    let auctions = await auction.find()
      .populate({
        path: "product",
        match: { category: categoryParam } 
      })
      .populate("bids.user");

  
    auctions = auctions.filter(a => a.product !== null);

    res.json(auctions);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// 📌 GET /auctions/:id → détails d'une enchère spécifique (produit)
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("bids");
    if (!product) return res.status(404).json({ error: "Produit non trouvé" });

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// 📌 POST /auctions/:id/bid → placer une enchère

router.post("/:id/bid", async (req, res) => {
  const { userId, amount } = req.body;
  try {
    const product = await Product.findById(req.params.id).populate("highestBid");

    if (!product) return res.status(404).json({ error: "Produit introuvable" });

    if (product.highestBid && amount <= product.highestBid.amount) {
      return res.status(400).json({ error: "Le montant doit être supérieur à l'enchère actuelle" });
    }

    const newBid = new Bid({
      user: new mongoose.Types.ObjectId(userId),
      product: product._id,
      amount,
      time: new Date(),
    });

    await newBid.save();

   
    product.bids.push(newBid._id);
    product.highestBid = newBid._id;
    await product.save();

    res.status(201).json({ message: "Enchère placée avec succès", bid: newBid });
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de l'enchère" });
  }
});


// POST /auctions/with-product — créer produit + enchère

router.post("/createauct", async (req, res) => {
  try {    
    const {
      title,
      description,
      category,
      images,
      isLive,
      bid_increment,
      start_time,
      end_time
    } = req.body;

   
    const newProduct = new Product({
      title,
      description,
      category,
      images,
      start_time,
      end_time

    });

    await newProduct.save();

   
    const newAuction = new Auction({
      category, 
      product: newProduct._id,
      isLive: isLive || false,
      bids: [{
        bid_increment: bid_increment || 0,
        start_time,
        end_time
      }]
    });

    await newAuction.save();
+9
    /
    res.status(201).json({
      message: "Produit et enchère créés avec succès",
      product: newProduct,
      auction: newAuction
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de la création" });
  }
});

module.exports = router;
