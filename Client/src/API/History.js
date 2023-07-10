import axios from 'axios';
import { addsessionuri, baseuri, getsessionsuri, loginuri } from '../APIEndpoints';

export async function get_user_sessions() {
    try {
        const response = await axios.get(getsessionsuri, { withCredentials: true });
        console.log(response.data);
        return response.data.sessions;// Handle the response data accordingly

    } catch (err) {
        console.error(err, 1);
        // Handle error condition
    }
}


export async function add_session(cycle, focusDuration, breakDuration) {
    try {
        const response = await axios.post(addsessionuri, {cycle: cycle, focusDuration: focusDuration, breakDuration: breakDuration}, { withCredentials: true });
        console.log(response.data);// Handle the response data accordingly

    } catch (err) {
        console.error(err);
        // Handle error condition
    }
}
