import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";


export const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true
})


const useAxiosSecure = () => {
    const { logOut } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        // Kickout user using interceptor
        axiosSecure.interceptors.response.use(res => {
            return res;
        }, error => {

            // console.log('value tracked at', error.response);
            if (error.response.status === 401 || error.response.status === 403) {

                logOut()
                    .then(res => {
                        navigate('/login');
                    })
                    .catch(error => console.log(error))
            }
        })

    }, [logOut,navigate])
    return axiosSecure;
};

export default useAxiosSecure;