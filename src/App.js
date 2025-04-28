import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import VoiceInput from './components/VoiceInput';
import Conversation from './components/Conversation';

const App = () => {
  const [response, setResponse] = useState('');
  const [userInput, setUserInput] = useState('');
  
  // Send user input to GPT-4o API and get response
  const fetchAIResponse = async (input) => {
    const res = await axios.post('/api/chat', { input });
    setResponse(res.data.message);
  };

  useEffect(() => {
    if (userInput) {
      fetchAIResponse(userInput);
    }
  }, [userInput]);

  return (
    <div className="App">
      <VoiceInput setUserInput={setUserInput} />
    </div>
  );
};

export default App;
