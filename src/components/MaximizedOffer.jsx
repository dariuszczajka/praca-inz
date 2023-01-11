import {useDispatch, useSelector} from "react-redux";
import {Box, Button} from "@mui/material";
import {removeActiveOffer} from "../redux/activeOfferSlice";
import {setMapCurrentLatLon, setMapCurrentZoomLvl} from "../redux/mapDataSlice";
import {setCurrentSite} from "../redux/currentSiteControllerSlice";
import Carousel from 'react-bootstrap/Carousel';
import Typography from "@mui/material/Typography";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import SendEmail from "./SendEmail";

const MaximizedOffer = () => {
    const activeOffer = useSelector(state => state.activeOffer);
    const currentSiteController = useSelector(state => state.currentSiteController)
    const dispatch = useDispatch();

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
        <div className='offers-container overflow-auto w-full'>
            <div className='flex flex-col w-full'>
                <Carousel itemsToShow={1} className='self-center'>
                    {activeOffer.activeOffer.img.map((image) => {
                        return <Carousel.Item>
                            <Box
                                component="img"
                                sx={{
                                    height: '50%',
                                    width: '100%',
                                    maxHeight: { xs: 700, md: 600 },
                                    maxWidth: { xs: 700, md: 500 },
                                    objectFit: 'cover',
                                    backgroundColor: '#454a54'
                                }}
                                alt="This offer has no photo"
                                src={image}
                            />
                        </Carousel.Item>})
                    }
                </Carousel>
            </div>

            <div className='pl-5'>
                <h1 className='font-white-color'>{activeOffer.activeOffer.name}</h1>
                <div className='font-cta-color '>
                    <Typography variant="h3" class='inline-block pt-2'>{activeOffer.activeOffer.price + ' zł'} </Typography>
                </div>
                <p className='font-white-color'>{activeOffer.activeOffer.desc}</p>

                <div className='font-white-color flex-row margin-0'>
                    <AccessTimeIcon size={24}/>
                    <Typography class='inline-block pt-2 pl-2'>{'Dodano ' + timeSince(new Date(activeOffer.activeOffer.postDate)) + ' temu'}</Typography>
                </div>
                <div className='font-white-color'>
                    <LocationCityIcon size={24}/>
                    {activeOffer.activeOffer.locationDetails !== undefined &&
                        <Typography class='inline-block pt-2 pl-2'>{createLocationString(activeOffer.activeOffer.locationDetails[0].components)}</Typography>}
                </div>

                <div className='font-white-color'>
                    <CallIcon size={24}/>
                    <Typography class='inline-block pt-2 pl-2'>+48 516 951 212</Typography>
                </div>

                <div className='font-white-color'>
                    <EmailIcon size={24}/>
                    <Typography class='inline-block pt-2 pl-2'>czajka.pracownia@gmail.com</Typography>
                </div>

                <div className='flex justify-around'>
                    <Button variant="contained" onClick={() => {
                        dispatch(removeActiveOffer());
                        dispatch(setCurrentSite(currentSiteController.availableSites.AllOffers));
                    }}>Wróć do przeglądania</Button>

                    <SendEmail/>
                </div>

            </div>

        </div>
    )

}
export default MaximizedOffer;