import { Router } from "express";
import { saludar } from "../Controllers/startController.js";

const start_router = Router();

start_router.get("/saludar", saludar);


export default start_router;