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
          content: `Generate a valid Mermaid "graph TD" diagram based on the following prompt: "${prompt}". 
                    Ensure that the syntax is correct and properly structured, without any extra descriptions or explanations. 
                    Only provide a simple, clean, and valid Mermaid graph. Avoid invalid characters, extra arrows, or incorrect syntax.`,
        },
      ],
      model: 'llama3-8b-8192',
    });
    const chartContent = response.choices[0]?.message?.content.replace(/style\s*.+;\n/g, '');
    return chartContent || 'No chart generated.';
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
