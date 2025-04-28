const express = require("express")
require("dotenv").config();

const { GoogleGeneraticeAI } = require("@google/generative-ai")
const AiChat = require("../models/aichat");
const aiChatRouter = express.Router()
const genAI = new GoogleGeneraticeAI(process.env.Gemini_Api_Secret);

aiChatRouter.post("/ask/ai", async (req, res) => {
  try {
    const { question } = req.body;
    const { _id } = req.user;

    if(!question) {
      return res.status(400).json({error: "question is required"})
    }

    const model = genAI.getGenerativeModel({model: "gemini-1.5.-pro"});
    const result = await model.generateContent(question);
    const answer = result.response.text();

    await AiChat.create({
      userId: _id,
      question,
      answer,
    });
    return res.json({answer})
  } catch(e) {
    console.error("Error with gemini api:", e);
    return res.status(500).json({error: "Failed to get response from AI"})
  }
})

module.exports = aiChatRouter