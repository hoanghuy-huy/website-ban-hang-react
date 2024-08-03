// import * as httpRequest from '~/utils/httpRequest';
import axios from 'axios';

const apiSearchUser = (q) => {
    try {
        const res = axios.get(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(q)}&type=less`);

        return res;
    } catch (error) {
        console.log(error);
    }
};

export { apiSearchUser };
