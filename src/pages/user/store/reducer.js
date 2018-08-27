import * as types from './actionTypes.js';
import { fromJS } from 'immutable';

const defaultState = fromJS({
	isFetching:false,
	current:1,
	total:300,
	pageSize:10,
	list:[]
})

export default (state=defaultState,action)=>{
	if(action.type == types.SET_PAGE){
		return state.merge({
			current:action.payload.current,
			total:action.payload.total,
			pageSize:action.payload.pageSize,
			list:fromJS(action.payload.list)			
		})
	}
	if(action.type == types.GET_PAGE_REQUIRE){
		return state.set('isFetching',true)
	}
	if(action.type == types.GET_PAGE_DONE){
		return state.set('isFetching',false)
	}
	return state
} 