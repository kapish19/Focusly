import axios from 'axios';

const SPOTIFY_CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
let accessToken = '';
let tokenExpiration = 0;

const getAccessToken = async () => {
  if (Date.now() < tokenExpiration) return accessToken;

  try {
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

    accessToken = response.data.access_token;
    tokenExpiration = Date.now() + (response.data.expires_in * 1000);
    return accessToken;
  } catch (error) {
    console.error("Error getting Spotify token:", error);
    throw error;
  }
};

export const generatePlaylist = async (mood) => {
  try {
    const token = await getAccessToken();
    let query = '';
    
    switch(mood) {
      case 'focus':
        query = 'genre:lofi+OR+genre:classical+OR+genre:ambient';
        break;
      case 'relax':
        query = 'genre:ambient+OR+genre:piano+OR+genre:nature';
        break;
      case 'energize':
        query = 'genre:electronic+OR+genre:pop+OR+genre:workout';
        break;
      case 'chill':
        query = 'genre:chill+OR+genre:jazz+OR+genre:indie';
        break;
      default:
        query = 'genre:lofi';
    }

    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${query}&type=track&limit=5`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );

    return response.data.tracks.items.map(track => ({
      title: track.name,
      artist: track.artists.map(a => a.name).join(', '),
      duration: msToMinutes(track.duration_ms),
      url: track.external_urls.spotify
    }));
  } catch (error) {
    console.error("Error generating playlist:", error);
    return [];
  }
};

const msToMinutes = (ms) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds.padStart(2, '0')}`;
};