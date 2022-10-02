import { getProviders, signIn } from "next-auth/react";
import logo from "../obrazky/spotifyLogo.png"; 
import Image from 'next/image';

function login({providers}) {
  return (
    <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
      {/* flexibilní rozměry, řazení pod sebe, zarovnání itemů na střed, černé pozadí, min výška obrazovky - celá obrazovka (kvůli vyplnění černou barvou), využití celé šířky, horizontální zarovnání*/}
      
      {/* Image je komponenta z frameworku NextJs, je to "optimalizovanější" obrázek, rychleji se načítá atp. */}
        {/* má svoji speciální syntaxi parametrů, TailwindCSS na něj nefunguje */}
        <Image width={200} height={200} src={logo} alt="spotify logo"></Image>

        {/* projede pole Providerů, pro každý vytvoří zvlášť možnost přihlášení */}
        {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              {/* background color - (zelená), bílý text, padding-5 a zakulatit */}
              {/* event onClick spustí naimportovanou metodu signIn (z next-auth), která jako parametr bere provider id a stránka, na kterou se chci dostat, v našem případě homepage (psáno pouze "/")*/}
              <button className="bg-[#18D860] text-white p-5 rounded-full"
                onClick={() => signIn(provider.id, { callbackUrl:"/"})}>
                  Přihlásit se přes {provider.name}
              </button>
            </div>
        ))}

        <p className="text-white pt-5">Autor: Jaroslav Kusák 4.C</p>
    </div>
  );
}

export default login;
{/* spuštění na serveru (pokaždé) při návštěvě login stránky = server side rendering*/}
export async function getServerSideProps(){
  const providers = await getProviders(); // získání všech providerů při přihlášení

  return {
    props: {
      providers,
    }
  };
}