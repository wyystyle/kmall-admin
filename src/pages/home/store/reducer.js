import * as types from './actionTypes.js';
import { fromJS } from 'immutable';

const defaultState = fromJS({
	usernum:200,
	ordernum:201,
	productnum:202
})

export default (state=defaultState,action)=>{
	if(action.type == types.GET_COUNT){
		return state.merge({
			usernum:action.payload.usernum,
			ordernum:action.payload.ordernum,
			productnum:action.payload.productnum
		})
	}

	return state
} 