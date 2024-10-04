// src/MermaidChart.js
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import mermaid from 'mermaid';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const MermaidChart = ({ chartContent }) => {
  useEffect(() => {
    mermaid.initialize({ startOnLoad: true });
    mermaid.contentLoaded(); // Renders the chart
  }, [chartContent]);

  const downloadPDF = () => {
    const input = document.getElementById('mermaid-chart');

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 190; // Set the width of the image in the PDF
      const pageHeight = pdf.internal.pageSize.height;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('mermaid-chart.pdf');
    });
  };

  return (
    <>
      <div className="mermaid bg-white p-4" id="mermaid-chart">
        {console.log('Chart Content:', chartContent)}
        {chartContent}
      </div>
      <button
        onClick={downloadPDF}
        className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600 transition duration-200 mt-4"
      >
        Download as PDF
      </button>
    </>
  );
};

MermaidChart.propTypes = {
  chartContent: PropTypes.string.isRequired,
};

export default MermaidChart;
