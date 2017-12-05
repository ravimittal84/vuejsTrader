import axios from 'axios';

axios.defaults.baseURL = 'https://vuejs-trader-c57a6.firebaseio.com/';

export default {
    saveData(data) {
        return new Promise((resolve, reject) => {
            axios.put('data.json', data)
                .then(res => {
                    resolve(res.data);
                }).catch(res => {
                    reject(res.status);
                });
        });
    },
    loadData() {
        return new Promise(resolve => {
            axios.get(`data.json`)
                .then(res => {
                    resolve(res.data);
                }).catch(res => {
                    reject(res.status);
                });
        });
    }
}