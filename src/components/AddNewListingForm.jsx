import '../App.css';
import {Button, Stack, TextareaAutosize, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import {setCurrentSite} from "../redux/currentSiteControllerSlice";
import {setCategories} from "../redux/categoriesSlice";
import {useDispatch, useSelector} from "react-redux";

const AddNewListingForm = () => {
    const BACKEND_URL = 'http://localhost:5000'
    const dispatch = useDispatch();

    const categoriesSelector = useSelector(state => state.categories)

    let categoriesMock = [
        {
            "_id": "637a402ed06d681a703ad4b3",
            "namePL": "Motoryzacja",
            "nameEN": "Cars",
            "icon": "cars"
        },
        {
            "_id": "637a4834d06d681a703ad4b5",
            "namePL": "Praca",
            "nameEN": "Jobs",
            "icon": "jobs"
        },
        {
            "_id": "637a4863d06d681a703ad4b6",
            "namePL": "Dla domu",
            "nameEN": "Home Appliances",
            "icon": "home_appliances"
        },
        {
            "_id": "637a487ed06d681a703ad4b7",
            "namePL": "Elektronika",
            "nameEN": "Electronic devices",
            "icon": "electronic_devices"
        },
        {
            "_id": "637a4897d06d681a703ad4b8",
            "namePL": "Moda",
            "nameEN": "Fashion",
            "icon": "fashion"
        },
        {
            "_id": "637a48b5d06d681a703ad4b9",
            "namePL": "Zwierzęta",
            "nameEN": "Animals",
            "icon": "animals"
        },
        {
            "_id": "637a48dcd06d681a703ad4ba",
            "namePL": "Dla dzieci",
            "nameEN": "For kids",
            "icon": "for_kids"
        },
        {
            "_id": "637a4905d06d681a703ad4bb",
            "namePL": "Za darmo",
            "nameEN": "Free of charge",
            "icon": "free_of_charge"
        }
    ]


    console.log(categoriesSelector.categories);

    return(
        <div className='flex flex-col mt-8 w-full gap-4 pl-8 pr-8'>
            <div className='w-3/4 h-1/4 align-middle bg-white'>
                <p>carousel</p>
            </div>
            <TextField
                className='offer-color w-3/5'
                id="outlined-required"
                label="Nazwa"
            />
            <TextField
                id="outlined-select-currency"
                className='offer-color w-2/5'
                select
                label="Select"
                onChange={()=>{console.log('ive changed')}}
                helperText="Please select your currency"
                variant="filled"
            >
                {categoriesMock.map((category) => (
                    <MenuItem key={category._id} value={category.namePL}>
                        {category.namePL}
                    </MenuItem>
                ))}
            </TextField>
            <Button
                variant="contained"
                component="label"
                className='offer-color w-1/5'
            >
                Prześlij zdjęcia
                <input
                    type="file"
                    hidden
                />
            </Button>
            <TextareaAutosize
                aria-label="minimum height"
                className='offer-color w-3/5'
                minRows={3}
                placeholder="Opis"
            />
            <TextField
                className='offer-color w-2/5'
                id="outlined-required"
                label="Lokalizacja"
            />
            <TextField
                className='offer-color w-2/5'
                id="outlined-required"
                label="Telefon"
            />
            <TextField
                className='offer-color w-2/5'
                id="outlined-required"
                label="Email"
            />
            <Button
                variant="contained"
                component="label"
                className='offer-color w-1/5 align-middle'
            >Opublikuj ogłoszenie
            </Button>
        </div>
    )
};
export default AddNewListingForm;
