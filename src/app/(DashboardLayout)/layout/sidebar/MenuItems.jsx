
import { LiaTruckMovingSolid } from "react-icons/lia";
import { uniqueId } from "lodash";
import { PiUser } from "react-icons/pi";
import { IoMdNotifications } from "react-icons/io";
import { GoHome } from "react-icons/go";
import { RiContactsBook3Line } from "react-icons/ri";
import { LiaListAltSolid } from "react-icons/lia";
import { PiCarBatteryBold } from "react-icons/pi";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { MdOutlineEnergySavingsLeaf } from "react-icons/md";
import { LiaKeyboardSolid } from "react-icons/lia";

const Menuitems = [
  {
    id: uniqueId(),
    title: "Dashboard",
    icon: GoHome,
    href: "/dashboard",
    role: ["Admin", "Agent"],
  },
  {
    id: uniqueId(),
    title: "Fleet Management",
    icon:LiaTruckMovingSolid,
    href: "/fleetManagement",
    role: ["Admin", "Agent"],
  },
  {
    id: uniqueId(),
    title: "CS/SS Management",
    icon:  PiCarBatteryBold ,
    href: "/csManagement",
    role: ["Admin", "Agent"],
  },
  {
    id: uniqueId(),
    title: "CS/SS Efficiency",
    icon:MdOutlineEnergySavingsLeaf ,
    href: "/energyEfficiency",
    role: ["Admin", "Agent"],
  },
  {
    id: uniqueId(),
    title: "Battery Analysis",
    icon:  LiaKeyboardSolid  ,
    href: "/batteryAnalysis",
    role: ["Admin", "Agent"],
  },
  {
    id: uniqueId(),
    title: "Scheduling",
    icon: LiaListAltSolid  ,
    href: "/scheduling",
    role: ["Admin", "Agent"],
  },
  {
    id: uniqueId(),
    title: "Tariff Management",
    icon: MdOutlineCurrencyRupee ,
    href: "/tariffManagement",
    role: ["Admin", "Agent"],
  },
  {
    id: uniqueId(),
    title: "Customer Management",
    icon:  RiContactsBook3Line ,
    href: "/customerManagement",
    role: ["Admin", "Agent"],
  },
  {
    id: uniqueId(),
    title: "EIM Subscriptions",
    icon: IoMdNotifications ,
    href: "/eimSubscriptions",
    role: ["Admin", "Agent"],
  },
  {
    id: uniqueId(),
    title: "User Management",
    icon: PiUser ,
    href: "/userManagement",
    role: ["Admin", "Agent"],
  },

];

export default Menuitems;
