import Requests from './Requests';
import {add} from "react-native-reanimated";

/*
// Party {
//     name STRING
//     id NUMBER
//     address STRING
//     members STRING
// }
*/
export class ApiService {

    static async createParty(name, address) {
        const { response, error } = await Requests.post('/party/create', {name, address});
        if (error) throw error;
        return response;
    }

    static async getUser(uid) {
        const { response, error } = await Requests.get('/users/' + uid);
        if (error) throw error;
        return response;
    }

    static async addUsersByPhoneNumber(phones, partyId) {
        const users = [];
        for (const phone of phones) {
            const user = {
                phone: phone
            };
            users.push(user);
        }
        const { response, error } = await Requests.patch('/party/' + partyId, {users});
        if (error) throw error;
        return response;
    }

    static async addUsersByUid(uids, partyId) {
        const users = [];
        for (const uid of uids) {
            const user = {
                uid: uid
            };
            users.push(user);
        }
        const { response, error } = await Requests.patch('/party/' + partyId, {users});
        if (error) throw error;
        return response;
    }

    static async getUserParties(uid) {
        const { response, error } = await Requests.get('/users/' + uid + '/parties');
        if (error) throw error;
        return response;
    }


    static async registerUser(uid, fcmToken) {
        const { response, error } = await Requests.post('/users/register', {uid, fcm_token: fcmToken});
        if (error) throw error;
        await response;
    }

    static async unsubscribeToParty(uid, partyId) {
        const { response, error } = await Requests.delete('/users/' + uid + '/' + partyId);
        if (error) throw error;
        await response;
    }

    static async updateFcmToken(uid, token) {
        const { response, error } = await Requests.patch('/users/' + uid + '/update_token', {uid, fcm_token: token});
        if (error) throw error;
        await response;
    }


}
