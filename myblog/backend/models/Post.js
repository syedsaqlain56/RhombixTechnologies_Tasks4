import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    category: String,
    image: String,
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
