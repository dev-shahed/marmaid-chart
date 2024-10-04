// src/App.js
import React, { useState } from 'react';
import MermaidChart from './components/MermaidChart';

const App = () => {
    const [chartContent, setChartContent] = useState("");

    const fetchChart = async () => {
        const response = await fetch('http://localhost:5000/generate-chart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: 'Explain the process of making coffee' }),
        });

        const data = await response.json();
        setChartContent(data.chart); // Assuming the chart content is in data.chart
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <h1 className="text-2xl font-bold mb-4">Mermaid Chart Example</h1>
            <button 
                onClick={fetchChart} 
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
            >
                Generate Chart
            </button>
            {chartContent && <MermaidChart chartContent={chartContent} />}
        </div>
    );
};

export default App;
