
import React,{ Component } from 'react';
import { Route,Switch,Link } from "react-router-dom";
import MyLayout from 'common/layout';

class CategoryList extends Component{

	render(){
		return(
			<MyLayout>
				<div>
					<Link to='/category/add'>add</Link>
				</div>
			</MyLayout>
		)
	}

}

export default CategoryList