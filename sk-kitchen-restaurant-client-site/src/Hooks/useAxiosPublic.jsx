import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://restaurant-project-server-tau.vercel.app'
});

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;
