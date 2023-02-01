import { Fragment, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import {Autocomplete, Box, Button, Stack, TextField} from "@mui/material";
import {HiOutlineLocationMarker} from "react-icons/hi";
import {BsSearch} from "react-icons/bs";
import Filters from "./Filters";
import {useDispatch} from "react-redux";
import {setSearchQuery} from "../redux/filterSlice";




    export default function Searchbar() {
        const dispatch = useDispatch();

        function setQuery(event) {
            dispatch(setSearchQuery(event.target.value));
        }

        return (
            <Stack direction="row" spacing={1} className='pt-0.5 pb-0.5'>
                <Box className='flex flex-row white-color'>
                    <BsSearch size={16} className='block mt-3 font-navbar-color mr-1 ml-1'/>
                    <TextField
                               onChange={setQuery}
                               data-testid="search-bar"
                               className='white-color w-64 border-none'
                               variant="standard"
                               InputProps={{
                                   disableUnderline: true,
                               }}
                               size="small"
                               label="Szukaj w lokalnie.pl"
                    />
                </Box>
                <Button variant="contained"
                        style={{
                            backgroundColor: "#FCA311",
                        }}
                        onClick={() => {
                    alert('searching');
                }}>Szukaj</Button>
                <Filters/>
            </Stack>
        );
    }
