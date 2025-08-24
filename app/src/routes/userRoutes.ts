/**
 * @author Joseph Adogeri
 * @version 1.0
 * @since 24-AUG-2025
 * @description single module to export user routes
 */

import express from "express";

import {loginUser, registerUser, logoutUser, resetUser, currentUser, forgotUser, deactivateUser} from "../controllers/userController/index";

const router = express.Router();

const validateToken = require("../middlewares/validateTokenHandler");

router.post("/register", registerUser);

router.post("/login",loginUser);

router.post("/logout",validateToken, logoutUser);

router.put("/reset", resetUser);

router.get("/current", validateToken, currentUser);

router.post("/forgot", forgotUser);

router.delete("/deactivate", deactivateUser);

module.exports = router;

