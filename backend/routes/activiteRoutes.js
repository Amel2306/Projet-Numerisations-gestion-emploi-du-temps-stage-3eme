const express = require("express");
const activiteControllers = require("../controllers/activiteControllers");

const router = express.Router();

router.get("/", activiteControllers.getAllActivites);
router.get("/:id", activiteControllers.getActivite);
router.get(
  "/encadrant/:professeurId",
  activiteControllers.getActiviteByEncadrant
);
router.post("/", activiteControllers.addActivite);
router.put("/:id", activiteControllers.updateActivite);
router.delete("/", activiteControllers.deleteAllActivites);
router.delete("/:id", activiteControllers.deleteActivite);

module.exports = router;
