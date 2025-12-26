import React, { useCallback, useState } from 'react'
import api from '../axios';

const useDelete = () => {
  const [data, setData]= useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteUser = useCallback(
    async(id) => {
        setLoading(true);
        setError(null);
        try{
            const response = await api.delete(`/user/${id}`);
            setData(response.data);
            return response;
        }catch(e){
            setError(e);
            throw e;
        }finally{
            setLoading(false);
        }

    },[]
  );
  return { data, loading, error, deleteUser};
}

export default useDelete
