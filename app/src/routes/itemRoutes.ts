/**
 * @author Joseph Adogeri
 * @version 1.0
 * @since 24-AUG-2025
 * @description single module to export item routes
 */

import express from "express";

import {addItem, getItem, getItems, deleteItem, deleteItems, updateItem} from "../controllers/itemController/index";

const validateToken = require("../middlewares/validateTokenHandler");

const router = express.Router();

router.post("/", validateToken, addItem);

router.put("/:id", validateToken, updateItem);

router.get("/:id", validateToken, getItem);

router.get("/", validateToken, getItems);

router.delete("/:id", validateToken, deleteItem);

router.delete("/", validateToken, deleteItems);

module.exports = router;