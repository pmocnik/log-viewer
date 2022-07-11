import * as React from 'react';
import {  CssBaseline} from "@mui/material";
import { useEffect, useState } from "react";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Statistics from './Statistics';
import Header from './Header';

async function logout(cb) {
    const response = await fetch("/api/logout", {
        method: "POST"
    })

    if (response.status !== 200) return "err";

    cb(null);
}

async function getData(cb) {
    const response = await fetch("/api/getLogs?" + Object.keys(filter)
        .map(key => `${key}=${filter[key]}`)
        .join('&')
    );
    if (response.status !== 200) return "err";

    cb(await response.json());
}

async function getProjects(cb) {
    const response = await fetch("/api/getProjects");
    if (response.status !== 200) return "err";

    cb(await response.json());
}

let filter = {};

export default function Dashboard(props) {
    const [userData, setUserData] = useState(props.userData);
    const [logData, setLogData] = useState([]);

    let setSession = props.setSession;

    useEffect(() => {
        getData(setLogData);
        filter = {
            project: "",
            search: "",
            timestamp: 1
        }
    }, [])

    const [project, setProject] = React.useState('');

    const changeSort = async (value) => {
        if (value === 1) {
            setSort(-1);
            filter.timestamp = -1;
        }
        if (value === -1) {
            setSort(1);
            filter.timestamp = 1;
        }
        getData(setLogData);
    }

    const [sort, setSort] = React.useState(1);

    const sortOrientation = () => {
        if (sort === -1)
            return (
                <ArrowDownwardIcon sx={{ fontSize: '20px', marginTop: '2px' }} />
            )
        if (sort === 1)
            return (
                <ArrowUpwardIcon sx={{ fontSize: '20px', marginTop: '2px' }} />
            )
    }

    const setFilterProject = (value) => {
        filter.project = value;
        setProject(value);
        getData(setLogData);
    }

    const setFilterSearch = (value) => {
        filter.search = value;
        getData(setLogData);
    }

    return (
        <>
            <CssBaseline />
            <Header user={userData}
                setFilterProject={setFilterProject}
                setFilterSearch={setFilterSearch}
                setSession={setSession} 
                setUserDataG={props.setUserData}
                sortG={sort}
            />
            <Statistics projectId={project} />
            <div className="log_data data_header">
                <div className="firstColumn"> PROJECT</div>
                <div className="clickable" onClick={() => changeSort(sort)}> {sortOrientation()} TIMESTAMP </div>
                <div> SEVERITY</div>
                <div> MESSAGE</div>
            </div>
            {
                logData.map((item) => {
                    return (
                        <div key={item._id} className="log_data">
                            <div className="firstColumn"> {item.project.name}</div>
                            <div> {item.timestamp}</div>
                            <div> {item.severity_level}</div>
                            <div> {item.message}</div>
                        </div>
                    )
                })
            }
        </>
    )
}
