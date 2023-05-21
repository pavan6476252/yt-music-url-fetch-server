// const express = require('express');
// const ytdl = require('ytdl-core');
// const cors = require('cors');
// const app = express();

// // Enable CORS
// app.use(cors());

// // API endpoint to retrieve YouTube video audio URL
// app.get('/api/audio', async (req, res) => {
//   const { videoId } = req.query;

//   try {
//     if (!ytdl.validateID(videoId)) {
//       throw new Error('Invalid YouTube video ID');
//     }

//     const info = await ytdl.getInfo(videoId);
//     const format = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });

//     if (!format || !format.url) {
//       throw new Error('No audio URL found for the video');
//     }

//     res.json({ audioUrl: format.url });
//   } catch (error) {
//     console.error('Error retrieving audio URL:', error);
//     res.status(500).json({ error: 'Failed to retrieve audio URL' });
//   }
// });

// app.listen(4000, () => {
//   console.log('Server is running on port 4000');
// });

// const express = require('express');
// const ytdl = require('ytdl-core');
// const cors = require('cors');

// const app = express();
// const port = 4000;

// // Enable CORS
// app.use(cors());

// app.get('/api/audio', async (req, res) => {
//   const { videoId } = req.query;

//   if (!videoId) {
//     return res.status(400).json({ error: 'Missing video ID' });
//   }

//   try {
//     if (!ytdl.validateID(videoId)) {
//       throw new Error('Invalid YouTube video ID');
//     }

//     const info = await ytdl.getInfo(videoId);
//     const format = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });

//     if (!format || !format.url) {
//       throw new Error('No audio URL found for the video');
//     }

//     const audioUrl = format.url;

//     // If you want to send just the audio URL as a response:
//     // res.json({ audioUrl });

//     // If you want to download the audio file and send it as a response:
//     res.setHeader('Content-Disposition', 'attachment; filename="audio.m4a"');
//     res.setHeader('Content-Type', 'audio/m4a');
//     ytdl(videoId, { format: 'm4a' }).pipe(res);
//   } catch (error) {
//     console.error('Error extracting audio:', error);
//     res.status(500).json({ error: 'Failed to extract audio' });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });


const express = require('express');
const ytdl = require('ytdl-core');
const cors = require('cors');

const app = express();
const port = 4000;

// Enable CORS
app.use(cors());

app.get('/api/audio', async (req, res) => {
  const { videoId } = req.query;

  if (!videoId) {
    return res.status(400).json({ error: 'Missing video ID' });
  }

  try {
    if (!ytdl.validateID(videoId)) {
      throw new Error('Invalid YouTube video ID');
    }

    const info = await ytdl.getInfo(videoId);
    const format = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });

    if (!format || !format.url) {
      throw new Error('No audio URL found for the video');
    }

    const audioUrl = format.url;
    res.json({ audioUrl });
  } catch (error) {
    console.error('Error extracting audio:', error);
    res.status(500).json({ error: 'Failed to extract audio' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
