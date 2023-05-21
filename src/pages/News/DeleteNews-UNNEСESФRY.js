import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DeleteNews() {

    return (
        <div>Delete News</div>
    )
    
    // const [status, setStatus] = useState(null);

    // useEffect(() => {
    //     // DELETE request using axios inside useEffect React hook
    //     axios.delete('https://localhost:7071/api/News/deleteNews/8AE01EB0-C033-4B1C-B12E-A5DC002364FD')
    //         .then(() => setStatus('Deleted successfully!'));

    // // empty dependency array means this effect will only run once (like componentDidMount in classes)
    // }, []);

    // return (
    //     <div className="card text-center m-3">
    //         <h5 className="card-header">DELETE Request with React Hooks</h5>
    //         <div className="card-body">
    //             Status: {status}
    //         </div>
    //     </div>
    // );
}

export { DeleteNews };