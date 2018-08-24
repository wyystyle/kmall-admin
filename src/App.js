import React,{ Component } from 'react';
import Login from 'pages/login/';
import Home from 'pages/home/';
import { getUserName } from 'util'

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
  Switch
} from "react-router-dom";
class App extends Component{
	render(){
		const ProtectedRouter = ({component:Component,...rest})=>(
			<Route 
				{...rest}
				render = {props=>(
					getUserName()
					? <Component {...props} />
					: <Redirect to="/login" />
				)}
			/>
		)

		const LoginRouter =({component:Component,...rest})=>{
			if(getUserName()){
				return <Redirect to="/" />
			}else{
				return <Route {...rest} component={Component} />
			}
		}
		//return 只能返回一个
		return(
			<Router>
				<div className="App">	
					<ProtectedRouter exact path="/" component={ Home } />				
					<LoginRouter path="/login" component={ Login } />
				</div>		
			</Router>		
		)
	}

}

export default App;