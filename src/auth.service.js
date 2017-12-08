import axios from 'axios';

const authAxios = axios.create({
    baseURL: 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/'
});
const API_KEY = 'AIzaSyBPqyddziPaQqhebHHfNg24Diqn_8XDpTA';

export default {
    saveUser(data) {
        return new Promise((resolve, reject) => {
            authAxios.post(`signupNewUser?key=${API_KEY}`, data)
                .then(res => {
                    resolve(res.data);
                }).catch(res => {
                    reject(res.status);
                });
        });
    },
    signInUser(data) {
        return new Promise((resolve, reject) => {
            authAxios.post(`verifyPassword?key=${API_KEY}`, data)
                .then(res => {
                    resolve(res.data);
                }).catch(res => {
                    reject(res.status);
                });
        });
    }
}