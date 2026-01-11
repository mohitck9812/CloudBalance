import { useCallback, useState } from "react";
import api from "../axios";
import { toast } from "react-toastify";


export default function useEditUser(){
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const editUser = useCallback(
        async(userId, body) => {
            setLoading(true);
            try{
                const response = await api.put(`/user/${userId}`, body);
                if(response){
                setData(response.data)
                toast.success(`User ${body.firstName} updated`);
                }
            }catch(e){
                setError(e);
            }finally{
                setLoading(false);
            }
        },[]
    )
    return {data, loading, error, editUser}
}