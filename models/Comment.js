// models/Comment.js
import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
  },
  comment: {
    type: String,
    required: [true, "Comment is required"],
    trim: true,
  },
  rating: {
    type: Number,
    required: [true, "Rating is required"],
    min: [1, "Rating must be at least 1"],
    max: [5, "Rating cannot be more than 5"],
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Özel hata mesajları için pre-save middleware
commentSchema.pre("save", function (next) {
  if (this.rating < 1 || this.rating > 5) {
    next(new Error("Rating must be between 1 and 5"));
  }
  next();
});

// Virtuals ve diğer model özellikleri
commentSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
  },
});

export default mongoose.models.Comment ||
  mongoose.model("Comment", commentSchema);
