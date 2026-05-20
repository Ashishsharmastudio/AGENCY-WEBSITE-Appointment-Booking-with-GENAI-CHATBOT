import { Schema, models, model } from "mongoose";

const chatSchema = new Schema(
  {
    userId: { type: String, required: false },
    serviceId: { type: String },
    question: { type: String, required: true },
    response: { type: String, required: true },
    feedback: {
      helpful: { type: Boolean, default: false },
      comment: { type: String },
    },
  },
  { timestamps: true }
);

// Prevent model recompilation errors during hot reload in dev
const Chat = models.Chat || model("Chat", chatSchema);

export default Chat;
