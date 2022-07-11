import * as React from 'react';
import { Button, FormControl, IconButton, InputBase, InputLabel, MenuItem, Paper, Select, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import AddProject from './AddProject';
import Cookies from 'js-cookie'
import AddUser from './AddUser';

async function logout(cb) {
    const response = await fetch("/api/logout", {
        method: "POST"
    })
    if (response.status !== 200) console.log("err");
    Cookies.remove('user-session');
    cb(null, null);
}

async function getProjects(cb) {
    const response = await fetch("/api/getProjects");
    if (response.status !== 200) console.log("err");

    cb(await response.json());
}

export default function Header({ user, setFilterProject, setFilterSearch, setSession, setUserDataG, sortG }) {
    const [userData, setUserData] = useState(user);
    const [projects, setProjects] = useState([]);
    const [project, setProject] = React.useState('');
    const [openAddDialog, setOpenAddDialog] = React.useState(false);
    const [openAddUserDialog, setOpenAddUserDialog] = React.useState(false);
    const [sort, setSort] = useState(sortG);
    const [search, setSearch] = useState('');

    useEffect(() => {
        getProjects(setProjects);
    }, [])

    useEffect(() => {
        setSort(sortG);
    }, [sortG])

    const changeProject = (event) => {
        setProject(event.target.value);
        setFilterProject(event.target.value);
    };

    const handleSubmitSearch = async (event) => {
        event.preventDefault();
        setSearch(event.target[0].value);
        setFilterSearch(event.target[0].value);
    };

    const addProject = (project) => {
        console.log(project);
        projects.push(project);
        setProjects(projects);
    }

    const openAddDialogF = () => {
        setOpenAddDialog(true);
    }

    const checkIfAdmin = () => {
        if (user !== null && user.roles.includes("Admin"))
            return (<>
                <Button variant="outlined" size="small" sx={{ height: '39.97px', marginTop: '8px', marginRight: 1 }} onClick={() => setOpenAddUserDialog(true)}>Add user</Button>
                <AddUser openAddUserDialog={openAddUserDialog} closeAddUserDialog={setOpenAddUserDialog} />
            </>
            )
    }

    const downloadCsv = async () => {

        const response = await fetch("/api/downloadCsv?project=" + project + "&search=" + search + "&timestamp=" + sort)
        if (response.status !== 200) {
            console.log("err");
            return;
        }

        var blob = await response.blob();

        var URL = window.URL || window.webkitURL;
        var downloadUrl = URL.createObjectURL(blob);

        var a = document.createElement("a");

        if (typeof a.download === 'undefined') {
            window.location = downloadUrl;
        } else {
            a.href = downloadUrl;
            a.download = "export.csv";
            document.body.appendChild(a);
            a.click();
        }

    }

    return (
        <div className="header">
            <AddProject saveProject={addProject} openAddProjectDialog={openAddDialog} closeAddProjectDialog={setOpenAddDialog} />
            <div className='white_background'>
                <FormControl variant="outlined" size="small" sx={{ m: 1, width: 130, height: 40 }}>
                    <InputLabel id="demo-simple-select-standard-label">Project</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={project}
                        onChange={changeProject}
                        label="Project"
                    >
                        <MenuItem value="">
                            <em>All</em>
                        </MenuItem>
                        {projects.map((project) => {
                            return (
                                <MenuItem key={project._id} value={project._id}>{project.name}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
                <Button variant="outlined" size="small" sx={{ height: '39.97px', marginTop: '8px' }} onClick={() => openAddDialogF()}>Add project</Button>
                <Paper component="form" size="small" onSubmit={handleSubmitSearch}
                    sx={{
                        p: '2px 4px', display: 'flex', alignItems: 'center', width: 400,
                        height: '39.97px',
                        marginTop: '8px',
                        marginLeft: '8px',
                        borderStyle: 'solid',
                        borderWidth: '1px',
                        borderColor: 'rgba(0, 0, 0, 0.23)',
                        boxShadow: 'none'
                    }}>
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                    />
                    <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
                <IconButton sx={{ marginLeft: '5px', fontSize: 16, borderRadius: 0 }} onClick={() => downloadCsv()}>
                    <FileDownloadIcon />
                </IconButton>

            </div>
            <div className='header_right'>
                {checkIfAdmin()}
                <label className="user_data">{userData && userData.name + " " + userData.surname}</label>
                <IconButton sx={{ fontSize: 16, borderRadius: 0 }} onClick={() => logout((setS, setU) => { setSession(setS); setUserDataG(setU); })}>
                    <Typography sx={{ cursor: 'pointer' }} component="h1" variant="button">
                        Logout
                    </Typography>
                    <LogoutIcon sx={{ marginLeft: '5px' }} />
                </IconButton>
            </div>
        </div>
    )
}