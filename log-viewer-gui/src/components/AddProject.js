import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useEffect } from "react";


export default function AddProject({ saveProject, openAddProjectDialog, closeAddProjectDialog }) {
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState("");
    const [shortName, setShortName] = React.useState("");
    const [error, setError] = React.useState(false);

    useEffect(() => {
        setOpen(openAddProjectDialog);
    }, [openAddProjectDialog])

    const handleClose = () => {
        closeAddProjectDialog(false);
        setName("");
        setShortName("");
        setError(false);
    };

    const inputName = (event) => {
        setName(event.target.value);
    }

    const inputShortName = (event) => {
        setShortName(event.target.value);
    }

    const addProject = async () => {
        const response = await fetch("/api/addProject", {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name,
                short_name: shortName
            })
        })

        if (response.status !== 200) {
            setError(true);
            console.log("err");
            return;
        }
        var pId = await response.json();
        saveProject({ _id: pId, name: name, short_name: shortName });
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
                    {"Add project"}
                </DialogTitle>
                <DialogContent>
                    <div className='marginTop'><TextField id="outlined-basic" label="Name" variant="outlined" size='small' value={name} onChange={inputName} sx={{ width: 400 }} /></div>
                    <div className='marginTop'><TextField id="outlined-basic" label="Short name" variant="outlined" size='small' value={shortName} onChange={inputShortName} sx={{ width: 400 }} /></div>
                    {showError()}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={addProject} autoFocus>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}