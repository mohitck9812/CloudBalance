import { useCallback, useState } from "react";
import api from "../axios";


function useFetchAllUser(){
    const [data, setData] = useState([]);;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchAllUser = useCallback(
        async() => {
            setLoading(true);
            try{
                const response = await api.get(`/user/all-user`);
                setData(response.data);
                // console.log(response.data)
            }catch(e){
                setError(e);
            }finally{
                setLoading(false);
            }
        },[]
    )
    return {data, loading, error, fetchAllUser};
}

export default useFetchAllUser
