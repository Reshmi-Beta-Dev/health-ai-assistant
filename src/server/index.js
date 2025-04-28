const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// GPT-4o API Route
app.post('/api/chat', async (req, res) => {
  const { input } = req.body;

  try {
    const gptResponse = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        model: 'gpt-4', 
        prompt: input,
        max_tokens: 150,
      },
      { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` } }
    );

    res.json({ message: gptResponse.data.choices[0].text });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error communicating with OpenAI API');
  }
});

// OpenAI TTS Route
app.post('/api/tts', async (req, res) => {
  const { text } = req.body;

  try {
    const ttsResponse = await axios.post(
      'https://api.openai.com/v1/audio/speech',
      { text },
      { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` } }
    );

    res.json({ audio: ttsResponse.data });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error communicating with TTS API');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
