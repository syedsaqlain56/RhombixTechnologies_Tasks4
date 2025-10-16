import express from "express";
import multer from "multer";
import Post from "../models/Post.js";

const router = express.Router();

// Image upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Create post
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const newPost = new Post({
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
      image: req.file ? `/uploads/${req.file.filename}` : null,
    });
    await newPost.save();
    res.json(newPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all posts
router.get("/", async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
});

// Delete post
router.delete("/:id", async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.json({ message: "Post deleted" });
});

// Update post
router.put("/:id", upload.single("image"), async (req, res) => {
  const updateData = {
    title: req.body.title,
    content: req.body.content,
    category: req.body.category,
  };
  if (req.file) updateData.image = `/uploads/${req.file.filename}`;
  const updated = await Post.findByIdAndUpdate(req.params.id, updateData, { new: true });
  res.json(updated);
});

export default router;
