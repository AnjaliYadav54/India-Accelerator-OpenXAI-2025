const axios = require('axios');

class OllamaClient {
  constructor() {
    this.baseURL = 'http://localhost:11434/api';
    this.model = 'llama3';
  }

  async enhanceTranscript(rawTranscript) {
    try {
      const prompt = `Please improve this speech transcript by:
1. Correcting grammar and spelling errors
2. Adding proper punctuation
3. Formatting it nicely with paragraphs
4. Maintaining the original meaning and tone
5. Making it more readable while keeping all the content

Raw transcript: "${rawTranscript}"

Please provide only the improved transcript without any additional comments:`;

      const response = await axios.post(`${this.baseURL}/generate`, {
        model: this.model,
        prompt: prompt,
        stream: false,
        options: {
          temperature: 0.3,
          top_p: 0.9,
          max_tokens: 2000
        }
      });

      return response.data.response.trim();
    } catch (error) {
      console.error('Ollama API error:', error.message);
      return rawTranscript; // Return original if enhancement fails
    }
  }

  async summarizeTranscript(transcript) {
    try {
      const prompt = `Please create a concise summary of this transcript, highlighting the key points and main topics discussed:

Transcript: "${transcript}"

Summary:`;

      const response = await axios.post(`${this.baseURL}/generate`, {
        model: this.model,
        prompt: prompt,
        stream: false,
        options: {
          temperature: 0.5,
          max_tokens: 500
        }
      });

      return response.data.response.trim();
    } catch (error) {
      console.error('Ollama summary error:', error.message);
      return 'Summary generation failed';
    }
  }

  async extractKeywords(transcript) {
    try {
      const prompt = `Extract the most important keywords and phrases from this transcript. Provide them as a comma-separated list:

Transcript: "${transcript}"

Keywords:`;

      const response = await axios.post(`${this.baseURL}/generate`, {
        model: this.model,
        prompt: prompt,
        stream: false,
        options: {
          temperature: 0.2,
          max_tokens: 200
        }
      });

      return response.data.response.trim();
    } catch (error) {
      console.error('Ollama keywords error:', error.message);
      return '';
    }
  }
}

module.exports = new OllamaClient();