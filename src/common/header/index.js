import React,{ Component } from 'react';
import { Request,getUserName,removeUserName } from 'util';
import { Layout, Menu,Dropdown,Button,Icon } from 'antd';
import './index.css';
import { logoutUrl } from 'api';
const { Header} = Layout;

class MyHeader extends Component{
	constructor(props){
		super(props);
		this.handelMenuClick=this.handelMenuClick.bind(this);
	}
handelMenuClick(){
	Request({
		url:logoutUrl
	})
	.then((result)=>{

			removeUserName();
			window.location.href = '/login';

		})
	.catch((e)=>{
		console.log(e)
	})
}

	render(){
		const menu = (
		  <Menu onClick ={this.handelMenuClick}>
		    <Menu.Item key="0">
		      <Icon type="logout" />退出
		    </Menu.Item>
		  </Menu>
		);
		return(
			<div>
				<Header className="header">
					<div className='logo'>KMALL</div>
				   <Dropdown overlay={menu} trigger={['click']}>
				    <a className="ant-dropdown-link" href="#">
				      { getUserName() }<Icon type="down" />
				    </a>
				  </Dropdown>
			    </Header>
			</div>
		)
	}

}


export default MyHeader;