
import { message } from 'antd';
import * as types from './actionTypes.js';
import { Request,setUserName   } from 'util';
import { loginUrl} from 'api';

const getLoginReq = ()=>{
	return {
		type:types.GET_LOGIN_REQUIRE
	}

}
const getLoginDone = ()=>{
	return {
		type:types.GET_LOGIN_DONE
	}

}

export const getLoginAction = (values)=>{
	return (dispatch)=>{
		dispatch(getLoginReq())
		Request({
			method:'post',
			url:loginUrl,
			data:values
		})

		.then((result)=>{
			if(result.code == 0){
				setUserName(result.data.username)
				window.location.href = '/';
			}else if(result.code == 1){
				message.error(result.message)
			}
			dispatch(getLoginDone())
		})
		
		.catch((err)=>{
			message.error('网络异常')
			dispatch(getLoginDone())
		})		
	}

}