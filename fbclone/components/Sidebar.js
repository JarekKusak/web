import { useSession } from "next-auth/client"
import {
  ChevronDownIcon,
  ShoppingBagIcon,
  UserGroupIcon,
} from "@heroicons/react/outline"
import {
  CalendarIcon,
  ClockIcon,
  DesktopComputerIcon,
  UsersIcon,
} from "@heroicons/react/solid"
import SidebarRow from "./SidebarRow";

function Sidebar() {
  const [session, loading] = useSession();
  return (
      <div className="p-2 mt-5 max-w-[600px] xl:min-w-[300px]">
        <SidebarRow src={session.user.image} title={session.user.name}/>
        <SidebarRow Icon={UsersIcon} title="Přátelé"/>
        <SidebarRow Icon={UserGroupIcon} title="Skupiny"/>
        <SidebarRow Icon={CalendarIcon} title="Události"/>
        <SidebarRow Icon={ClockIcon} title="Vzpomínky"/>
        <SidebarRow Icon={ShoppingBagIcon} title="Marketplace"/>
        <SidebarRow Icon={DesktopComputerIcon} title="Watch"/>  
        <SidebarRow Icon={ChevronDownIcon} title="Více"/>
      </div>
    )       
}

export default Sidebar