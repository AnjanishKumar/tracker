/*
 * tracker
 */

import api from '@/services/Api';

export default {

    /**
     * Send a registration request to the application server.
     * @param {object} data Registration data
     * @return {object} Promise object
     */
    register(data) {
        return api().post('/auth/register', data);
    },

    /**
     * Send a login request to the application server.
     * @param {object} credentials user credentials
     * @return {object} Promise object
     */
    login(credentials) {
      return api().post('/auth/login', credentials);
    },

    /**
     * send a logout request to the application server.
     * @return {object} Promise object
     */
    logout() {
      return api().post('/auth/logout', credentials);
    },
};
