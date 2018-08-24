import axios from 'axios';
export const Request =((options)=>{
	return new Promise((resolve,reject)=>{
		axios({
			method:options.method || 'get',
			url:options.url,
			data:options.data || null
		})
		.then(result=>{
			let data = result.data;
			if(data.code == 10){
				window.location.href = '/login';
				reject(data.message);
			}else{
				resolve(data);
			}
		})
		.catch(err=>{
			reject(err);
		})
	})
})
export const setUserName = (username)=>{
	window.localStorage.setItem('username',username)
}

export const getUserName = ()=>{
	return window.localStorage.getItem('username')
}

export const removeUserName = ()=>{
	window.localStorage.removeItem('username')
}
