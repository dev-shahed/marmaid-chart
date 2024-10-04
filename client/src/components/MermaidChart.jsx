// src/MermaidChart.js
import React, { useEffect } from 'react';
import mermaid from 'mermaid';

const MermaidChart = ({ chartContent }) => {
    useEffect(() => {
        mermaid.initialize({ startOnLoad: true });
        mermaid.contentLoaded(); // Renders the chart
    }, [chartContent]);

    return (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md overflow-auto mt-4">
            {chartContent}
        </div>
    );
};

export default MermaidChart;
