import React, { useState } from 'react';
import {jsPDF} from 'jspdf'
import './App.css'; 

function Summary() {
  const [summary, setSummary] = useState('');
  const [isLoading,setIsLoading] = useState(false);
 

  const handleGetSummary = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/summarize', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch summary');
      }

      const result = await response.json();
      console.log(result);
      setSummary(result);  
    } catch (error) {
      console.error('Error fetching summary:', error);
      setSummary('Error fetching summary. Please try again.');
    }finally {
      setIsLoading(false);
    }
  };

  const downloadPdf = () => {
    const pdf = new jsPDF();

      // Add banner image
    const bannerImage = new Image();
    bannerImage.src = './googlebanner.png'; 
    pdf.addImage(bannerImage, 'PNG', 10, 10, 190,60); 
  
  // Set font size and style
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'normal');
    pdf.text(20, 80, 'Lecture Summary:');
    const splitText = pdf.splitTextToSize(summary, 170);
    pdf.text(20, 100, splitText);
    pdf.save('lecture_summary.pdf');
  };

  return (
    <div className="summary-container">
      <h1>Lecture Summary Generator</h1>
      <p>
        Embark on a journey of learning! Simply click the button below to receive a concise and insightful summary of your lecture.
      </p>
      <button disabled={isLoading} onClick={handleGetSummary}>
        {isLoading ? 'Processing...' : 'Get Summary'}
      </button>
      {isLoading && <div className="spinner"></div>}
      {summary && (
        <div className="summary-result">
          <h2>Summary:</h2>
          <p>{summary}</p>
          <button onClick={downloadPdf}>Download PDF</button>
        </div>
      )}
    </div>
  );
}

export default Summary;
