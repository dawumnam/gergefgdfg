import React from "react";
import Post from "./Post/Post";
import useStyles from "./styles";

function Posts() {
  const classes = useStyles();

  return (
    <>
      <Post />
      <Post />
    </>
  );
}

export default Posts;
