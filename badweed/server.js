const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

app.use(cors());
app.use(express.json());

// --- WEKA API KEY YAKO HAPA ---
const API_KEY = "AIzaSyAqJoMRLXH64qTIcgto8UBGFh32InE0xOc";
const genAI = new GoogleGenerativeAI(API_KEY);

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;
    console.log("----------------------------");
    console.log("USER:", userMessage);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash"
    });

    const result = await model.generateContent(`
      Wewe ni AI assistant wa WEED TECH.
      Huduma:
      - Logo = Tsh 25,000
      - Poster = Tsh 15,000
      Jibu kwa Kiswahili kwa ufupi.
      User amesema: ${userMessage}
    `);

    // Hii itatupa muundo mzima wa jibu kwenye terminal
    console.log("FULL RESULT RECEIVED FROM GOOGLE");

    const text = result.response.text();
    console.log("AI REPLY:", text);

    if (!text || text.trim() === "") {
      return res.json({ text: "AI haijarudisha maandishi (Empty Response)." });
    }

    res.json({ text: text });

  } catch (error) {
    console.error("ERROR:");
    console.error(error.message); // Hapa tutaona kama Key imekufa au Quota imeisha

    res.status(500).json({
      text: "Kuna hitilafu kwenye muunganisho wa AI."
    });
  }
});

app.listen(3000, '0.0.0.0', () => {
  console.log("✅ SERVER IPO LIVE PORT 3000");
});