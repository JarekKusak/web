import { ChevronDownIcon } from "@heroicons/react/outline";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { shuffle } from "lodash"; // plugin knihovna
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";
import Songs from "./Songs";

// barvy na pozadí
const barvy = [
    "from-indigo-500",
    "from-blue-500",
    "from-green-500",
    "from-red-500",
    "from-yellow-500",
    "from-pink-500",
    "from-purple-500",
];

function Center() {
  
    const {data: session} = useSession(); // získané data o uživateli
    const [color, setColor] = useState(null);
    const spotifyApi = useSpotify();
    const playlistId = useRecoilValue(playlistIdState); // readonly verze "globální" proměnné
    const [playlist, setPlaylist] = useRecoilState(playlistState);

    useEffect(() => { // useEffect nahrazují lifecycle metody
        setColor(shuffle(barvy).pop()); // zamíchá pole barev a jednu vybere
    }, [playlistId]); // react vymoženost, náhražka "lifecycle" metod, rerender pouze jednou nebo při změně playlistId
    
    useEffect(() => {
        spotifyApi.getPlaylist(playlistId).then((data) => {
            setPlaylist(data.body);
        }).catch(error => console.log("něco se stalo", error));
    }, [spotifyApi, playlistId])
    
    console.log(playlist);
    return (
    // vyplnění maximálního množství místa
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
        <header className="absolute top-5 right-8">
            <div className="flex items-center bg-black text-white space-x-3 opacity-90
            hover:opacity-80 cursor-pointer rounded-full p-1 pr-2" onClick={signOut}>
                <img 
                    className="rounded-full w-10 h-10" 
                    src={session?.user.image} 
                    alt="uživatelská profilovka"
                />
                <h2>{session?.user.name}</h2>
                <ChevronDownIcon className="h-5 w-5"/>
            </div>
        </header>
        <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}>
            {/* vytáhne první nalezený obrázek k playlistu (pokud existuje) */}
            <img className="h-44 w-44 shadow-2xl" src={playlist?.images?.[0].url}/> 
            <div>
                <p>PLAYLIST</p>
                {/* opět mobile first, výchozí hodnota velikosti textu na mobilech je 2xl, pro větší zařízení se zvětšuje */}
                <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">{playlist?.name}</h1>
            </div>           
        </section>

        <div>
            <Songs/>
        </div>
    </div>
  )
}

export default Center;