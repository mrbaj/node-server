import Controller from "../controllers/tutorial.controller.js";
import TokenController from "../controllers/token.controller.js";
import TeacherController from "../controllers/teacher.controller.js";
import express from "express";
const router = express.Router();

const tutorials = new Controller();
const teacher = new TeacherController();
const token = new TokenController();

// Create a new Teacher
router.post("/newTeacher", teacher.create);
router.get("/getTeacher", teacher.findOne);

router.post("/generateToken", token.create);
router.delete("/removeToken/:token", token.remove);
router.get("/getToken/:email", token.findOne);

// Create a new Tutorial
router.post("/", tutorials.create);

// Retrieve all Tutorials
router.get("/", tutorials.findAll);

// Retrieve all published Tutorials
router.get("/published", tutorials.findAllPublished);

// Retrieve a single Tutorial with id
router.get("/:id", tutorials.findOne);

// Update a Tutorial with id
router.put("/:id", tutorials.update);

// Delete a Tutorial with id
router.delete("/:id", tutorials.delete);

// Delete all Tutorials
router.delete("/", tutorials.deleteAll);

export default router;
