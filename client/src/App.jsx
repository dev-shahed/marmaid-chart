import axios from 'axios'; // Import Axios
import { useState } from 'react';
import MermaidChart from './components/MermaidChart';

const App = () => {
  const [chartContent, setChartContent] = useState('');
  const [error, setError] = useState('');
  const [prompt, setPrompt] = useState(''); // State to hold the prompt

  // // Function to validate Mermaid syntax
  // const validateMermaidSyntax = (syntax) => {
  //   // Regex to check if the Mermaid syntax starts correctly
  //   const mermaidRegex =
  //     /^(graph|sequenceDiagram|gantt|classDiagram|stateDiagram)\s+[A-Z][^[]*?\[[^\]]*\]\s*(-->|\-\-|<--|\-\->)/;

  //   // Check if there are multiple words outside brackets
  //   const outsideWordCheck = /(?<!\[)([A-Za-z]+\s+[A-Za-z]+)(?=[^\[]*\])/;

  //   // Ensure the syntax matches the Mermaid structure and does not have multiple words outside []
  //   return mermaidRegex.test(syntax) || !outsideWordCheck.test(syntax);
  // };

  const fetchChart = async () => {
    try {
      const response = await axios.post('/api/generate-chart', {
        prompt: prompt, // Use the user-provided prompt
      });

      const chartSyntax = response.data?.chart
        .replace(/(?<!-)>(?!-)/g, '')
        .replace(/\s*\([^)]*\):/g, '')
        .replace(/\|\|/g, '|');

      // Validate the Mermaid syntax
      if (chartSyntax) {
        setChartContent(chartSyntax);
        setError(''); // Clear error if valid
        setPrompt('');
      } else {
        console.error('Invalid Mermaid syntax:', chartSyntax);
        setError('Invalid Mermaid syntax. Please try again.');
        setChartContent(''); // Clear chart content if invalid
      }
    } catch (error) {
      setError('Error fetching chart. Please try again later.');
      setChartContent(''); // Clear chart content if there's an error
      console.error('Error fetching chart:', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Mermaid Chart Generator
      </h1>
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here"
          className="border border-gray-300 rounded-lg p-3 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={fetchChart}
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Generate Chart
        </button>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        {chartContent && <MermaidChart chartContent={chartContent} />}
      </div>
    </div>
  );
};

export default App;
