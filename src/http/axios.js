import axios from 'axios';
import qs from 'qs'
axios.defaults.withCredentials = true;
// axios.defaults.baseURL = 'http://120.79.220.62:8099'
// axios.defaults.baseURL = 'http://47.107.71.18:8099'
// axios.defaults.baseURL = 'http://120.79.191.20:8099'
// axios.defaults.baseURL = 'http://120.79.247.97:8099'
axios.defaults.baseURL = 'http://120.78.164.247:8888'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.interceptors.request.use((config) => {
	if (config.method == 'post') {
		config.data = qs.stringify(config.data, { arrayFormat: 'repeat' });
	}
	return config;
})
axios.interceptors.response.use((response)=>{
	if (response && response.data.status == 500 && response.data.message=='尚未登陆，请登陆！') {
		window.vm.currentComponent='Login';
	}
	return response
})
export default axios;