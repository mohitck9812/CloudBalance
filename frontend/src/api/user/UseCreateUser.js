import { useCallback, useState } from "react";
import api from "../axios";

function useCreateUser() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createUser = useCallback(
    async (body) => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.post(`/user/add`, body, {
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
        });
        setData(response?.data);
        // setLoading(false);
        return response;
      } catch (e) {
        setError(e);
        throw e;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { data, loading, error, createUser };
}

export default useCreateUser;
