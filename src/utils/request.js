import axios from 'axios'

// create an axios instance
const service = axios.create({
  baseURL: 'http://api.com/v1/',
  //baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// http request 请求拦截器
service.interceptors.request.use(config => {
	// 在发送请求之前做些什么
	//let pathname = location.pathname;
	//if(localStorage.getItem('token')){
		//if(pathname != '/' &&  pathname != '/login'){
			//config.headers.common['token'] = localStorage.getItem('token');
		//}
	//}
	return config;
}, error => {
	// 对请求错误做些什么
	return Promise.reject(error);
});

// http response 响应拦截器
service.interceptors.response.use(response => {
  return response;
},error => {
  if (error.response) {
   switch (error.response.status) {
     // 返回401，清除token信息并跳转到登录页面
     case 401:
     //localStorage.removeItem('token');
     //router.replace({
       //path: '/login'
       //登录成功后跳入浏览的当前页面
       // query: {redirect: router.currentRoute.fullPath}
     //})
   }
   // 返回接口返回的错误信息
   return Promise.reject(error.response.data);
 }
});


export default service
