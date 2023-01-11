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
import {useSelector} from "react-redux";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Register = () => {
    const [open, setOpen] = React.useState(false);
    const [openAlert, setOpenAlert] = React.useState(false);
    const BACKEND_URL = 'http://localhost:5000'
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={24} ref={ref} variant="filled" {...props} />;
    });

    //TODO: better UI experience while creating an account - for now, using simple 'alert'
    const handleCloseAlert = (event, reason) => {
        console.log('i closed alert');
        console.log(reason);
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
        setOpen()
    };

    const handleOpenAlert = () => {
        console.log('i opened alert');
        setOpenAlert(true);
    };

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [location, setLocation] = useState('default');
    const [agreement, setAgreement] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    // TODO: password encription
    function encryptPlaintextPassword(plaintextPassword){
        return plaintextPassword;
    }

    function checkIsFormValid(){
        if(email !== '' &&
        username !== '' &&
        password !== '' &&
        phone !== '' &&
        agreement !== false){
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    }

    useEffect(() => {
        checkIsFormValid();
    },[email,username,password,phone,agreement]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleSubmit = () => {
        axios.post(BACKEND_URL + '/user/register', {
            username: username,
            password: password,
            //password: password,
            email: email,
            phoneNumber: phone,
            //userLon: "50.0230578",
            //userLat: "19.9602816"
            userProfileLocation: location
        })
            .then((response) => {
                handleOpenAlert();
                console.log(response.data);
                //setOpen(false);
                //alert('account created succesfully');
            })
            .catch(function (error) {
                alert('something went wrong')
                console.log(error);
                return false;
            });
    };

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <div>
            <Link
                component="button"
                variant="body2"
                onClick={handleClickOpen}
            >
                Utwórz nowe konto
            </Link>
            <Dialog
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                keepMounted
            >
                <DialogTitle>Utwórz nowe konto</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Hej! Świetnie Cię widzieć! Powiedz nam coś o sobie.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="E-mail"
                        type="email"
                        fullWidth
                        variant="standard"
                        onChange={(event) => {setEmail(event.target.value)}}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="Username"
                        label="Nazwa użytkownika"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(event) => {setUsername(event.target.value)}}
                    />
                    <TextField
                        margin="dense"
                        id="password"
                        label="Hasło"
                        type="password"
                        fullWidth
                        variant="standard"
                        onChange={(event) => {setPassword(encryptPlaintextPassword(event.target.value))}}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="location"
                        label="Lokalizacja"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(event) => {setLocation(event.target.value)}}
                    />
                    <TextField
                        margin="dense"
                        id="phone"
                        label="Numer telefonu"
                        type="telephone"
                        fullWidth
                        variant="standard"
                        onChange={(event) => {setPhone(event.target.value)}}
                    />
                    <FormGroup>
                        <FormControlLabel control={<Checkbox onChange={() => {setAgreement(!agreement)}} />}  label="Wyrażam zgodę na przetwarzanie moich danych osobowych." />
                    </FormGroup>
                </DialogContent>
                <Snackbar open={openAlert} autoHideDuration={5000} onClose={handleCloseAlert}>
                    <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
                        Twoje konto zostało stworzone!
                    </Alert>
                </Snackbar>
                <DialogActions>
                    <Button variant="outlined" onClick={handleClose}>Anuluj</Button>
                    {isFormValid ?
                        <Button variant="outlined" onClick={handleSubmit}>Zarejestruj się</Button>
                        :
                        <Button variant="outlined" disabled>Zarejestruj się</Button>
                    }
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default Register;