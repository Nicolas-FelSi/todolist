import { Router } from "express";
import { addTask, editTask, findTaskById, listTasks, removeTask } from "./taskControllers.js";

const router = Router();

router.get("/", listTasks);
router.post("/", addTask);
router.get("/:id", findTaskById);
router.put("/:id", editTask);
router.delete("/:id", removeTask);

export default router;