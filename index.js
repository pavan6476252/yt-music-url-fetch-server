const express = require('express');
const ytdl = require('ytdl-core');
const app = express();

// API endpoint to retrieve YouTube video audio URL
app.get('/api/audio', async (req, res) => {
  const { videoId } = req.query;

  try {
    if (!ytdl.validateID(videoId)) {
      throw new Error('Invalid YouTube video ID');
    }

    const info = await ytdl.getInfo(videoId);
    const format = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });

    if (!format || !format.url) {
      throw new Error('No audio URL found for the video');
    }

    res.json({ audioUrl: format.url });
  } catch (error) {
    console.error('Error retrieving audio URL:', error);
    res.status(500).json({ error: 'Failed to retrieve audio URL' });
  }
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
