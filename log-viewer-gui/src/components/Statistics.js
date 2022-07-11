import { useEffect, useState } from "react";

export default function Statistics({projectId}) {
    const [statistics, setStatistics] = useState({});

    useEffect(() => {
        getStatistics(projectId);
    }, [projectId])

    const displaySeverityLevel = (data) => {
        var elements = [];
        if (data.oneDaySeverityCount == null) return;
        data.oneDaySeverityCount.map((item, index) => {
            Object.entries(item).map(([key, val]) => {
                elements.push(<label key={index}> {key}: {val}</label>);
            })
        })
        return elements;
    }

    async function getStatistics(projectId) {
        const response = await fetch("/api/getStatistics?projectId=" + projectId);
        if (response.status !== 200) console.log("err");
        setStatistics(await response.json());
    }

    return (
        <>
            <div className='statistics'>
                Recived in last 24h: {statistics.oneDayCount} – Recived in last hour: {statistics.oneHourCount} – Recived by severity level in last 24h: {displaySeverityLevel(statistics)}
            </div>
        </>
    )
}
