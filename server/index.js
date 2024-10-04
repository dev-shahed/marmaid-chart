const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // Import cors
const Groq = require('groq-sdk'); // Import GROQ SDK

// Load environment variables from .env file
dotenv.config();

// Initialize Groq client correctly
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Create an Express app
const app = express();
app.use(express.json());
app.use(cors()); 

// Function to call Groq API and get Mermaid chart content
async function getMermaidChartCompletion(prompt) {
  try {
    // Send a request to the Groq API to generate the Mermaid chart content
    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Generate a mermaid chart for the following task: ${prompt}`,
        },
      ],
      model: "llama3-8b-8192", // Replace with your desired model
    });

    return response.choices[0]?.message?.content || "No chart generated.";
  } catch (error) {
    console.error("Error generating Mermaid chart:", error);
    throw error;
  }
}

// POST route to generate a Mermaid chart
app.post("/generate-chart", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const chart = await getMermaidChartCompletion(prompt);
    res.json({ chart });
  } catch (error) {
    res.status(500).json({ error: "Error generating chart" });
  }
});

// Start the Express server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
