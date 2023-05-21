import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CreateNews() {
    const [newsId, setNewsId] = useState(null);

    useEffect(() => {
        // POST request using axios inside useEffect React hook
        const news = {
            title: "2021 ოქსფორდის უნივერსიტეტის ნიუსი",
            author: "კონტენტ-მენეჯერი",
            date: "2021-01-30T18:02:18.188Z",
            content: "A brand new world-class research facility, the National Thin-Film Cluster Facility (NTCF) for Advanced Functional Materials, was officially launched last week. Hosted by the University of Oxford’s Department of Physics, this facility will provide cutting-edge capabilities to support the development of next-generation advanced functional materials to help address crucial real industrial, societal and environmental challenges.",
            hyperlink: "https://www.ox.ac.uk/news/2022-11-24-new-research-facility-launches-develop-next-generation-advanced-functional-materials"
          };
        
        // const res = axios.post('https://localhost:7071/api/News/createNews', news)
        //     .then(response => setNewsId(response.data.id));
        const res = axios.post('https://localhost:7071/api/News/createNews', news)
        .then(response => console.log(response));
        
        //console.log('newsId is equal to: ' + newsId)
        
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);

    return (
        <div className="card text-center m-3">
            <h5 className="card-header">POST Request with React Hooks</h5>
            <div className="card-body">
                Returned Id: {newsId}
            </div>
        </div>
    );
}

export { CreateNews };
