export const setToken =(token) => {
    localStorage.setItem('jwt',token)
}

export const getToken=()=>{
    const status = localStorage.getItem("jwt")
    return status;
}

export const removeToken =() => {
    localStorage.removeItem("jwt")
}