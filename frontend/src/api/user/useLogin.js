import React, { useState } from 'react'
import api from "../axios"

function useLogin(){
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loginUser =  async (body) => {
            setLoading(true);
            setError(null);
            try{
                const resposne = await api.post(`/auth/login`, body )
                setData(resposne.data);
                // console.log(resposne);
                return resposne.data;
            }catch(e){
                setError(e);
                throw e;
            }finally{
                setLoading(false);
            }
        }
    return { data, loading, error, loginUser};
}

export default useLogin;
