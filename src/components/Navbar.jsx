import {logUser} from "../redux/loggedUserSlice";
import {Avatar, Button} from "@mui/material";
import Searchbar from "./Searchbar";
import Login from "./Login";
import {useSelector} from "react-redux";
import {deepPurple} from "@mui/material/colors";
import {useEffect} from "react";
import AvatarList from "./AvatarList";

const Navbar = () => {
    const loggedUser = useSelector(state => state.loggedUser);

    return(
        <div className="fixed top-0 left-0 right-0 w-screen h-16 flex flex-row bg-gray-900 text-white z-40 navbar-color justify-around items-center">
            <div>
                <p>Darek</p>
            </div>
            <div>
                <Searchbar/>
            </div>
            <div>
                {loggedUser.isLoggedIn ?
                    <AvatarList name={loggedUser.loggedUser.username}/>
                    :
                    <Login/>
                }
            </div>

        </div>
    )
};
export default Navbar;
