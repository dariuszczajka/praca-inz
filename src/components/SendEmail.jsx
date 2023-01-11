import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {makeStyles, TextField} from "@mui/material";
import {removeActiveOffer} from "../redux/activeOfferSlice";
import {setCurrentSite} from "../redux/currentSiteControllerSlice";


const SendEmail = () => {
    const form = useRef();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const sendEmail = (e) => {
        e.preventDefault(); // prevents the page from reloading when you hit “Send”

        emailjs.sendForm('service_uj5r7zd', 'template_u9zc1vs', form.current, 'c4MLUawH_b2pckKNh')
            .then((result) => {
                console.log('email sent!')
            }, (error) => {
                console.log('error ' + error)
            });
    };

    return (
        <div>
            <Button variant="contained"
                    style={{
                        backgroundColor: "#FCA311",
                    }}
                    onClick={handleClickOpen}
            >Zapytaj o przedmiot</Button>
            <Dialog open={open} onClose={handleClose} sx={{
                width: '1000px'
            }}>
                <DialogTitle>Zapytaj o przedmiot</DialogTitle>
                <DialogContent>
                    <form ref={form} onSubmit={sendEmail}
                    className='flex flex-col'>
                        <label>Wyślij do:</label>
                        <input className='border' type="email" name="send_to" readOnly defaultValue="czajka.pracownia@gmail.com"/>
                        <label>Mój email</label>
                        <input className='border' type="email" name="user_email" />
                        <label>Wiadomość do sprzedającego</label>
                        <textarea name="message" className='border' style={{minHeight: '150px'}}/>
                        <div className='flex justify-center'>
                            <Button type="submit" value="Send" className='border mt-2 w-64' variant="contained"                     style={{
                                backgroundColor: "#FCA311",
                            }}
                                    onClick={handleClose}>Wyślij!</Button>
                        </div>

                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default SendEmail;
