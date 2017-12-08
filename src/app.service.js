import axios from 'axios';

const appAxios = axios.create({
    baseURL: 'https://vuejs-trader-c57a6.firebaseio.com/'
});

const token = window.localStorage.getItem('token');

// axios.defaults.headers.get['Accepts'] = 'application/json';
// axios.defaults.headers.common['Authorization'] = 'Bearer Token!!';

// appAxios.interceptors.request.use(config => {
//     const token = window.localStorage.getItem('token');
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config; // Always return config, otherwise request will be blocked
// });

// axios.interceptors.response.use(res => {
//     res.data = {};
//     return res;
// });

export default {
    saveData(data) {
        return new Promise((resolve, reject) => {
            appAxios.put(`data.json?auth=${token}`, data)
                .then(res => {
                    resolve(res.data);
                }).catch(res => {
                    reject(res.status);
                });
        });
    },
    loadData() {
        return new Promise((resolve, reject) => {
            appAxios.get(`data.json?auth=${token}`)
                .then(res => {
                    resolve(res.data);
                }).catch(res => {
                    reject(res.status);
                });
        });
    },
    saveUser(data) {
        return new Promise((resolve, reject) => {
            appAxios.post(`users.json?auth=${token}`, data)
                .then(res => {
                    resolve(res.data);
                }).catch(res => {
                    reject(res.status);
                });
        });
    },
    fetchUsers() {
        return new Promise((resolve, reject) => {
            appAxios.get(`users.json?auth=${token}`)
                .then(res => {
                    resolve(res.data);
                }).catch(res => {
                    reject(res.status);
                });
        });
    }
}