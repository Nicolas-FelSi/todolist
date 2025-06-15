const { Router } = require("express");
const { addTask, editTask, listTasks, removeTask } = require("./taskControllers");

const router = Router();

router.get("/", listTasks);
router.post("/", addTask);
router.put("/:id", editTask);
router.delete("/:id", removeTask);

module.exports = router;

export {}