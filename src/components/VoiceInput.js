import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const VoiceInput = ({ setUserInput }) => {
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const handleStart = () => {
    SpeechRecognition.startListening();
  };

  const handleStop = () => {
    SpeechRecognition.stopListening();
    setUserInput(transcript);
    resetTranscript();
  };

  return (
    <div>
      <button onClick={handleStart}>Start Listening</button>
      <button onClick={handleStop}>Stop Listening</button>
      <p>{listening ? 'Listening...' : 'Click to Speak'}</p>
      <p>Transcript: {transcript}</p>
    </div>
  );
};

export default VoiceInput;
