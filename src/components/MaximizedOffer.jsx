import {useDispatch, useSelector} from "react-redux";
import {Button} from "@mui/material";
import {removeActiveOffer} from "../redux/activeOfferSlice";
import {setMapCurrentLatLon, setMapCurrentZoomLvl} from "../redux/mapDataSlice";

const MaximizedOffer = () => {
    const activeOffer = useSelector(state => state.activeOffer);
    const dispatch = useDispatch();

    return(
        <div className='offers-container'>
            <img className='single-offer-image' src={activeOffer.activeOffer.img}/>
            <p>{activeOffer.activeOffer.name}</p>
            <p>{activeOffer.activeOffer.desc}</p>
            <p>{activeOffer.activeOffer.price}</p>

            <Button variant="contained" onClick={() => {
                dispatch(removeActiveOffer());
            }}>go back</Button>

        </div>
    )

}
export default MaximizedOffer;