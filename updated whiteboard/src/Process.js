import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function Process() {
  const [fileType, setFileType] = useState('pdf');
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileTypeChange = (e) => {
    setFileType(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('filetype', fileType);
      formData.append('file', file);

      const response = await axios.post('http://localhost:8000/process', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response)

      setResponse(response.data.status);
    } catch (error) {
      console.error('Error submitting form:', error);
      setResponse('Error submitting form. Please try again.');
    }finally{
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>PDF Upload Form</h1>
      <div className="form-container">
        <label htmlFor="fileType">File Type:</label>
        <input
          type="text"
          id="fileType"
          value={fileType}
          onChange={handleFileTypeChange}
        />

        <label htmlFor="file">Choose a PDF file:</label>
        <input
          type="file"
          id="file"
          accept=".pdf"
          onChange={handleFileChange}
        />

<button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Submit'}
        </button>
      </div>

      {isLoading && <div className="spinner"></div>}


      {response && (
        <div className="response-container">
          <h2>Response:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default Process;
