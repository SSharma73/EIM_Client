export { IoIosCloseCircleOutline } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import { MdOutlineArrowOutward } from "react-icons/md";
import { MdAccessTimeFilled } from "react-icons/md";
import { MdOutlineVisibility } from "react-icons/md";
import { MdOutlineVisibilityOff } from "react-icons/md";
export const EyeIcon=()=>{
    return <IoEyeOutline color="rgba(14, 1, 71, 1)"/>
}
export const ArrowOutward=()=>{
    return <MdOutlineArrowOutward color="fff" size={"20px"}/>
}
export const AccessTimeFilled=()=>{
    return <MdAccessTimeFilled sx={{ verticalAlign: "middle", p: "4px",size:"10px" }}/>
}
export const Visibility=()=>{
    return <MdOutlineVisibility color="#fff"/>
}
export const VisibilityOff=()=>{
    return < MdOutlineVisibilityOff color="fff"/>
}