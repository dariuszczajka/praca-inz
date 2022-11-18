import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {Link, TextField} from "@mui/material";
import Register from "./Register";
import {useEffect, useState} from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {logUser} from "../redux/loggedUserSlice";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Login = () => {
    const loggedUser = useSelector(state => state.loggedUser);
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    // TODO: create project-wide constant that holds backend url, in order to improve usability in the future
    const BACKEND_URL = 'http://localhost:5000'

    // TODO: password encription
    function encryptPlaintextPassword(plaintextPassword){
        return plaintextPassword;
    }

    function checkIsFormValid(){
        if(username != '' &&
            password != ''){
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    }

    const handleSubmit = () => {
        axios.post(BACKEND_URL + '/user/login', {
            username: username,
            password: password
        })
            .then((response) => {
                //handleOpenAlert();
                console.log(response.data);
                dispatch(logUser(response.data));
                setOpen(false);
                alert('login was successful');
                localStorage.setItem("loggedUser", JSON.stringify(response.data));
                //dispatch(setOffers(response.data))
                //console.log(allOffers.offers)
                //console.log(allOffers.isLoading)
            })
            .catch(function (error) {
                alert('something went wrong')
                console.log(error);
                return false;
            });
    };

    useEffect(() => {
        checkIsFormValid();
    },[username,password]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="contained" onClick={handleClickOpen}>
                Zaloguj się
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                keepMounted
            >
                <DialogTitle>Zaloguj się</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Masz już konto? Świetnie! Podaj swoje dane.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="E-mail"
                        type="email"
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
                    <div className="pt-4">
                        <DialogContentText>
                            <Link
                                component="button"
                                variant="body2"
                                onClick={() => {
                                    console.info("I'm a button.");
                                }}
                            >
                                Zapomniałeś hasła?
                            </Link>
                        </DialogContentText>
                        <DialogContentText>
                            <Register/>
                        </DialogContentText>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Zaloguj się</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default Login;