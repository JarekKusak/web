import SpotifyWebApi from "spotify-web-api-node";

 // povolení
 // ne všechny se využívají 
const scopes = [
    "user-read-email",
    "playlist-read-private",
    "playlist-read-collaborative",
    "user-read-email",
    "streaming",
    "user-read-private",
    "user-library-read",
    "user-top-read",
    // "user-library-modify", // možnost úpravy playlistu
    "user-modify-playback-state",
    "user-read-playback-state",
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-follow-read",
].join(','); // dlouhý řetězec oddělený čárkami

const params = { // objekt, který následně nahrajeme s novou URL adresou
    scope: scopes,
};

const queryParamString = new URLSearchParams(params); // built-in js objekt

const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString.toString()}`;

const spotifyApi = new SpotifyWebApi({ // založení funkčního objektu Spotify API
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
})

export default spotifyApi;

export {LOGIN_URL};