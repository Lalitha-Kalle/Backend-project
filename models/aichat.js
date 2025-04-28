const mongoose = require("mongoose");

const aiChatSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },

}, 
{timestamps: true}
);

const AiChat = mongoose.model("AiChat", aiChatSchema)
module.exports = AiChat