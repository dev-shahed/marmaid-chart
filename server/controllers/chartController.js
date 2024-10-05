const Groq = require('groq-sdk');

// Function to call Groq API and get Mermaid chart content
async function getMermaidChartCompletion(prompt) {
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  try {
    // Refined prompt to ensure we get a valid Mermaid graph
    const response = await groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: `Generate a valid and 100% correct Mermaid diagram for the following prompt: "${prompt}". 
                    Ensure the output contains only the necessary Mermaid syntax, is properly structured, and contains no syntax errors. 
                    Avoid extra descriptions, invalid characters, or incorrect syntax. 
                    The Mermaid diagram must be ready for direct rendering in a React app, ensuring smooth visualization without additional changes.`,
        },
      ],
      model: 'llama3-8b-8192',
    });

    return response.choices[0]?.message?.content || 'No chart generated.';
  } catch (error) {
    console.error('Error generating Mermaid chart:', error);
    throw error;
  }
}

// POST route handler to generate a Mermaid chart
const generateChart = async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const chart = await getMermaidChartCompletion(prompt);
    res.json({ chart });
  } catch (error) {
    res.status(500).json({ error: 'Error generating chart' });
  }
};

module.exports = { generateChart };
