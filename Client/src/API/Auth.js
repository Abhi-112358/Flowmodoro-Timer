import axios from 'axios';
import {loginuri, signouturi } from '../APIEndpoints';

export async function login_signup(google_email) {
    try {
        const response = await axios.post(loginuri, {email: google_email, password: ' '}, { withCredentials: true });
        console.log(response.data); // Handle the response data accordingly

    } catch (err) {
        console.error(err);
        // Handle error condition
    }
}

export async function signout() {
    try {
        const response = await axios.post(signouturi, { withCredentials: true });
        console.log(response.data); // Handle the response data accordingly

    } catch (err) {
        console.error(err);
        // Handle error condition
    }
}