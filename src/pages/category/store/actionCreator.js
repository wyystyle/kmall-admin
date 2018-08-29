import { message } from 'antd';
import * as types from './actionTypes.js';
import { Request,setUserName   } from 'util';
import { getAddCategory,getLevelOneUrl } from 'api';

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
const SetLevelOneAction = (payload)=>{
	return {
		type:types.GET_LEVEL_ONE,
		payload
	}

}

const getPageReq = ()=>{
	return {
		type:types.GET_PAGE_REQUIRE
	}

}
const getPageDone = ()=>{
	return {
		type:types.GET_PAGE_DONE
	}

}
const getSetPage = (payload)=>{
	return {
		type:types.SET_PAGE,
		payload
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
			if(result.code == 0){
				if(result.data){
					dispatch(SetLevelOneAction(result.data))
					
				}
					message.success('添加成功')
			}else{
				message.success('添加失败')
			}
			dispatch(getAddDone())
		})
		
		.catch((err)=>{
			message.error('网络异常')
			dispatch(getAddDone())
		})		
	}

}
export const getLevelOneCategoryAction = ()=>{
	return (dispatch)=>{
		dispatch(getPageDone())
		Request({
			method:'get',
			url:getLevelOneUrl,
			data:{
				pid:0
			}
		})

		.then((result)=>{
			if(result.code == 0){
				dispatch(SetLevelOneAction(result.data))
			}else{
				console.log('获取失败')
			}
		})
		
		.catch((err)=>{
			message.error('网络异常')
		})		
	}

}
export const getPageCategoryAction = (pid,page)=>{
	return (dispatch)=>{
		dispatch(getPageReq())
		Request({
			method:'get',
			url:getLevelOneUrl,
			data:{
				page:page,
				pid:pid
			}
		})

		.then((result)=>{
			console.log('aaaaaaaaa',result)
			if(result.code == 0){
				dispatch(getSetPage(result.data))
			}else{
				console.log('获取失败')
			}
			dispatch(getPageDone())
		})
		
		.catch((err)=>{
			message.error('网络异常')
			dispatch(getPageDone())
		})		
	}

}
export const getShowUpdateModalAction = (updateId,updateName)=>{
	return {
		type:types.SHOW_UPDATE_MODAL,
		payload:{
			updateId,
			updateName
		}
	}
}