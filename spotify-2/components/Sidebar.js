import React, { useEffect } from 'react'
import{
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon,
} from "@heroicons/react/outline"
import { signOut, useSession } from 'next-auth/react'
import { useState } from "react";
import useSpotify from '../hooks/useSpotify';
import { useRecoilState } from 'recoil';
import { playlistIdState } from '../atoms/playlistAtom';


function Sidebar() {
  const spotifyApi = useSpotify();
  const {data: session, status} = useSession(); // uchování stavu
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
  console.log(session); // vypsání dat do konzole o přihlášeném uživateli
  console.log('vybral jsi >>>', playlistId);
  // metoda useEffect nahrazuje LifeCycle metody, spustí se při prvním renderu a změní se pokaždé při změně session nebo spotifyApi
  useEffect(() => {
      if(spotifyApi.getAccessToken()){ // pokud byl access token nastaven, tak se nahrají playlisty uživatele do pole playlists
        spotifyApi.getUserPlaylists().then((data) => {
          setPlaylists(data.body.items);
        });
      }
  }, [session, spotifyApi]);

  console.log(playlists);
  return (    
    <div className='text-gray-300 p-5 text-xs lg:text-sm border-r border-gray-900 
    overflow-y-scroll scrollbar-hide h-screen 
    sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex pb-36'>
        {/* padding 5, mobile first => extra small text na mobilu (atd.), border na pravé straně, pokud množství položek přesáhne výšku stránky => scrollování, (scrollbar zůstane skrytý - plugin) 
        výška scrollu - screen, maximální šířky..., jako výchozí je sidebar schovaný, při breakpointu medium se zobrazí*/}     
        {/* spacing elementů po y souř. */}
        <div className='space-y-4'>
         

          {/* flex = skládání itemů do sloupce, vycentrované itemy, lehká mezera po x souřadnici, při přejetí myší se změní barva textu na bílo*/}
          <button className='sidePolozky'>
            {/* tailwindcss: výška 5, šířka 5 */}
            <HomeIcon className='h-5 w-5'/>
            <p>Domů</p>
          </button>   
          <button className='sidePolozky'>
            <SearchIcon className='h-5 w-5'/>
            <p>Hledat</p>
          </button>   
          <button className='sidePolozky'>
            <LibraryIcon className='h-5 w-5'/>
            <p>Tvoje knihovna</p>
          </button>    
          {/* horizontal row, horní border s custom value 0.1px (se syntaxí hranatých závorek) */}
          <hr className='border-t-[0.1px] border-gray-900'/>

          {/* flex = skládání itemů do sloupce, vycentrované itemy, lehká mezera po x souřadnici, při přejetí myší se změní barva textu na bílo*/}
          <button className='sidePolozky'>
            {/* tailwindcss: výška 5, šířka 5 */}
            <PlusCircleIcon className='h-5 w-5'/>
            <p>Vytvořit playlist</p>
          </button>   
          <button className='sidePolozky'>
            <HeartIcon className='h-5 w-5'/>
            <p>Skladby, které se ti líbí</p>
          </button>     
          {/* horizontal row, horní border s custom value 0.1px (se syntaxí hranatých závorek) */}
          <hr className='border-t-[0.1px] border-gray-900'/>

          {/* Playlisty... */}
          {playlists.map((playlist) => (
            <p onClick={() => setPlaylistId(playlist.id)} key={playlist.id} className='cursor-pointer hover:text-white'>
            {playlist.name}
            </p>
          ))}

          <hr className='border-t-[0.1px] border-gray-900'/>
          <p>Autor: Jaroslav Kusák 4.C</p>
                             
        </div>
    </div>
  )
}

export default Sidebar;