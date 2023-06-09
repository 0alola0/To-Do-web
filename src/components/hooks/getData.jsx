import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const getData = (url) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true);
        axios
          .get(url)
          .then((response) => {
            setData(response.data);
          })
          .catch((err) => {
            setError(err);
          })
          .finally(() => {
            setLoading(false);
          });
    }, [url]);

    const refetch = () => {
        console.log("refetched")
        setLoading(true);
        axios
        .get(url)
        .then((response) => {
          setData(response.data);
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }

    return {data, loading, error, refetch}
}

export default getData;
