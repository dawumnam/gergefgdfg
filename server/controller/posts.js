import mongoose from "mongoose";

import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    return res.status(200).json(postMessages);
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

export const createPosts = async (req, res) => {
  let post = req.body;
  const userId = req.userId;
  post = { ...post, creatorId: userId, createdAt: new Date().toISOString() };
  const newPost = new PostMessage(post);
  try {
    await newPost.save();
    return res.status(201).json(newPost);
  } catch (error) {
    return res.status(409).json({
      message: error.message,
    });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No Post with that Id");

  const foundPost = await PostMessage.findById(_id);

  if (req.userId !== foundPost.creatorId)
    return res.status(404).json({ message: "User did not create this post" });

  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    { ...post, _id },
    {
      new: true,
    }
  );

  return res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No Post with that Id");
  const post = await PostMessage.findById(_id);
  console.log(post);
  if (req.userId !== post.creatorId)
    return res.status(400).json({ message: "User did not create this post" });
  await PostMessage.findByIdAndRemove(_id);
  return res.json({ message: "Post deleted Successfully" });
};

export const likePost = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No Post with that Id");
  const post = await PostMessage.findById(_id);

  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
    new: true,
  });
  return res.json(updatedPost);
};
