

const API_URL = 'https://join-me-api.herokuapp.com';

// class Party {
//     name;
//     id;
//     address;
//     members;
// }

export class ApiService {

    static async getUserParties(uid) {
        let response = await fetch(API_URL + '/users/' + uid + '/parties',
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            });
        let parties = await response.json();
        return parties;
        // return Object.assign([], JSON.parse(response.data).parties);
    }

    static async registerUser(uid, fcmToken) {
        let response = await fetch(API_URL + '/users/register',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({uid, fcm_token: fcmToken})
            });
        await response.json();
    }

}
