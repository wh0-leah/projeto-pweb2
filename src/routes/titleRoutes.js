const express = require("express");
const multer = require("multer");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  listTitles,
  getTitleById,
  createTitle,
  uploadTitlePoster,
} = require("../controllers/titleController");

const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

router.get("/", authMiddleware, listTitles);
router.get("/:id", authMiddleware, getTitleById);
router.post("/", authMiddleware, createTitle);
router.post("/:id/poster", authMiddleware, upload.single("poster"), uploadTitlePoster);

module.exports = router;
