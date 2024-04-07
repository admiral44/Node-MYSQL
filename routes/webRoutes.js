import express, { Router } from "express";
import studentInfoController from "../controller/studentInfoController.js";

const router = Router();

const middleWare = (req, res, next) => {
    console.log("MiddleWare is running....:")
    next();
}

router.get("/user", middleWare, studentInfoController.getStudentInfo);

export default router;