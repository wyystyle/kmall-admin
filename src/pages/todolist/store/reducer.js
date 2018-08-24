import * as types from './actionType.js';
import { fromJS } from 'immutable';

const defaultState = fromJS({
	value:'hallow',
	list:['qaqa','qwqw']
})

export default (state=defaultState,action)=>{
	if(action.type == types.CHANGE_VALUE){

/*		const newState = JSON.parse(JSON.stringify(state));
		newState.value = action.payload;
		return newState*/
		return state.set('value',action.payload)
	}
	if(action.type == types.GET_LIST_INIT_DATA){

		/*const newState = JSON.parse(JSON.stringify(state));
		newState.list = action.payload;
		return newState*/
		return state.set('list',action.payload)
	}
	if(action.type == types.ADD_ITEM){
		/*const newState = JSON.parse(JSON.stringify(state));
		newState.list.push(newState.value);
		newState.value = '';
		return newState*/
		const newList = [...state.get('list'),state.get('value')];
		console.log(newList)
		return state.merge({
			list:newList,
			value:''
		})

	}
	if(action.type == types.DELETE_ITEM){
		/*const newState = JSON.parse(JSON.stringify(state));
		newState.list.splice(action.payload,1);
		return newState*/
		const newList = [...state.get('list')]
		newList.splice(action.payload,1);
		return state.set('list',newList)
	}

	return state
} 