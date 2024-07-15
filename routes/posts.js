import express from "express";
import { createPost, deletePost, getAllPosts, getSinglePost, updatePost } from "../controllers/postController.js";

const router = express.Router();

router.get("/", getAllPosts);

router.get("/:id", getSinglePost);

// Create new Post
router.post("/", createPost);

// Update Post
router.put("/:id", updatePost);

// delete post
router.delete("/:id", deletePost);

export default router;