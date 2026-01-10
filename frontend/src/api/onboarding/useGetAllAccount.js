import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import api from "../axios";

function useGetAllAccount(){
    const [data, setData] = useState();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    const getAllAccount = useCallback(async()=>{
        setLoading(true);
        setError(null);
        try{
            const response = await api.get(`/account/get-all`);
            if(response){
                setData(response.data.data);
            }
            return response;
        }catch(e){
            setError(e);
            throw(e);
        }finally{
            setLoading(false);
        }
    },[]);
    return{data, loading, error, getAllAccount}
}
export default useGetAllAccount;