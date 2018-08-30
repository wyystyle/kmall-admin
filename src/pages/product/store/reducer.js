import * as types from './actionTypes.js';
import { fromJS } from 'immutable';

const defaultState = fromJS({
	isAddFetching:false,
	OneLevelCategories:[],
	isPageFetching:false,
	current:0,
	total:0,
	pageSize:0,
	list:[],
	updateModalVisible:false,
	updateId:'',
	updateName:''
})

export default (state=defaultState,action)=>{
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