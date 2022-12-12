import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {Checkbox, FormControlLabel, FormGroup, Link, Snackbar, TextField} from "@mui/material";
import axios from "axios";
import {setOffers} from "../redux/allOffersSlice";
import {useEffect, useState} from "react";
import * as PropTypes from "prop-types";
import MuiAlert from '@mui/material/Alert';
import {useDispatch, useSelector} from "react-redux";
import {
    setFilterCategory,
    setFilterCity,
    setFilterMaxPrice,
    setFilterMinPrice, setFilterOnlyLocal,
    setUserMapCoordinates
} from "../redux/filterSlice";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Filters = () => {
    const filters = useSelector(state => state.filters)
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const [openAlert, setOpenAlert] = React.useState(false);
    const BACKEND_URL = 'http://localhost:5000'
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    //TODO: better UI experience while creating an account - for now, using simple 'alert'
    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };

    const handleOpenAlert = () => {
        setOpenAlert(true);
    };

    const [city, setCity] = useState('');
    const [category, setCategory] = useState('');
    const [min, setMin] = useState('');
    const [max, setMax] = useState('');
    const [onlyLocal, setOnlyLocal] = useState(false);

    function filterBuilder(){
        if(city !== ''){
            dispatch(setFilterCity(city));
        }
        if(category !== ''){
            dispatch(setFilterCategory(category));
        }
        if(min !== ''){
            dispatch(setFilterMinPrice(min));
        }
        if(max !== ''){
            dispatch(setFilterMaxPrice(max));
        }
        dispatch(setFilterOnlyLocal(onlyLocal));
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        filterBuilder()
        setOpen(false);
    }

    return (
        <div>
            <Button variant="contained" onClick={handleClickOpen}>Filter</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                keepMounted
            >
                <DialogTitle>Filtry</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="city"
                        label="Miasto"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(event) => {setCity(event.target.value)}}
                    />
                    <TextField
                        margin="dense"
                        id="category"
                        label="Kategoria"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(event) => {setCategory(event.target.value)}}
                    />
                    <TextField
                        margin="dense"
                        id="min"
                        label="Kwota minimum"
                        type="number"
                        fullWidth
                        variant="standard"
                        onChange={(event) => {setMin(event.target.value)}}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="max"
                        label="Kwota maximum"
                        type="number"
                        fullWidth
                        variant="standard"
                        onChange={(event) => {setMax(event.target.value)}}
                    />
                    <FormGroup>
                        <FormControlLabel id='onlyLocal' control={<Checkbox onChange={() => {setOnlyLocal(!onlyLocal)}} />}  label="Pokazuj tylko ogłoszenia w moim zasięgu" />
                    </FormGroup>
                </DialogContent>
            </Dialog>
        </div>
    );
}
export default Filters;