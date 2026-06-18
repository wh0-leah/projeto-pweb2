const express = require("express");

const router = express.Router();

const conteudoController = require("../controllers/conteudoController");

const auth = require("../middlewares/authMiddleware");

router.get("/", conteudoController.list);

router.get("/:id", conteudoController.getById);

router.post("/", auth, conteudoController.create);

router.put("/:id", auth, conteudoController.update);

router.delete("/:id", auth, conteudoController.remove);

module.exports = router;