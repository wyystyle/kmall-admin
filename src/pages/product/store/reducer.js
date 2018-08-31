import * as types from './actionTypes.js';
import { fromJS } from 'immutable';

const defaultState = fromJS({
	parentCategoryId:'',
	categoryId:'',
	isSaveFetching:false,
	images:'',
	detal:'',
	validateStatusValue:'',
	validateStatusHelpValue:''

/*	isAddFetching:false,
	OneLevelCategories:[],
	isPageFetching:false,
	current:0,
	total:0,
	pageSize:0,
	list:[],
	updateModalVisible:false,
	updateId:'',
	updateName:''*/
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
		return state.set('images',action.payload)
	}
	if(action.type == types.GET_IDETAL){
		return state.set('detal',action.payload)
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






	if(action.type == types.ADD_REQUIRE){
		return state.set('isAddFetching',true)
	}
	if(action.type == types.ADD_DONE){
		return state.set('isAddFetching',false)
	}
	if(action.type == types.GET_LEVEL_ONE){
		return state.set('OneLevelCategories',fromJS(action.payload))
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