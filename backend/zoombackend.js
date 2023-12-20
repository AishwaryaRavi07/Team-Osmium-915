
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3001;

app.use(express.json());

app.post('/scheduleMeeting', async (req, res) => {
  try {
    const zoomApiKey = "5UIW8Yc8SwqdTAOKmWRypw";
    const zoomApiSecret = "ngZYISuygf5p1rGJRCiZ18K7x4qBLISb";

    if (!zoomApiKey || !zoomApiSecret) {
        return res.status(500).json({ error: 'Zoom API key or secret is missing' });
      }

      const accessTokenResponse = await axios.post(
        `https://zoom.us/oauth/token?grant_type=client_credentials&client_id=${zoomApiKey}&client_secret=${zoomApiSecret}`
      );

      const accessToken = accessTokenResponse.data.access_token;

    
    const response = await axios.post(
      'https://api.zoom.us/v2/users/me/meetings',
      {
        topic: 'New Meeting',
        type: 2, 
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    // Handle the Zoom API response
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
