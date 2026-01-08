import React, { useState } from "react";
import api from "../axios";

function useLogin() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loginUser = async (body) => {
    setLoading(true);
    setError(null);
    try {
      const resposne = await api.post(`/auth/login`, body);
      setData(resposne.data);
      // console.log(resposne);
      return resposne.data.data;
    } catch (err) {
      if (err.response?.status === 401) {
        throw new Error("INVALID_CREDENTIALS");
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };
  return { data, loading, error, loginUser };
}

export default useLogin;
