import { useCallback, useState } from "react";
import api from "../axios";


export default function useFetchUserByID(){
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getUserById = useCallback(
        async(userId) => {
            setLoading(true);
            try{
                const response = await api.get(`/user/${userId}`);
                setData(response.data?.data);
            }catch(e){
                setError(e);
            }finally{
                setLoading(false);
            }
        },[]
    )
    return {data, loading, error, getUserById};
}