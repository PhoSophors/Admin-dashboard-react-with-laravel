import { Avatar } from "flowbite-react"
import { useStateContext } from "../../context/ContextProvider";
import { useEffect } from "react";
import axiosClient from "../../axios-client";

const Header = () => {
    const { user, setUser } = useStateContext();

    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setUser(data);
        });
    }, []);


  return (
    <header id="header" className="header">
        <div> Header </div>
        <div className="flex text-center items-center flex-wrap gap-2">
            {user.name}
            <Avatar
                alt="avatar of Jese"
                className="cursor-pointer"
                img="https://png.pngtree.com/png-clipart/20200224/original/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_5247852.jpg"
                rounded
            />
        </div>
    </header>
  )
}

export default Header
