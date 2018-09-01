import React,{ Component } from 'react';
import { Route,Switch } from "react-router-dom";
import ProductList from './list.js';
import ProductAdd from './save.js';


class Product extends Component{

	render(){
		return(
	
			<Switch>
				<Route path='/product/save/:productId?' component={ ProductAdd } />
				<Route path='/product' component={ ProductList } />
			</Switch>
		)
	}

}

export default Product