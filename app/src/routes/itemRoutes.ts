import express from "express";

import {addItem, getItem, getItems, deleteItem, deleteItems, updateItem} from "../controllers/itemController/index";

const router = express.Router();

router.post("/", addItem);

router.put("/", updateItem);

router.get("/:id", getItem);

router.get("/", getItems);

router.delete("/:id", deleteItem);

router.delete("/", deleteItems);


module.exports = router;