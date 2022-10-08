function HeaderIcon({Icon, active}){  
  return (              
        <div className="flex items-center text-gray-500 cursor-pointer md:px-10 sm:h-14 md:hover:bg-gray-100 rounded-xl active:border-b-2 active:border-blue-500 group">
          {/*sm značí smalldevice, mx maximumdevice */}
          {/* group značí, že všechny vnořené elementy řadíme do jedné společné skupiny, tedy na ni platí hover*/}
          {/* zpětné uvozovky na syntax JSX!!*/}
          <Icon className={`h-5 text-center sm:h-7 mx:auto group-hover:text-blue-500 ${active && 'text-blue-500'}`}/>
        </div>
    )
}

export default HeaderIcon;