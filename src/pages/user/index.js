import React,{ Component } from 'react';
import Layout from 'common/layout';
import { Table,Tabs } from 'antd';
import moment from 'moment';

import { actionCreator } from './store';
import { connect } from 'react-redux';
const TabPane = Tabs.TabPane;	
class User extends Component{
	componentDidMount(){
		this.props.getPageData(1);
	}	
	render(){
		const columns = [{
		  title: '用户名',
		  dataIndex: 'username',
		  key: 'username',
		}, {
		  title: '是否管理员',
		  dataIndex: 'isAdmin',
		  key: 'isAdmin',
		  render: isAdmin =>(isAdmin ? '是' : '否')
		},{
		  title: '邮箱',
		  dataIndex: 'email',
		  key: 'email',
		},{
		  title: '手机',
		  dataIndex: 'phone',
		  key: 'phone',
		},{
		  title: '创建时间',
		  dataIndex: 'createdAt',
		  key: 'createdAt',
		}];
		const dataSource = [{
		  key: '1',
		  username: 'admin',
		  isAdmin: true
		}, {
		  key: '2',
		  username: 'test1',
		  isAdmin: false	
		}];
		const data = this.props.list.map((user)=>{
			return {
				key:user.get('_id'),
				username:user.get('username'),
				isAdmin:user.get('isAdmin'),
				phone:user.get('phone'),
				email:user.get('email'),
				createdAt:moment(user.get('createdAt')).format('YYYY-MM-DD HH:mm:ss')
			}
		}).toJS();
		return(
			<div>
				<Layout>
				  <Tabs defaultActiveKey="1">
				    <TabPane tab="后台首页" disabled key="2"></TabPane>
				    <TabPane tab="用户列表" key="3"></TabPane>
				  </Tabs>				<Table				 
				dataSource={data}
				columns={columns} 
				pagination={
					{	
						current:this.props.current,
						defaultCurrent:this.props.current,
						total:this.props.total,
						pageSize:this.props.pageSize
					}
				}
				onChange = {(pagination)=>{
					this.props.getPageData(pagination.current)
				}}
				loading = {
					{	
						spinning:this.props.isFetching,
						size:'large',
						tip:'正在加载'
					}
				}
				/>
				</Layout>
			</div>
		)
	}

}
const mapStateToProps=(state)=>{
	return {
		isFetching:state.get('user').get('isFetching'),
		current:state.get('user').get('current'),
		total:state.get('user').get('total'),
		pageSize:state.get('user').get('pageSize'),
		list:state.get('user').get('list')

	}	
}
const mapDispatchToProps=(dispatch)=>{
	return {
		getPageData:(page)=>{
			dispatch(actionCreator.getPageAction(page))
		}
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(User);