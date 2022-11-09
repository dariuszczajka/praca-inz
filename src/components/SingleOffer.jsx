import '../App.css';
import {Button} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {setActiveOffer} from "../redux/activeOfferSlice";

const SingleOffer = (props) => {
    const dispatch = useDispatch();
    const activeOffer = useSelector(state => state.activeOffer);

    return(
        <div className='border-all-around'>
            <img className='offer-image' src={props.img}/>
            <h1>{props.name}</h1>
            <p>{props.desc}</p>
            <Button variant="contained" onClick={() => {
                dispatch(setActiveOffer(props.offer));
            }}>see more</Button>
        </div>
    )
};
export default SingleOffer;