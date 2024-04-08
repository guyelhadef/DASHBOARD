import express from "express";
import { getSales } from "../controllers/sales.js"
const router = express.Router();

router.get("/sales", getSales) ///this endpiont serves 4 diffrent pages of data

export default router;