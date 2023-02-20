import { useCallback, useState } from "react";

const useFetch = () => {
  const [err, setError] = useState(null);

  const url = "https://FIREBASE/tasks.json";

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setError(null);

    try {
      const response = await fetch(
        requestConfig.url ? requestConfig.url : url,
        {
          method: requestConfig.method ? requestConfig.method : "GET",
          headers: requestConfig.headers ? requestConfig.headers : {},
          body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        }
      );

      if (!response.ok) {
        throw new Error("Requests failed!");
      }

      const data = await response.json();

      applyData(data);
    } catch (error) {
      console.log(error);
      setError(error.message || "Something went wrong in sending!");
    }
  }, []);

  return {
    err,
    sendRequest,
  };
};

export default useFetch;
