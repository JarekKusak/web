import { signIn, useSession } from "next-auth/react"
import { useEffect } from "react";
import spotifyApi from "../lib/spotify";
// api, veškerá hrací logika písniček atp.
function useSpotify() {
    const { data: session, status } = useSession(); 
    
    // spustí se při prvním renderu nebo při změně session
    useEffect(() => {
        if (session) {
            if (session.error === 'RefreshAccessTokenError') {
                signIn();
            } // pokud selže refresh tokenu (viz [...nextauth].js), uživatel se vrátí na login page
            
            spotifyApi.setAccessToken(session.user.accessToken); // poskytnutí platného tokenu objektu SpotifyApi 
            
        }
    }, [session]);
    
    return spotifyApi;
}

export default useSpotify;