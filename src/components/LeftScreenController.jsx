import '../App.css';
import SingleOffer from "./SingleOffer";
import {CircularProgress, Stack} from "@mui/material";
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
    const filters = useSelector(state => state.filters)
    const dispatch = useDispatch();

    useEffect(() => {
        getOffersFromAPI();
        console.log('calling api')
    }, [filters.activeFilters]);

    function getOffersFromAPI() {
        axios.get(BACKEND_URL + '/offer/filter', { params: filters.activeFilters })
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
        console.log('filtry');
        console.log(filters.activeFilters);

        switch(currentSiteController.currentSite){
            case currentSiteController.availableSites.AllOffers:
                if(allOffers.offers.length > 0){
                    return(<Stack className='offers-container overflow-auto flex-grow ml-2 pr-2 mr-1' spacing={2}>
                        {allOffers.offers.map(offer => (
                            <SingleOffer key={offer._id} img={offer.img[0]} name={offer.name} desc={offer.desc} offer={offer}/>
                        ))}
                        </Stack>);
                    } else {
                    return (
                        <div className='offers-container align-center flex w-full justify-center font-white-color'>
                            <h1>Ładowanie...</h1>
                            <CircularProgress/>
                        </div>)
                    }
            case currentSiteController.availableSites.MaximizedOffer:
                return(<MaximizedOffer/>);
            case currentSiteController.availableSites.UserSettings:
                return(<div></div>);
            case currentSiteController.availableSites.AddListing:
                return(<AddNewListingForm/>);
            default:
                return(
                    <p>error</p>
                )
        }
    }

    return(
        <div className='flex mt-16 w-1/2 overflow-auto'>
            {renderSwitch()}
        </div>
    )
};
export default LeftScreenController;
