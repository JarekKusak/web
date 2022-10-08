import Image from "next/image";

function Storycard({name, src, profile}) {
  return (
    <div className="relative h-14 w-14 md:h-20 md:w-20 lg:h-56 lg:w-32 cursor-pointer overflow-x p-3 transition duration-200 transform ease-in hover:scale-105 hover:animate-pulse">
      {/* na malé obrazovce se ze "story" stane kolečko a smaže se ikonka profilovky, na velké obrazovce vznikne obdélník s kulatými rohy a profilovkou v levém horním rohu, při najetí myšky na "story" nastane animace*/ }
      <Image
      className="absolute opacity-0 lg:opacity-100 rounded-full z-50 top-10"
      src={profile}
      layout="fixed"
      objectFit="cover"
      width={40}
      height={40}
      />
      <Image
      className="object-cover filter-brightness-75 rounded-full lg:rounded-3xl"
      src={src}
      layout="fill"
      />
    </div>
  )
}

export default Storycard;

