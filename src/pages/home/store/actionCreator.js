
import { message } from 'antd';
import * as types from './actionTypes.js';
import { Request,setUserName   } from 'util';
import { homeCountUrl} from 'api';


const setCountData = (payload)=>{
	return {
		type:types.GET_COUNT,
		payload
	}

}

export const getCountAction = ()=>{
	return (dispatch)=>{
		Request({
			url:homeCountUrl,
		})

		.then((result)=>{
			if(result.code == 0){
				const action = setCountData(result.data)
				dispatch(action)
			}else if(result.code == 1){
				message.error(result.message)
			}
		})
		
		.catch((err)=>{
			message.error('网络异常')
		})		
	}

}