import {useDispatch, useSelector} from "react-redux";
import {Button} from "@mui/material";
import {removeActiveOffer} from "../redux/activeOfferSlice";
import {setMapCurrentLatLon, setMapCurrentZoomLvl} from "../redux/mapDataSlice";
import {setCurrentSite} from "../redux/currentSiteControllerSlice";

const MaximizedOffer = () => {
    const activeOffer = useSelector(state => state.activeOffer);
    const currentSiteController = useSelector(state => state.currentSiteController)
    const dispatch = useDispatch();

    return(
        <div className='offers-container overflow-auto'>
            <img className='single-offer-image' src={activeOffer.activeOffer.img}/>
            <p>{activeOffer.activeOffer.name}</p>
            <p>{activeOffer.activeOffer.desc}</p>
            <p>{activeOffer.activeOffer.price}</p>

            <Button variant="contained" onClick={() => {
                dispatch(removeActiveOffer());
                dispatch(setCurrentSite(currentSiteController.availableSites.AllOffers));
            }}>go back</Button>

        </div>
    )

}
export default MaximizedOffer;