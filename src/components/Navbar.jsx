import {logUser} from "../redux/loggedUserSlice";
import {Avatar, Button} from "@mui/material";
import Searchbar from "./Searchbar";
import Login from "./Login";
import {useDispatch, useSelector} from "react-redux";
import {deepPurple} from "@mui/material/colors";
import {useEffect} from "react";
import LoggedUserMenu from "./LoggedUserMenu";
import {setCurrentSite} from "../redux/currentSiteControllerSlice";
import {removeActiveFilters} from "../redux/filterSlice";

const Navbar = () => {
    const loggedUser = useSelector(state => state.loggedUser);
    const dispatch = useDispatch();
    const currentSiteController = useSelector(state => state.currentSiteController)

    return(
        <div className="fixed top-0 left-0 right-0 w-screen h-16 flex flex-row bg-gray-900 text-white z-40 navbar-color justify-around items-center">
            <div onClick={() => {
                dispatch(setCurrentSite(currentSiteController.availableSites.AllOffers));
                dispatch(removeActiveFilters());
            }}>
                <img src="https://i.imgur.com/uqHAuFL.png" className="w-56"/>
            </div>
            <div>
                <Searchbar/>
            </div>
            <div>
                {loggedUser.isLoggedIn ?
                    <LoggedUserMenu name={loggedUser.loggedUser.username}/>
                    :
                    <Login/>
                }
            </div>

        </div>
    )
};
export default Navbar;
