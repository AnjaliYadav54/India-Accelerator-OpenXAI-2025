# Speech-to-Text Transcriber with Ollama

A comprehensive speech-to-text transcription tool that uses local speech recognition and enhances results with Ollama's AI models.

## Features

- **Record Audio**: Record directly from your microphone
- **Upload Audio Files**: Support for WAV, MP3, M4A, FLAC, AAC formats  
- **Speech Recognition**: Uses multiple engines (Google, Sphinx) for accurate transcription
- **AI Enhancement**: Improves transcripts using Ollama's Llama3 model
- **Export Options**: Save as TXT or JSON format
- **User-friendly GUI**: Clean, intuitive interface

## Prerequisites

1. **Python 3.7+** installed
2. **Ollama** installed and running
3. **Llama3 model** downloaded in Ollama

## Installation Steps

### 1. Install Ollama
```bash
# Download from https://ollama.ai
# Or use package manager
curl -fsSL https://ollama.ai/install.sh | sh
```

### 2. Download Llama3 Model
```bash
ollama pull llama3
```

### 3. Install Python Dependencies
```bash
python install_requirements.py
```

Or manually:
```bash
pip install speechrecognition==3.10.0 pydub==0.25.1 ollama==0.1.7 pyaudio==0.2.11
```

### 4. Run the Application
```bash
python main.py
```

## Usage

1. **Start Ollama** (if not running):
   ```bash
   ollama serve
   ```

2. **Launch the Application**:
   ```bash
   python main.py
   ```

3. **Record or Upload Audio**:
   - Click "Start Recording" to record from microphone
   - Or click "Upload Audio File" to select existing audio

4. **Transcribe**:
   - Click "Transcribe" to convert speech to text
   - The AI will enhance the transcription for better readability

5. **Save Results**:
   - Click "Save Transcript" to export as TXT or JSON

## Troubleshooting

### PyAudio Installation Issues (Windows)
```bash
# Try these alternatives:
pip install pipwin
pipwin install pyaudio

# Or download wheel from:
# https://www.lfd.uci.edu/~gohlke/pythonlibs/#pyaudio
```

### Ollama Connection Issues
- Ensure Ollama is running: `ollama serve`
- Check if Llama3 is installed: `ollama list`
- Pull model if missing: `ollama pull llama3`

### Audio Format Issues
- Supported formats: WAV, MP3, M4A, FLAC, AAC
- For best results, use WAV format
- The app automatically converts other formats

## Project Structure
```
speech-to-text-transcriber/
├── main.py                 # Main application
├── install_requirements.py # Setup script
├── requirements.txt        # Dependencies
├── README.md              # Documentation
└── temp_audio.wav         # Temporary audio file (auto-generated)
```

## Technical Details

- **Speech Recognition**: Uses Google Speech Recognition and CMU Sphinx
- **Audio Processing**: PyAudio for recording, Pydub for format conversion
- **AI Enhancement**: Ollama with Llama3 for improving transcription quality
- **GUI**: Tkinter for cross-platform interface
- **File Support**: Multiple audio formats with automatic conversion

## License

This project is open source. Feel free to modify and distribute.
"""