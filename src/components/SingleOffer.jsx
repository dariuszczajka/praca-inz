import '../App.css';
import {Box, Button} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {setActiveOffer} from "../redux/activeOfferSlice";
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { BiTime } from 'react-icons/bi';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {setCurrentSite} from "../redux/currentSiteControllerSlice";
import {useEffect} from "react";
import Typography from "@mui/material/Typography";
import LocationCityIcon from '@mui/icons-material/LocationCity';

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
        <div className='offer-color flex gap-3 rounded-lg cursor-pointer'
            data-testid="single-offer"
            onClick={() => {
                dispatch(setActiveOffer(props.offer));
                dispatch(setCurrentSite(currentSiteController.availableSites.MaximizedOffer));
            }}>
            <Box
                component="img"
                sx={{
                    height: 233,
                    width: 350,
                    maxHeight: { xs: 233, md: 167 },
                    maxWidth: { xs: 350, md: 250 },
                    objectFit: 'cover',
                    backgroundColor: '#454a54'
                }}
                alt="This offer has no photo"
                src={props.img}
            />
            <div className='flex-1 flex-col gap-1 width-full'>
                <div className='flex flex-wrap-reverse flex-row width-full justify-between mr-3'>
                    <h1 className='font-white-color' data-testid="offer-name">{props.name}</h1>
                    <div className='font-cta-color '>
                        <Typography variant="h3" class='inline-block pt-2'>{props.offer.price + ' zł'} </Typography>
                    </div>
                </div>
                <div className='font-white-color flex-row margin-0'>
                    <AccessTimeIcon size={24}/>
                    <Typography class='inline-block pt-2 pl-2'>{'Dodano ' + timeSince(new Date(props.offer.postDate)) + ' temu'}</Typography>
                </div>
                <div className='font-white-color'>
                    <LocationCityIcon size={24}/>
                    {props.offer.locationDetails !== undefined &&
                        <Typography class='inline-block pt-2 pl-2'>{createLocationString(props.offer.locationDetails[0].components)}</Typography>}
                </div>
            </div>
        </div>
    )
};
export default SingleOffer;