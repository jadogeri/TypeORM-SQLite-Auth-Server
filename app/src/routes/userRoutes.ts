import express from "express";

import {loginUser, registerUser, logoutUser, resetUser, currentUser, forgotUser, deactivateUser} from "../controllers/userController/index";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login",loginUser);

router.post("/logout", logoutUser);

router.post("/reset", resetUser);

router.get("/current", currentUser);

router.post("/forgot", forgotUser);

router.delete("/deactivate", deactivateUser);


export default router;