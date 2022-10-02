import { currentTrackIdState } from "../atoms/songAtom";
import useSpotify from "./useSpotify";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";

function useSongInfo() {
  const spotifyApi = useSpotify();
  const [currentIdTrack, setCurrentIdTrack] = useRecoilState(currentTrackIdState);
  const [songInfo, setSongInfo] = useState(null);  
  useEffect(() => {
    const fetchSongInfo = async() => {
        // pokud byla vybrána písnička...
        if (currentIdTrack) {
            // asynchronní metoda na získání dat o písničce
            // vyšleme žádost na písničku, proběhne autorizace (bearer = nosič nese platný token)
            const trackInfo = await fetch(
                `https://api.spotify.com/v1/tracks/${currentIdTrack}`,
                {
                        headers: {
                        Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
                    }
                }
            ).then(res => res.json()); // vrátí získané data o písničce jako json
        
            setSongInfo(trackInfo);      
        }
    }

    fetchSongInfo();
  }, [currentIdTrack, spotifyApi])
  
  return songInfo;
}

export default useSongInfo;