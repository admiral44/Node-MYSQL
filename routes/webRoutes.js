import express, { Router } from "express";
import studentInfoController from "../controller/studentInfoController.js";
import userDetailsController from "../controller/userDetailsController.js";

const router = Router();

const middleWare = (req, res, next) => {
    console.log("MiddleWare is running....:")
    next();
}

router.get("/user", middleWare, studentInfoController.getStudentInfo);

// Register route
router.post("/register", middleWare, userDetailsController.registerUser);

router.post("/login", middleWare, userDetailsController.loginUser)

export default router;