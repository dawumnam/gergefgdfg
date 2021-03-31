import express from "express";
import auth from "../middleware/auth.js";

import {
  getPosts,
  createPosts,
  updatePost,
  deletePost,
  likePost,
} from "../controller/posts.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", auth, createPosts);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);

export default router;
