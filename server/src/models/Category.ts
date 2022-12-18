import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Add your name"],
      trim: true,
      maxLength: [20, "Your name is up to 20 chars long."],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("categorie", categorySchema);
