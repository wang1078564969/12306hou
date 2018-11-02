import axios from 'axios';
import qs from 'qs'
axios.defaults.withCredentials = true;
// axios.defaults.baseURL = 'http://120.79.220.62:8099'

axios.defaults.baseURL = 'http://120.79.191.20:8099'
// axios.defaults.baseURL = 'http://120.79.247.97:8099'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.interceptors.request.use((config) => {
	if (config.method == 'post') {
		config.data = qs.stringify(config.data, { arrayFormat: 'repeat' });
	}
	return config;
})


export default axios;