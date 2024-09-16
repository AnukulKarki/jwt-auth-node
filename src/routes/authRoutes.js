import { Router } from "express";
import AuthController from "../controller/authController.js";
import validateToken from "../middleware/validateToken.js";

const router = Router();

const authController = new AuthController();
//route for login authorization
router.post("/", authController.authenticate);

//route for user registration
router.post("/addAuth", authController.addAuth);

//list user
router.get("/listUser", validateToken ,authController.listUser);

export default router;
