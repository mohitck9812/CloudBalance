export async function handleDeleteUser(user, deleteUser,setData){

    try{
        await(deleteUser(user.id));
        setData(prev => prev.filter(v => v.id !== user.id));
    }catch(e){
        console.log(e);
    }

}