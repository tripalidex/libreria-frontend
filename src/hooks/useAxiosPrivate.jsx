import { useEffect } from 'react'
import useAuth from './useAuth';
import { axiosPrivateInstance } from '../api/axios';

const useAxiosPrivate = () => {
    const { auth } = useAuth();

    useEffect(() => {
        const requestIntercept = axiosPrivateInstance.interceptors.request.use(
            config => {
                if (!config.headers.Authorization) {
                    config.headers.Authorization = `Bearer ${auth?.token}`;
                }
                return config;
            },
            error => Promise.reject(error)
        );

        return () => {
            axiosPrivateInstance.interceptors.request.eject(requestIntercept);
        }
    }, [auth]);

    return axiosPrivateInstance;
}

export default useAxiosPrivate