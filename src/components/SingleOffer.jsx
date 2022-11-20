import '../App.css';
import {Button} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {setActiveOffer} from "../redux/activeOfferSlice";
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { BiTime } from 'react-icons/bi';
import {setCurrentSite} from "../redux/currentSiteController";

const SingleOffer = (props) => {
    const dispatch = useDispatch();
    const currentSiteController = useSelector(state => state.currentSiteController)
    const availableSites = useSelector(state => state.availableSites);

    return(
        <div className='border-all-around offer-color flex gap-3'>
            <div>
                <img className='offer-image p-1' src={props.img}/>
            </div>
            <div className='flex flex-col'>
                <h1 className='font-white-color'>{props.name}</h1>
                <div className='font-white-color flex-row'>
                    <HiOutlineLocationMarker size={24} className='block'/>
                    <p>{props.desc}</p>
                </div>
                <div className='font-white-color'>
                    <BiTime size={24}/>
                    <p>{props.desc}</p>
                </div>

                <Button variant="contained" onClick={() => {
                    dispatch(setActiveOffer(props.offer));
                    dispatch(setCurrentSite(currentSiteController.availableSites.MaximizedOffer));
                }}>see more</Button>
            </div>
        </div>
    )
};
export default SingleOffer;