import express from "express";

import {addItem, retrieveItem, deleteItem, updateItem} from "../controllers/itemController/index";

const router = express.Router();

router.post("/add", addItem);

router.put("/update", updateItem);

router.get("/retrieve", retrieveItem);

router.delete("/delete", deleteItem);

module.exports = router;