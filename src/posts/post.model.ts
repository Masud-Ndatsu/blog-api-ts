import mongoose from "mongoose";
import IPost from "./post.interface";

const { Schema, model } = mongoose;

const schema = new Schema<IPost>({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

export default model("posts", schema);
