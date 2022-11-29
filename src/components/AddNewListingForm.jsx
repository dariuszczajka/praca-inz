import '../App.css';
import {Button, Stack, TextareaAutosize, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import {setCurrentSite} from "../redux/currentSiteControllerSlice";
import {setCategories} from "../redux/categoriesSlice";
import Carousel from 'react-bootstrap/Carousel';
import {useDispatch, useSelector} from "react-redux";
import {logUser} from "../redux/loggedUserSlice";


const AddNewListingForm = () => {
    const BACKEND_URL = 'http://localhost:5000'
    const dispatch = useDispatch();
    const currentSiteController = useSelector(state => state.currentSiteController)
    const createdOffer = useSelector(state => state.createdOffer);

    const [images, setImages] = useState([]);
    const [imageURLs, setImageURLs] = useState([]);

    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [desc, setDesc] = useState('');
    const [price, setPrice] = useState('');
    const [lon, setLon] = useState('');
    const [lat, setLat] = useState('');


    useEffect(() => {
        if(images.length < 1) return;
        const newImageURLs = [];
        images.forEach(image => newImageURLs.push(URL.createObjectURL(image)));
        setImageURLs(newImageURLs);
    }, [images]);

    useEffect(()=>{
        console.log(createdOffer.createdOfferLocation);
    },[createdOffer.createdOfferLocation]);

    const onImageChange = (e) => {
        setImages([...e.target.files]);
    }

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

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        for(let x = 0; x<images.length; x++) {
            formData.append('image', images[x])
        }

        axios.post(BACKEND_URL + '/offer/new', {
            name: name,
            category: category,
            desc: desc,
            price: price,
            lon: createdOffer.createdOfferLocation.lon,
            lat: createdOffer.createdOfferLocation.lat
        })
            .then((response) => {
                formData.append('offerID', response.data)
                axios.post(BACKEND_URL + '/offer/uploadFile', formData)
                    .then(res => {
                        console.log(res);
                    })
                dispatch(setCurrentSite(currentSiteController.availableSites.AllOffers));
            })
            .catch(function (error) {
                alert('something went wrong')
                console.log(error);
                return false;
            });
    };


    return(
        <div className='flex flex-col mt-8 w-full gap-4 pl-8 pr-8'>
            <TextField
                className='offer-color w-3/5'
                id="outlined-required"
                label="Nazwa"
                onChange={(event) => {setName(event.target.value)}}
            />
            <TextField
                className='offer-color w-3/5'
                id="outlined-required"
                label="Kategoria"
                onChange={(event) => {setCategory(event.target.value)}}
            />
            <TextField
                className='offer-color w-3/5'
                id="outlined-required"
                label="Cena"
                onChange={(event) => {setPrice(event.target.value)}}
            />
            {/*<TextField
                id="outlined-select-currency"
                className='offer-color w-2/5'
                select
                label="Select"
                helperText="Please select your currency"
                variant="filled"
            >
                {categoriesMock.map((category) => (
                    <MenuItem key={category._id} value={category.namePL}>
                        {category.namePL}
                    </MenuItem>
                ))}
            </TextField>*/}
            <input type="file" multiple accept="image/*" onChange={onImageChange} />


                {
                    imageURLs.map(imageSrc =>
                            <img src={imageSrc} />
                        )
                }


            <TextareaAutosize
                aria-label="minimum height"
                className='offer-color w-3/5'
                minRows={3}
                placeholder="Opis"
                onChange={(event) => {setDesc(event.target.value)}}
            />
            <TextField
                className='offer-color w-2/5'
                id="outlined-read-only-input"
                label="Location"
                value={createdOffer.createdOfferLocation.lon + ', ' + createdOffer.createdOfferLocation.lat}
                InputProps={{
                    readOnly: true,
                }}
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
                onClick={handleSubmit}
            >Opublikuj ogłoszenie
            </Button>
        </div>
    )
};
export default AddNewListingForm;
