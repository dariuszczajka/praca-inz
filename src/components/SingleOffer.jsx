import '../App.css';
import {Button} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {setActiveOffer} from "../redux/activeOfferSlice";
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { BiTime } from 'react-icons/bi';
import {setCurrentSite} from "../redux/currentSiteControllerSlice";
import {useEffect} from "react";

const SingleOffer = (props) => {
    const dispatch = useDispatch();
    const currentSiteController = useSelector(state => state.currentSiteController)
    const availableSites = useSelector(state => state.availableSites);

    function timeSince(date) {

        let seconds = Math.floor((new Date() - date) / 1000);

        let interval = seconds / 31536000;

        if (interval > 1) {
            return Math.floor(interval) + " lat";
        }
        interval = seconds / 2592000;
        if (interval > 1) {
            return Math.floor(interval) + " miesięcy";
        }
        interval = seconds / 86400;
        if (interval > 1) {
            return Math.floor(interval) + " dni";
        }
        interval = seconds / 3600;
        if (interval > 1) {
            return Math.floor(interval) + " godzin";
        }
        interval = seconds / 60;
        if (interval > 1) {
            return Math.floor(interval) + " minut";
        }
        return Math.floor(seconds) + " sekund";
    }

    function createLocationString(locale) {
        let localeString = '';
        if(locale.suburb !== undefined){
            localeString += locale.suburb + ', '
        } else if(locale.state !== undefined) {
            localeString += locale.state + ', '
        }

        if(locale.city !== undefined){
            localeString += locale.city + ', '
        }

        if(locale.country !== undefined){
            localeString += locale.country
        }

        if(localeString === ''){
            localeString = 'Nieznana lokalizacja'
        }

        return localeString;
    }

    return(
        <div className='border-all-around offer-color flex gap-3'>
            <div>
                <img className='offer-image p-1' src={props.img}/>
            </div>
            <div className='flex flex-col'>
                <h1 className='font-white-color'>{props.name}</h1>
                <div className='font-white-color flex-row'>
                    <BiTime size={24}/>
                    <p>{'Dodano ' + timeSince(new Date(props.offer.postDate)) + ' temu'}</p>
                </div>
                <div className='font-white-color'>
                    <HiOutlineLocationMarker size={24} className='block'/>
                    {props.offer.locationDetails !== undefined &&
                        <p>{createLocationString(props.offer.locationDetails[0].components)}</p>}
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