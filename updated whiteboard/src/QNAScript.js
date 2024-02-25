import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; 

function QNAScript() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post('http://localhost:8000/qna', { question }, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  
});
console.log(response.data)

      setResponse(response.data.output_text);
    } catch (error) {
      console.error('Error fetching response:', error);
      setResponse('Error fetching response. Please try again.');
    }finally{
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>Question Answer Chatbot</h1>
      <div className="form-container">
        <label htmlFor="question">Ask a question:</label>
        <input
          type="text"
          id="question"
          value={question}
          onChange={handleQuestionChange}
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

export default QNAScript;
