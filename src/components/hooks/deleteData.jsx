import axios from 'axios';
import React from 'react';

const deleteData = (url) => {

    useEffect(() => {
        const deleteSingle = async() => {
            await axios.delete(url)
        }
    }, [url]);

    return 
}

export default deleteData;
