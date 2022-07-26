import * as React from 'react';
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, TextField } from "@mui/material";
import { useEffect } from "react";
import { Box } from '@mui/system';

export default function AddUser({ openAddUserDialog, closeAddUserDialog }) {
    const [open, setOpen] = React.useState(false);
    const [error, setError] = React.useState(false);

    useEffect(() => {
        setOpen(openAddUserDialog);
    }, [openAddUserDialog])

    const handleClose = () => {
        closeAddUserDialog(false);
        setError(false);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let user = {
            name: data.get('name'),
            surname: data.get('surneme'),
            username: data.get('username'),
            email: data.get('email'),
            password: data.get('password'),
            roles: []
        }
        if (data.get('admin') != null && data.get('admin') === 'on') user.roles.push('Admin');
        if (data.get('user') != null && data.get('user') === 'on') user.roles.push('User');
        if (data.get('system') != null && data.get('system') === 'on') user.roles.push('System');

        addUser(user);
    }

    const addUser = async (user) => {
        const response = await fetch("/api/addUser", {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        })

        if (response.status !== 200) {
            setError(true);
            console.log("err");
            return;
        }
        handleClose();
    }

    const showError = () => {
        if (error) return (<div className='error'>Error saving data!</div>)
    }

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Add user"}
                </DialogTitle>
                <DialogContent>
                    <Box component="form" id="test-form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <div className='marginTop'><TextField id="name" name="name" label="Name" variant="outlined" size='small' sx={{ width: 400 }} /></div>
                        <div className='marginTop'><TextField id="surname" name="surneme" label="Surname" variant="outlined" size='small' sx={{ width: 400 }} /></div>
                        <div className='marginTop'><TextField id="username" name="username" label="Username" variant="outlined" size='small' sx={{ width: 400 }} /></div>
                        <div className='marginTop'><TextField id="email" name="email" label="Email" variant="outlined" size='small' sx={{ width: 400 }} /></div>
                        <div className='marginTop'><TextField id="password" name="password" label="Password" variant="outlined" size='small' sx={{ width: 400 }} /></div>
                        <FormControlLabel control={<Checkbox name="admin" />} label="Admin" />
                        <FormControlLabel control={<Checkbox name="user" />} label="User" />
                        <FormControlLabel control={<Checkbox name="system" />} label="System" />
                    </Box>
                    {showError()}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button form="test-form" type="submit" autoFocus>  Add </Button>
                </DialogActions>
            </Dialog>
        </>
    )

}