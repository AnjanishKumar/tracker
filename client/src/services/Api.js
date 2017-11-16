/*
* tracker
 */
import axios from 'axios';

export default () => {
    // Create a new instance of axios with given config and return it
    return axios.create({
        baseURL: 'http://localhost:8081',
    });
};
