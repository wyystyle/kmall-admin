import React,{ Component } from 'react';
import Layout from 'common/layout';
import { Table } from 'antd';

class Home extends Component{

	render(){
		const dataSource = [{
		  key: '1',
		  username: 'admin',
		  isAdmin: 32,
		}, {
		  key: '2',
		  username: 'test1',
		  isAdmin: 42,
		}];

		const columns = [{
		  title: '用户名',
		  dataIndex: 'username',
		  key: 'username',
		}, {
		  title: 'isAdmin',
		  dataIndex: 'isAdmin',
		  key: 'isAdmin',
		}];
		return(
			<div>
				<Layout>
				<Table
				 
				dataSource={dataSource}
				columns={columns} 
				/>
				</Layout>
			</div>
		)
	}

}


export default Home;