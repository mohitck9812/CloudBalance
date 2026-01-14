import { useCallback, useState } from "react";
import api from "../axios";

const useChartData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchChartData = useCallback(async (params) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get(`/cost/explorer?${params.toString()}`);
      setData(response.data);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load chart data");
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, fetchChartData };
};

export default useChartData;
