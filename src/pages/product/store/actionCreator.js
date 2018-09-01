import { message } from 'antd';
import * as types from './actionTypes.js';
import { Request,setUserName   } from 'util';
import { 
	SaveUrl,
	getProductUrl,
	updataProductOrderModal,
	updataProductStatesModal,
	getEditProductUrl 
} from 'api';


export const getCategoryAction = (parentCategoryId,categoryId)=>{
	return {
		type:types.GET_CATEGORY,
		payload:{
			parentCategoryId:parentCategoryId,
			categoryId:categoryId
		}
	}

}
export const getImageAction = (images)=>{
	return {
		type:types.GET_IMAGES,
		images
	}

}
export const getDetalValueAction = (value)=>{
	return {
		type:types.GET_IDETAL,
		value
	}

}
const getSaveReq = ()=>{
	return {
		type:types.SAVE_REQUIRE
	}

}
const getSaveDone = ()=>{
	return {
		type:types.SAVE_DONE
	}

}
export const setErrorAction = ()=>{
	return {
		type:types.SET_ERROR
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

export const getSaveAction = (err,values)=>{
	return (dispatch,getState)=>{
		const state = getState().get('product');
		const categoryId = state.get('categoryId');
		if(!categoryId){
			dispatch(setErrorAction())
			return;
		}
		if(err){
			return;
		}
		dispatch(getSaveReq())
		Request({
			method:'post',
			url:SaveUrl,
			data:{
				...values,
				images:state.get('images'),
				details:state.get('details'),
				categoryId:categoryId
			}
		})
		.then((result)=>{
			if(result.code==0){
				dispatch(getSaveDone())
				window.location.href='/product'
			}
			
		})
		
		.catch((err)=>{
			message.error('网络异常')
			dispatch(getSaveDone())
		})		
	}

}
export const getPageProductAction = (page)=>{
	return (dispatch)=>{
		dispatch(getPageReq())
		Request({
			method:'get',
			url:getProductUrl,
			data:{
				page:page
			}
		})

		.then((result)=>{
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
export const getUpdateOrderAction = (payload)=>{
	return {
		type:types.UPDATE_ORDER_MODAL,
		payload
	}
}
export const setEditProductAction = (payload)=>{
	return {
		type:types.SET_EDIT_PRODUCT_ACTION,
		payload
	}
}
export const getUpdateOrderModalAction = (id,newOrder)=>{
	return (dispatch,getState)=>{
		const state = getState().get('product');
		Request({
			method:'put',
			url:updataProductOrderModal,
			data:{
				id:id,
				order:newOrder,
				page:state.get('current'),
			}
		})
		.then((result)=>{
			if(result.code==0){
				dispatch(getUpdateOrderAction(result.data))
			}else{
				message.error(result.message)
			}
		})
		.catch((err)=>{
			message.error('网络异常')
		})		
	}

}
export const getUpdateStatesModalAction = (id,newDefaultChecked)=>{
	return (dispatch,getState)=>{
		const state = getState().get('product');
		Request({
			method:'put',
			url:updataProductStatesModal,
			data:{
				id:id,
				states:newDefaultChecked,
				page:state.get('current')
			}
		})
		.then((result)=>{
			if(result.code==0){
				message.success(result.message)
			}else{
				message.error(result.message)
				dispatch(getUpdateOrderAction(result.data))
			}
		})
		.catch((err)=>{
			message.error('网络异常')
		})		
	}

}
export const getEditProduct = (productId)=>{
	return (dispatch)=>{
		Request({
			method:'get',
			url:getEditProductUrl,
			data:{
				id:productId
			}
		})
		.then((result)=>{
			if(result.code == 0){
				dispatch(setEditProductAction(result.data))
			}else{
				console.log('获取失败')
			}
		})
		
		.catch((err)=>{
			message.error('网络异常')
		})		
	}

}














/*export const getPageCategoryAction = (pid,page)=>{
	return (dispatch)=>{
		dispatch(getPageReq())
		Request({
			method:'get',
			url:getProductUrl,
			data:{
				page:page,
				pid:pid
			}
		})

		.then((result)=>{
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

}*/


/*export const getUpdateOrderAction = (payload)=>{
	return {
		type:types.UPDATE_ORDER_MODAL,
		payload
	}
}*/
/*export const getUpdateModalAction = (pid)=>{
	return (dispatch,getState)=>{
		const state = getState().get('category');
		Request({
			method:'put',
			url:updataNameModal,
			data:{
				id:state.get('updateId'),
				name:state.get('updateName'),
				page:state.get('current'),
				pid:pid
			}
		})
		.then((result)=>{
			if(result.code==0){
				dispatch(getUpdateNameAction(result.data))
				dispatch(getCloseUpdateModalAction())

			}else{
				message.error(result.message)
			}
		})
		.catch((err)=>{
			message.error('网络异常')
		})		
	}

}*/



/*export const getUpdateOrderModalAction = (pid,id,newOrder)=>{
	return (dispatch,getState)=>{
		const state = getState().get('category');
		Request({
			method:'put',
			url:updataOrderModal,
			data:{
				id:id,
				order:newOrder,
				page:state.get('current'),
				pid:pid
			}
		})
		.then((result)=>{
			if(result.code==0){
				dispatch(getUpdateOrderAction(result.data))
			}else{
				message.error(result.message)
			}
		})
		.catch((err)=>{
			message.error('网络异常')
		})		
	}

}*/


