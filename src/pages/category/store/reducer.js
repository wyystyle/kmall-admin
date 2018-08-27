import * as types from './actionTypes.js';
import { fromJS } from 'immutable';

const defaultState = fromJS({
	isAddFetching:false
})

export default (state=defaultState,action)=>{
	if(action.type == types.ADD_REQUIRE){
		return state.set('isAddFetching',true)
	}
	if(action.type == types.ADD_DONE){
		return state.set('isAddFetching',false)
	}
	return state
} 