import { useEffect, useState } from "react";

const useApi = (apiUrl) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState({
    state: false,
    message: "",
  });
  const [error, setError] = useState(null);
  const fetchUserData = async () => {
    try {
      setLoading({
        ...loading,
        state: true,
        message: "loading data...",
      });
      const response = await fetch(apiUrl);
      if (!response.ok) {
        const errorMessage = `Fetching data failed: ${response.status}`;
        throw new Error(errorMessage);
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading({
        ...loading,
        state: false,
        message: "",
      });
    }
  };
  useEffect(() => {
    fetchUserData();
  }, [apiUrl]);

  return { data, error, loading };
};

export default useApi;
