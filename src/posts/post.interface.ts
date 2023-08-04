import { Types } from "mongoose";

interface IPost {
  author: Types.ObjectId;
  content: string;
  title: string;
}

export default IPost;
