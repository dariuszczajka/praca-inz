import '../App.css';
import SingleOffer from "./SingleOffer";
import {Stack} from "@mui/material";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import MaximizedOffer from "./MaximizedOffer";
import axios from "axios";
import {setOffers} from "../redux/allOffersSlice";

const Offers = () => {
    const BACKEND_URL = 'http://localhost:5000'
    const activeOffer = useSelector(state => state.activeOffer);
    const allOffers = useSelector(state => state.allOffers);
    const dispatch = useDispatch();

    useEffect(() => {
        getOffersFromAPI();
    }, []);

    function getOffersFromAPI() {
        axios.get(BACKEND_URL + '/offer/all')
            .then(function (response) {
                console.log(response.data)
                dispatch(setOffers(response.data))
                console.log(allOffers.offers)
                console.log(allOffers.isLoading)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }

    return(
        <div className='flex w-1/2 mt-16'>
            {activeOffer.isEmpty ?
                <>
                    {allOffers.isLoading ?
                        <p>spinner</p>
                        :
                        <Stack className='offers-container'>
                            {allOffers.offers.map(offer => (
                                <SingleOffer key={offer._id} img={offer.img} name={offer.name} desc={offer.desc} offer={offer}/>
                            ))}
                        </Stack>
                    }
                </>
                :
                <MaximizedOffer/>
            }
        </div>
    )
};
export default Offers;
