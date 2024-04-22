import express, { Router } from "express";
import studentInfoController from "../controller/studentInfoController.js";
import userDetailsController from "../controller/userDetailsController.js";
import auth from "../Auth/auth.js";

const router = Router();

const middleWare = async (req, res, next) => {
    console.log("MiddleWare is running....:",)

    // IF TOKEN IS NOT PRESENT
    if (!req.headers.token) { return res.send({ status: "401", statusMessage: "Failed", message: "Invalid Token." });}

    const result = await auth.AuthTokenValidator(req.headers.token)
    // console.log("Result:", result)

    // IF TOKEN IS INVALID
    if (result === "failed") { return res.send({ status: "401", statusMessage: "Failed", message: "Invalid Token." });}

    next();
}

// Protected Routes
router.get("/user", middleWare, studentInfoController.getStudentInfo);

// Public Routes
router.post("/register", userDetailsController.registerUser);
router.post("/login", userDetailsController.loginUser)

export default router;