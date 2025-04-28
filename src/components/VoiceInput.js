import React, { useState, useEffect, useRef } from 'react';

const VoiceAssistant = () => {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: "👋 Hi there! I'm your Health AI Assistant. Tap the mic and start speaking!" }
  ]);
  const [isListening, setIsListening] = useState(false);
  const chatEndRef = useRef(null); // Reference to scroll to the bottom

  let recognition;

  useEffect(() => {
    // Scroll to bottom whenever messages update
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Your browser doesn't support speech recognition. Try using Chrome.");
      return;
    }

    recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();
    setIsListening(true);

    recognition.onresult = (event) => {
      const userText = event.results[0][0].transcript;

      // Add User Message
      setMessages(prevMessages => [...prevMessages, { sender: 'user', text: userText }]);

      // Simulate AI Response
      setTimeout(() => {
        const aiResponse = generateAIResponse(userText);
        setMessages(prevMessages => [...prevMessages, { sender: 'ai', text: aiResponse }]);
      }, 1000);

      setIsListening(false);
    };

    recognition.onerror = (event) => {
      setMessages(prevMessages => [...prevMessages, { sender: 'system', text: `Error: ${event.error}` }]);
      setIsListening(false);
    };
  };

  const generateAIResponse = (userText) => {
    // Simulated dummy AI response
    return `🤖 (Sample OpenAI Response) You said: "${userText}". How can I assist you further?`;
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.chatContainer}>
        <h1 style={styles.title}>Health AI Assistant</h1>
        <p style={{ textAlign: 'center', color: 'gray', fontSize: '0.9rem' }}>
          💬 You will see sample OpenAI responses below.
        </p>

        <div style={styles.chatBox}>
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                ...styles.message,
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                backgroundColor: msg.sender === 'user' ? '#dcf8c6' : '#f1f0f0'
              }}
            >
              <strong>{msg.sender === 'user' ? 'You' : 'AI'}:</strong> {msg.text}
            </div>
          ))}
          {/* This is the reference point to scroll to */}
          <div ref={chatEndRef} />
        </div>

        <button 
          style={styles.button} 
          onClick={startListening} 
          disabled={isListening}
        >
          {isListening ? '🎙️ Listening...' : '🎙️ Start Speaking'}
        </button>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f9f9f9',
    fontFamily: 'Inter, sans-serif',
    padding: '1rem',
  },
  chatContainer: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '500px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  title: {
    fontSize: '1.8rem',
    textAlign: 'center',
  },
  chatBox: {
    backgroundColor: '#fafafa',
    borderRadius: '8px',
    padding: '1rem',
    height: '300px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  message: {
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    maxWidth: '75%',
    fontSize: '1rem',
    lineHeight: '1.4',
  },
  button: {
    backgroundColor: '#10a37f',
    color: 'white',
    border: 'none',
    padding: '0.8rem 1.5rem',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  }
};

export default VoiceAssistant;
