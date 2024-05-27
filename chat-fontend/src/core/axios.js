import axios from 'axios';
import getCookie from '../utils/helpers/getCookie' ;
axios.defaults.baseURL = 'http://217.71.129.139:4761/';
axios.defaults.headers.common['token'] = getCookie('acsTKn');
axios.defaults.headers.common['Accept'] = "*"
axios.defaults.headers.common['Access-Control-Allow-Headers'] = "*"



axios.defaults.withCredentials = true;


window.axios = axios;


export default axios;