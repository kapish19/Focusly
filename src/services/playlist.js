import axios from 'axios';
import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
const SPOTIFY_CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

let spotifyAccessToken = '';
let spotifyTokenExpiration = 0;

// Step 1: Get Spotify Access Token
const getSpotifyAccessToken = async () => {
  if (Date.now() < spotifyTokenExpiration) return spotifyAccessToken;

  const response = await axios.post(
    'https://accounts.spotify.com/api/token',
    'grant_type=client_credentials',
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`)}`
      }
    }
  );

  spotifyAccessToken = response.data.access_token;
  spotifyTokenExpiration = Date.now() + (response.data.expires_in * 1000);
  return spotifyAccessToken;
};

// Step 2: Generate song suggestions using Gemini
const getGeminiPlaylist = async (mood) => {
  const prompt = `
Generate a list of 5 songs (title and artist) that match the mood "${mood}".
Respond in strict JSON format like:
[
  { "title": "Blinding Lights", "artist": "The Weeknd" },
  ...
]`;

  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' });
  const result = await model.generateContent(prompt);
  const text = result.response.text().trim();

  const jsonStart = text.indexOf('[');
  const jsonEnd = text.lastIndexOf(']');
  const jsonString = text.slice(jsonStart, jsonEnd + 1);

  return JSON.parse(jsonString);
};

// Step 3: Search Spotify for each track
const searchSpotifyTracks = async (tracks) => {
  const token = await getSpotifyAccessToken();
  const searchResults = [];

  for (const track of tracks) {
    const query = encodeURIComponent(`${track.title} ${track.artist}`);
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/search?q=${query}&type=track&limit=1`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      const item = response.data.tracks.items[0];
      if (item) {
        searchResults.push({
          title: item.name,
          artist: item.artists.map(a => a.name).join(', '),
          duration: msToMinutes(item.duration_ms),
          url: item.external_urls.spotify
        });
      }
    } catch (err) {
      console.error(`Error searching Spotify for "${track.title}" by ${track.artist}:`, err);
    }
  }

  return searchResults;
};

// Convert ms to mm:ss
const msToMinutes = (ms) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds.padStart(2, '0')}`;
};

// 🎵 Final Exported Function
export const generatePlaylist = async (mood) => {
  try {
    const geminiTracks = await getGeminiPlaylist(mood);
    const spotifyTracks = await searchSpotifyTracks(geminiTracks);
    return spotifyTracks.length ? spotifyTracks : [{
      title: 'Lofi Chill',
      artist: 'Fallback Beats',
      duration: '3:00',
      url: 'https://open.spotify.com/track/xyz123'
    }];
  } catch (error) {
    console.error('Playlist generation failed:', error);
    return [{
      title: 'Lofi Chill',
      artist: 'Fallback Beats',
      duration: '3:00',
      url: 'https://open.spotify.com/track/xyz123'
    }];
  }
};
