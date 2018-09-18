import { message } from 'antd';
import * as types from './actionTypes.js';
import { Request,setUserName   } from 'util';
import { 
	getOrderUrl,
	getOrderSearchUrl,
	getOrderDetailUrl,
	updateOrderDetailUrl,

	SaveUrl,
	updataProductOrderModal,
	updataProductStatesModal,
	getEditProductUrl,
	getSearchUrl 
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
export const setImageError = ()=>{
	return {
		type:types.SET_IMAGES_ERROR
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
		type:types.SET_ORDER_PAGE,
		payload
	}

}
const getOrderSetSearch = (payload)=>{
	return {
		type:types.SET_ORDER_SEARCH,
		payload
	}

}
export const getSaveAction = (err,values)=>{
	return (dispatch,getState)=>{
		const state = getState().get('product');
		const categoryId = state.get('categoryId');
		const images = state.get('images');
		let hasError = false;
		if(!categoryId){
			dispatch(setErrorAction())
			hasError = true
		}
		if(!images){
			dispatch(setImageError())
			hasError = true
		}
		if(hasError){
			return
		}
		if(err){
			return;
		}
		dispatch(getSaveReq())
		let method = 'post';
		if(values.id){	
			method = 'put';
		}
		Request({
			method:method,
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
/*				dispatch(getSaveDone())*/
				window.location.href='/product'
			}
			
		})
		
		.catch((err)=>{
			message.error('网络异常')
			dispatch(getSaveDone())
		})		
	}

}

//order
export const getPageOrderAction = (page)=>{
	return (dispatch)=>{
		dispatch(getPageReq())
		Request({
			method:'get',
			url:getOrderUrl,
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
export const getOrderDetailAction = (payload)=>{
	return {
		type:types.GET_ORDER_DETAIL_ACTION,
		payload
	}
}

export const getOrderCategoryAction = (orderNo)=>{
	return (dispatch)=>{
		Request({
			method:'get',
			url:getOrderDetailUrl,
			data:{
				orderNo:orderNo
			}
		})
		.then((result)=>{
				console.log(result)
			if(result.code == 0){
				dispatch(getOrderDetailAction(result.data))
			}else{
				console.log('获取失败')
			}
		})
		
		.catch((err)=>{
			message.error('网络异常')
		})		
	}

}

//order
export const getSearchOrderAction = (keyword,page)=>{
	return (dispatch)=>{
		Request({
			method:'get',
			url:getOrderSearchUrl,
			data:{
				keyword,
				page
			}
		})
		.then((result)=>{
			if(result.code == 0){
				dispatch(getOrderSetSearch(result.data))
			}else{
				console.log('获取失败')
			}
		})
		
		.catch((err)=>{
			message.error('网络异常')
		})		
	}

}
export const getOrderDeliverAction = (orderNo)=>{
	return (dispatch)=>{
		Request({
			method:'put',
			url:updateOrderDetailUrl,
			data:{
				orderNo:orderNo
			}
		})
		.then((result)=>{
				console.log(result)
			if(result.code == 0){
				dispatch(getOrderDetailAction(result.data))
			}else{
				console.log('获取失败')
			}
		})
		
		.catch((err)=>{
			message.error('网络异常')
		})		
	}

}














