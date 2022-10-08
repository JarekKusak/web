import Image from "next/image";
import {
  BellIcon,
  ChatIcon,
  ChevronDownIcon,
  HomeIcon,
  UserGroupIcon,
  ViewGridIcon,
} from "@heroicons/react/solid"
import {
  FlagIcon,
  PlayIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline"
import HeaderIcon from "./HeaderIcon";
import {useSession, signOut} from "next-auth/client";

function Header() {
  const [session] = useSession();
  
  return(
    <div className="sticky top-0 z-50 bg-white flex items-center p-2 lg:px-5 shadow-md">    
    {/*Header bude mít stálou pozici nahoře, bude vepředu (50 po souřadnici z), aby nezakrývaly ostatní elementy*/}
      {/*Left*/}
      <div className="flex items-center">        
        {/* Speciální Image tag z knihoven Next.js (rychlejší načítání)*/}
        <Image 
        src="https://links.papareact.com/5me" 
        width={40} 
        height={40} 
        layout="fixed" 
        />
        {/* 
            využití Tailwind CSS:
            flex - skládání vedle sebe, margin-left 2, ... , padding 2
        */}
        <div className="flex ml-2 items-center rounded-full bg-gray-100 p-2">
          {/* 
            využití Tailwind CSS:
            využití ikonek ze stránky HeroIcons + Tailwind CSS prvek velikosti
          */}
          <SearchIcon className="h-6 text-gray-600"/>
          <input className="hidden md:inline-flex flex ml-2 items-center bg-transparent outline-none placeholder-gray-500 flex-shrink" type="text" placeholder="Hledejte na Facebooku"/>
        </div>
      </div>
      
      {/*Center*/}
      {/* flex-grow = zaplnění extra místa, pokud možné */}
      <div className="flex justify-center flex-grow">
        {/* Přístup Tailwind CSS je mobile first, tedy na mobilu (na menší obrazovce) bude spaceování mezi ikony hodnota 6, s větší obrazovkou bude růst až po hodnotu 2; md = medium*/}
        <div className="flex space-x-6 md:space-x-2">
          <HeaderIcon active={true} Icon={HomeIcon}/>
          <HeaderIcon Icon={FlagIcon}/>
          <HeaderIcon Icon={PlayIcon}/>
          <HeaderIcon Icon={ShoppingCartIcon}/>
          <HeaderIcon Icon={UserGroupIcon}/>
        </div>
      </div>

      {/*Right*/}
      {/* Na malém zařízení nastane drobný spacing (na x souř.) mezi elementy a budou se držet vpravo (na konci) */}
      {/*session.user.image je jeden z prvků poskytujících facebookem (profilová fotka uživatele)*/}
      <div className="flex items-center sm:space-x-2 justify-end">
        {/* Profile pic */}
        <Image
        onClick={signOut}
        className="rounded-full cursor-pointer"
        src={session.user.image}
        width="40"
        height="40"
        layout="fixed"
        />

        {/* pr-3 = padding on right */}
        <p className="whitespace-nowrap font-semibold pr-3">{session.user.name}</p>
        <ViewGridIcon className="icon"/>
        <ChatIcon className="icon"/>
        <BellIcon className="icon"/>
        <ChevronDownIcon className="icon"/>
      </div>
      
    </div>   
  );
}

export default Header;