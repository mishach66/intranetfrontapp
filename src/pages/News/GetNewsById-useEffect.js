import React, { useState, useEffect } from 'react';
import { useQuery, QueryClient } from "@tanstack/react-query"
import axios from 'axios';
import { useParams } from 'react-router-dom';

function GetNewsById() {
    const [status, setStatus] = useState({});
    const {id} = useParams()
    //console.log({id})
    useEffect(() => {
        axios.get(`https://localhost:7071/api/News/newsById/${id}`)
            .then((response) => setStatus(response.data));
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);

    return (
        // <div className="card text-center m-3">
        //     <h5 className="card-header">GetNewsById Request</h5>
        //     <div className="card-body">
        //         Status: {status.title} {status.author} {status.content}
        //     </div>
        // </div>
        <div >
            <p>
            Status: {status.title} {status.author} {status.content}
            </p>
        </div>
    );
}

export { GetNewsById };
