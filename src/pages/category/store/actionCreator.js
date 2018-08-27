import { message } from 'antd';
import * as types from './actionTypes.js';
import { Request,setUserName   } from 'util';
import { getAddCategory } from 'api';

const getAddReq = ()=>{
	return {
		type:types.ADD_REQUIRE
	}

}
const getAddDone = ()=>{
	return {
		type:types.ADD_DONE
	}

}

export const getAddAction = (values)=>{
	return (dispatch)=>{
		dispatch(getAddReq())
		Request({
			method:'post',
			url:getAddCategory,
			data:values
		})

		.then((result)=>{
			console.log(result);
			dispatch(getAddDone())
		})
		
		.catch((err)=>{
			message.error('网络异常')
			dispatch(getAddDone())
		})		
	}

}