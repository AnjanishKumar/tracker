/*
 * tracker
 */

import api from '@/services/Api';

export default {

    /**
     * Send a registration request to the application server.
     * @param {object} credentials Registration data
     * @return {object} user data
     */
    register(credentials) {
        return api().post('/register', credentials);
    },

    /**
     * Send a login request to the application server.
     * @param {object} credentials user credentials
     */
    login(credentials) {

    },

    /**
     * send a logout request to the application server.
     */
    logout() {

    },
};
