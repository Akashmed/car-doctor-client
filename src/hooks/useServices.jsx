import { useEffect, useState } from "react";
import  { axiosSecure } from "./useAxiosSecure";

const useServices = (asc,search) => {
    const [services, setServices] = useState([]);

    useEffect(()=>{
        axiosSecure.get(`/services?sort=${asc ? 'asc' : 'desc'}&search=${search}`)
        .then(res => setServices(res.data))

        // axios.get('https://car-doctor-server-blond-seven.vercel.app/services',{withCredentials:true})
        // .then(res =>{
        //     setServices(res.data)fd;
        // })
    },[asc, search])

    return services;
};

export default useServices;