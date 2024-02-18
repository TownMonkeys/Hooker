import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [fetchedData, setFetchedData] = useState(null);
  const searchItems = (value) => {
    if (!!data && !!value) {
      const filteredData = data.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(value.toLowerCase());
      });
      setData(filteredData);
    } else {
      setData(fetchedData);
    }
  };
  const filterItems = (value) => {
    if (!!data && !!value) {
      const filteredData = data.filter((el) => {
        return el.title === value.title || el.created === value.date;
      });
      setData(filteredData);
    } else {
      setData(fetchedData);
    }
  };
  useEffect(() => {
    const abortCont = new AbortController();

    setTimeout(() => {
      fetch(url, { signal: abortCont.signal })
        .then((res) => {
          if (!res.ok) {
            // error coming back from server
            throw Error("could not fetch the data for that resource");
          }
          return res.json();
        })
        .then((data) => {
          setIsPending(false);
          setData(data);
          setFetchedData(data);
          setError(null);
        })
        .catch((err) => {
          if (err.name === "AbortError") {
            console.log("fetch aborted");
          } else {
            // auto catches network / connection error
            setIsPending(false);
            setError(err.message);
          }
        });
    }, 1000);

    // abort the fetch
    return () => abortCont.abort();
  }, [url]);

  return { data, isPending, error, searchItems, filterItems };
};

export default useFetch;
