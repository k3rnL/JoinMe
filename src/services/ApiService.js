import Requests from './Requests';

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
    const { response, error } = await Requests.post('/party/create', {
      name,
      address,
    });
    if (error) throw error;
    return response;
  }

  static async getUser(uid) {
    const { response, error } = await Requests.get(`/users/${uid}`);
    if (error) throw error;
    return response;
  }

  static async updateProfilePicture(uid, uri) {
    const data = new FormData();
    data.append('picture', {
      uri,
      type: 'image/jpeg',
      name: 'picture',
    });

    const { error } = await Requests.postFormData(`/users/${uid}/picture`, data);
    if (error) throw error;
  }

  static async addUsersByPhoneNumber(phones, partyId) {
    const users = phones.maps((phone) => ({ phone }));

    const { response, error } = await Requests.patch(`/party/${partyId}`, {
      users,
    });
    if (error) throw error;
    return response;
  }

  static async addUsersByUid(uids, partyId) {
    const users = uids.maps((uid) => ({ uid }));

    const { response, error } = await Requests.patch(`/party/${partyId}`, {
      users,
    });
    if (error) throw error;
    return response;
  }

  static async getUserParties(uid) {
    const { response, error } = await Requests.get(`/users/${uid}/parties`);
    if (error) throw error;
    return response;
  }

  static async registerUser(uid, fcmToken) {
    console.log('registerUser == ')
    const { error } = await Requests.post('/users/register', {
      uid,
      fcm_token: fcmToken,
    });
    if (error) throw error;
  }

  static async unsubscribeToParty(uid, partyId) {
    const { error } = await Requests.delete(`/users/${uid}/${partyId}`);
    if (error) throw error;
  }

  static async updateFcmToken(uid, token) {
    const { error } = await Requests.patch(`/users/${uid}/update_token`,
      {
        uid,
        fcm_token: token,
      });
    if (error) throw error;
  }
}
