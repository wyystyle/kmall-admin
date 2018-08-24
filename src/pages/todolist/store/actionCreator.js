import * as types from './actionType.js';
import axios from 'axios';

export const changeValueAction  = (payload)=>{
	return {
		type:types.CHANGE_VALUE,
		payload
	}

}
export const addItemAction = ()=>{
	return {
		type:types.ADD_ITEM,
	}

}
export const deleteItemAction = (payload)=>{
	return {
		type:types.DELETE_ITEM,
		payload
	}

}
export const getListInitData = (payload)=>{
	return {
		type:types.GET_LIST_INIT_DATA,
		payload
	}

}
export const getServerData = (payload)=>{
	return (dispatch)=>{
		axios
		.get('http://127.0.0.1:3000')
		.then((data)=>{
			const action = getListInitData(data.data)
			dispatch(action)
		})
		.catch((e)=>{
			console.log(e);
		})
	}

}

