import '../App.css';
import SingleOffer from "./SingleOffer";
import {Stack} from "@mui/material";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import MaximizedOffer from "./MaximizedOffer";
import axios from "axios";
import {setOffers} from "../redux/allOffersSlice";
import AddNewListingForm from "./AddNewListingForm";
import {setCurrentSite} from "../redux/currentSiteControllerSlice";

const LeftScreenController = () => {
    const BACKEND_URL = 'http://localhost:5000'
    const activeOffer = useSelector(state => state.activeOffer);
    const allOffers = useSelector(state => state.allOffers);
    const currentSiteController = useSelector(state => state.currentSiteController)
    const dispatch = useDispatch();

    useEffect(() => {
        getOffersFromAPI();
    }, []);

    function getOffersFromAPI() {
        axios.get(BACKEND_URL + '/offer/all')
            .then(function (response) {
                console.log(response.data)
                dispatch(setOffers(response.data))
                dispatch(setCurrentSite(currentSiteController.availableSites.AllOffers));

                console.log(currentSiteController.availableSites.AllOffers)
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

    function renderSwitch() {
        switch(currentSiteController.currentSite){
            case currentSiteController.availableSites.AllOffers:
                return(
                    <Stack className='offers-container overflow-auto flex-grow ml-2 pr-2 mr-1' spacing={2}>
                        {allOffers.offers.map(offer => (
                            <SingleOffer key={offer._id} img={offer.img} name={offer.name} desc={offer.desc} offer={offer}/>
                        ))}
                    </Stack>
                );
            case currentSiteController.availableSites.MaximizedOffer:
                return(<MaximizedOffer/>);
            case currentSiteController.availableSites.UserSettings:
                return(<div></div>);
            case currentSiteController.availableSites.AddListing:
                return(<AddNewListingForm/>);
            default:
                return(
                    //TODO: real spinner
                    <p>spinner</p>
                )
        }
    }

    return(
        <div className='flex mt-16 w-1/2'>
            {renderSwitch()}
        </div>
    )
};
export default LeftScreenController;
