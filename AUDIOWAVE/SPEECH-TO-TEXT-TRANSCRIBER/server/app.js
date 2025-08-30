const express = require('express');
const multer = require('multer');
const fs = require('fs-extra');
const path = require('path');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const transcribeService = require('./transcribe');
const ollamaClient = require('./ollama-client');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Ensure upload directories exist
fs.ensureDirSync('./uploads');
fs.ensureDirSync('./transcripts');

// Multer configuration for audio uploads
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}-${Date.now()}.webm`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('audio/')) {
      cb(null, true);
    } else {
      cb(new Error('Only audio files allowed!'));
    }
  }
});

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Upload and transcribe audio
app.post('/api/transcribe', upload.single('audio'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No audio file provided' });
    }

    const audioPath = req.file.path;
    const transcriptId = uuidv4();
    
    console.log('Processing audio file:', audioPath);

    // Basic transcription (using Web Speech API result sent from frontend)
    const rawTranscript = req.body.rawTranscript || 'No transcript provided';
    
    // Enhance transcript using Ollama Llama3
    const enhancedTranscript = await ollamaClient.enhanceTranscript(rawTranscript);
    
    // Save transcript
    const transcriptData = {
      id: transcriptId,
      timestamp: new Date().toISOString(),
      originalFile: req.file.filename,
      rawTranscript: rawTranscript,
      enhancedTranscript: enhancedTranscript,
      duration: req.body.duration || 0
    };
    
    await fs.writeJson(`./transcripts/${transcriptId}.json`, transcriptData);
    
    // Clean up uploaded file
    await fs.remove(audioPath);
    
    res.json({
      success: true,
      transcriptId: transcriptId,
      rawTranscript: rawTranscript,
      enhancedTranscript: enhancedTranscript
    });

  } catch (error) {
    console.error('Transcription error:', error);
    res.status(500).json({ error: 'Transcription failed', details: error.message });
  }
});

// Get transcript by ID
app.get('/api/transcript/:id', async (req, res) => {
  try {
    const transcriptPath = `./transcripts/${req.params.id}.json`;
    const transcript = await fs.readJson(transcriptPath);
    res.json(transcript);
  } catch (error) {
    res.status(404).json({ error: 'Transcript not found' });
  }
});

// List all transcripts
app.get('/api/transcripts', async (req, res) => {
  try {
    const files = await fs.readdir('./transcripts');
    const transcripts = [];
    
    for (const file of files) {
      if (file.endsWith('.json')) {
        const data = await fs.readJson(`./transcripts/${file}`);
        transcripts.push({
          id: data.id,
          timestamp: data.timestamp,
          preview: data.enhancedTranscript.substring(0, 100) + '...',
          duration: data.duration
        });
      }
    }
    
    res.json(transcripts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transcripts' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🎙️  Speech-to-Text Transcriber running on http://localhost:${PORT}`);
  console.log(`📝 Ready to transcribe your audio!`);
});
// Delete transcript
app.delete('/api/transcript/:id', async (req, res) => {
  try {
    const transcriptPath = `./transcripts/${req.params.id}.json`;
    await fs.remove(transcriptPath);
    res.json({ success: true });
  } catch (error) {
    res.status(404).json({ error: 'Transcript not found' });
  }
});

module.exports = app;