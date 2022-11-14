import { Fragment, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import {Autocomplete, Box, Button, Stack, TextField} from "@mui/material";
import {HiOutlineLocationMarker} from "react-icons/hi";
import {BsSearch} from "react-icons/bs";


const people = [
    { id: 1, name: 'Wade Cooper' },
    { id: 2, name: 'Arlene Mccoy' },
    { id: 3, name: 'Devon Webb' },
    { id: 4, name: 'Tom Cook' },
    { id: 5, name: 'Tanya Fox' },
    { id: 6, name: 'Hellen Schmidt' },
]

    export default function Searchbar() {
        return (
            <Stack direction="row" spacing={1}>
                <Box className='flex flex-row white-color'>
                    <BsSearch size={20} className='block mt-2 font-navbar-color mr-1 ml-1'/>
                    <Autocomplete
                        variant="standard"
                        InputProps={{
                            disableUnderline: true,
                        }}
                        className='white-color w-64 border-none'
                        id="free-solo-demo"
                        freeSolo
                        options={top100Films.map((option) => option.title)}
                        renderInput={(params) => <TextField {...params} size="small" label="rower"/>}
                    />
                </Box>
                <Box className='flex flex-row white-color'>
                    <HiOutlineLocationMarker size={24} className='block mt-2 font-navbar-color'/>
                    <Autocomplete
                        variant="standard"
                        InputProps={{
                            disableUnderline: true,
                        }}
                        className='white-color w-64'
                        freeSolo
                        id="free-solo-2-demo"
                        disableClearable
                        options={top100Films.map((option) => option.title)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                size="small"
                                label="Kraków"
                                InputProps={{
                                    ...params.InputProps,
                                    type: 'search',
                                }}
                            />
                        )}
                    />
                </Box>
                <Button variant="contained" onClick={() => {
                    alert('searching');
                }}>search</Button>
            </Stack>
        );
    }

const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    {
        title: 'The Lord of the Rings: The Return of the King',
        year: 2003,
    }
    ];