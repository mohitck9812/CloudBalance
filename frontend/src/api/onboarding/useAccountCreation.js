import { useCallback, useState } from "react";
import api from "../axios";
import { toast } from "react-toastify";

function useAccountCreation() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  const createAccount = useCallback(async (body) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post(`/account/add`, body, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (response) {
        setData(response.data);
        toast.success("Account Created");
      }
      return response;
    } catch (e) {
      setError(e);
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);
  return{data , error, loading, createAccount}
}
export default useAccountCreation;
