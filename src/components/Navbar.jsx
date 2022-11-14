import {setActiveOffer} from "../redux/activeOfferSlice";
import {Button} from "@mui/material";
import Searchbar from "./Searchbar";

const Navbar = () => {

    return(
        <div className="fixed top-0 left-0 right-0 w-screen h-16 flex flex-row bg-gray-900 text-white z-40 navbar-color justify-around items-center">
            <div>
                <p>Darek</p>
            </div>
            <div>
                <Searchbar/>
            </div>
            <div>
                <Button variant="contained" onClick={() => {
                    alert('logging in!');
                }}>log in</Button>
            </div>

        </div>
    )
};
export default Navbar;
