import {useDispatch, useSelector} from "react-redux";
import {Button} from "@mui/material";
import {removeActiveOffer} from "../redux/activeOfferSlice";
import {setMapCurrentLatLon, setMapCurrentZoomLvl} from "../redux/mapDataSlice";
import {setCurrentSite} from "../redux/currentSiteControllerSlice";
import Carousel from 'react-bootstrap/Carousel';

const MaximizedOffer = () => {
    const activeOffer = useSelector(state => state.activeOffer);
    const currentSiteController = useSelector(state => state.currentSiteController)
    const dispatch = useDispatch();

    return(
        <div className='offers-container overflow-auto'>
            <Carousel itemsToShow={1}>
                {activeOffer.activeOffer.img.map((image) => {
                    return <Carousel.Item>
                        <img src={image} alt="phone" />
                    </Carousel.Item>})
                }
            </Carousel>

            <h1 className='font-white-color'>{activeOffer.activeOffer.name}</h1>
            <p className='font-white-color'>{activeOffer.activeOffer.desc}</p>
            <p className='font-white-color'>{activeOffer.activeOffer.price}</p>

            <Button variant="contained" onClick={() => {
                dispatch(removeActiveOffer());
                dispatch(setCurrentSite(currentSiteController.availableSites.AllOffers));
            }}>go back</Button>

        </div>
    )

}
export default MaximizedOffer;