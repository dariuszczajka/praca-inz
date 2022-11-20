import '../App.css';
import SingleOffer from "./SingleOffer";
import {Stack} from "@mui/material";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import MaximizedOffer from "./MaximizedOffer";
import axios from "axios";
import {setOffers} from "../redux/allOffersSlice";

const AddNewListingForm = () => {
    const BACKEND_URL = 'http://localhost:5000'

    return(
        <div className='flex mt-16 w-1/2'>

        </div>
    )
};
export default AddNewListingForm;
