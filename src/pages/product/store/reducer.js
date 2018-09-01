import * as types from './actionTypes.js';
import { fromJS } from 'immutable';

const defaultState = fromJS({
	parentCategoryId:'',
	categoryId:'',
	isSaveFetching:false,
	images:'',
	details:'',
	validateStatusValue:'',
	validateStatusHelpValue:'',
	getProducts:[],
	isPageFetching:false,

	current:0,
	total:0,
	pageSize:0,
	list:[],

	editName:'',
	editSketch:'',
	editPrice:'',
	editShopnum:''

})

export default (state=defaultState,action)=>{
	if(action.type === types.GET_CATEGORY){
		return state.merge({
			parentCategoryId:action.payload.parentCategoryId,
			categoryId:action.payload.categoryId,
			validateStatusValue:"",
			validateStatusHelpValue:""
		})		
	}
	if(action.type == types.GET_IMAGES){
		return state.set('images',action.images)
	}
	if(action.type == types.GET_IDETAL){
		return state.set('details',action.value)
	}
	if(action.type == types.SAVE_REQUIRE){
		return state.set('isSaveFetching',true)
	}
	if(action.type == types.SAVE_DONE){
		return state.set('isSaveFetching',false)
	}
	if(action.type == types.SET_ERROR){
		return state.merge({
			validateStatusValue:"error",
			validateStatusHelpValue:"请选择分类"
		})
	}
	if(action.type == types.SET_PAGE){
		return state.merge({
			current:action.payload.current,
			total:action.payload.total,
			pageSize:action.payload.pageSize,
			list:fromJS(action.payload.list)			
		})
	}
	if(action.type == types.SET_EDIT_PRODUCT_ACTION){
		return state.merge({
			images:action.payload.images,
			details:action.payload.details,
			parentCategoryId:action.payload.CategoryId.pid,
			categoryId:action.payload.CategoryId._id,
			editName:action.payload.name,
			editSketch:action.payload.Sketch,
			editPrice:action.payload.price,
			editShopnum:action.payload.shopnum

		})
	}






	if(action.type == types.GET_LEVEL_ONE){
		return state.set('getProducts',fromJS(action.payload))
	}
	if(action.type == types.SET_PAGE){
		return state.merge({
			current:action.payload.current,
			total:action.payload.total,
			pageSize:action.payload.pageSize,
			list:fromJS(action.payload.list)			
		})
	}
	if(action.type == types.GET_PAGE_REQUIRE){
		return state.set('isPageFetching',true)
	}
	if(action.type == types.GET_PAGE_DONE){
		return state.set('isPageFetching',false)
	}
	if(action.type === types.SHOW_UPDATE_MODAL){
		return state.merge({
			updateModalVisible:true,
			updateId:action.payload.updateId,
			updateName:action.payload.updateName,
		})		
	}
	if(action.type == types.CLOSE_UPDATE_MODAL){
		return state.set('updateModalVisible',false)
	}
	if(action.type == types.CHANGE_UPDATE_NAME_MODAL){
		return state.set('updateName',action.payload)
	}
	if(action.type === types.UPDATE_NAME_MODAL){
		return state.merge({
			current:action.payload.current,
			total:action.payload.total,
			pageSize:action.payload.pageSize,
			list:fromJS(action.payload.list)
		})		
	}
	if(action.type === types.UPDATE_ORDER_MODAL){
		return state.merge({
			current:action.payload.current,
			total:action.payload.total,
			pageSize:action.payload.pageSize,
			list:fromJS(action.payload.list)
		})		
	}

	return state
} 