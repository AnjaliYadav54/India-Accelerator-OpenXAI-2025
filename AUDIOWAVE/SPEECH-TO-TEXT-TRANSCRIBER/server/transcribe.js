// This file handles additional transcription utilities
const fs = require('fs-extra');
const path = require('path');

class TranscribeService {
  constructor() {
    this.supportedFormats = ['.webm', '.wav', '.mp3', '.m4a'];
  }

  validateAudioFile(filepath) {
    const ext = path.extname(filepath).toLowerCase();
    return this.supportedFormats.includes(ext);
  }

  async getAudioDuration(filepath) {
    // This is a placeholder - in a real implementation,
    // you might use a library like ffprobe or similar
    try {
      const stats = await fs.stat(filepath);
      // Rough estimation based on file size (this is not accurate)
      return Math.round(stats.size / 32000); // Very rough estimate
    } catch (error) {
      return 0;
    }
  }

  formatTranscript(text, format = 'plain') {
    switch (format) {
      case 'sentences':
        return text.split(/[.!?]+/).filter(s => s.trim().length > 0);
      case 'paragraphs':
        return text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
      default:
        return text;
    }
  }

  async saveTranscriptAsText(transcriptData, outputPath) {
    const content = `Speech-to-Text Transcript
Generated: ${transcriptData.timestamp}
Duration: ${transcriptData.duration}s
Original File: ${transcriptData.originalFile}

--- Raw Transcript ---
${transcriptData.rawTranscript}

--- Enhanced Transcript ---
${transcriptData.enhancedTranscript}
`;
    
    await fs.writeFile(outputPath, content, 'utf8');
  }
}

module.exports = new TranscribeService();