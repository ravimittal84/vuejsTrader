import axios from 'axios';

axios.defaults.baseURL = 'https://api.fullstackweekly.com';

axios.interceptors.request.use(function (config) {
    const token = window.localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

const appService = {
    getposts(categoryId) {
        return new Promise(resolve => {
            axios.get(`/wp-json/wp/v2/posts?categories=${categoryId}&per_page=6`)
                .then(res => {
                    resolve(res.data);
                });
        });
    },
    login(cred) {
        return new Promise((resolve, reject) => {
            axios.post('/services/auth.php', cred)
                .then(res => {
                    resolve(res.data);
                }).catch(res => {
                    reject(res.status);
                });
        });
    },
    getProfile() {
        return new Promise(resolve => {
            axios.get('/services/profile.php')
                .then(res => {
                    resolve(res.data);
                });
        });
    }
};

export default appService;