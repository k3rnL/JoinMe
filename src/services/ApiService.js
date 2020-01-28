import Requests from '../services/Requests';

/*
// Party {
//     name STRING
//     id NUMBER
//     address STRING
//     members STRING
// }
*/
export class ApiService {

    static async getUserParties(uid) {
        const { response, error } = await Requests.get('/users/' + uid + '/parties');
        if (error) throw error;
        return response;
    }

    static async registerUser(uid, fcmToken) {
        const { response, error } = await Requests.post('/users/register', JSON.stringify({uid, fcm_token: fcmToken}));
        if (error) throw error;
        await response;
    }

}
