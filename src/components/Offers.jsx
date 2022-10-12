import '../App.css';
import SingleOffer from "./SingleOffer";
import {Stack} from "@mui/material";

const Offers = () => {
    return(
        <Stack className='offers-container'>
            <SingleOffer/>
            <SingleOffer/>
            <SingleOffer/>
        </Stack>
    )
};
export default Offers;
