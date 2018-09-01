/*import React,{ Component } from 'react';
import { Link } from 'react-router-dom';

import MyLayout from 'common/layout';
class ProductList extends Component{
	render(){
		return(
			<MyLayout>
				<div>
					<Link to='/product/save'>add</Link>
				</div>
			</MyLayout>
		)
	}
}
export default 	ProductList;*/

import React,{ Component } from 'react';
import { Route,Link } from "react-router-dom";
import { Breadcrumb,Button,Table,Divider,Tag,InputNumber,Modal,Input,Switch  } from "antd";
import { connect } from 'react-redux';
import { actionCreator } from './store';
import MyLayout from 'common/layout';

class ProductList extends Component{
	constructor(props){
		super(props);
		this.state={
			pid:this.props.match.params.productId
		}
	}
	componentDidMount(){
		this.props.getPageData(1)
	}                                              
	render(){
		const pid = this.state.pid;
		const columns = [{
		  title: 'id',
		  dataIndex: 'id',
		  key: 'id',
		}, {
		  title: '商品名称	',
		  dataIndex: 'name',
		  key: 'name',
		},
		{
		  title: '状态',
		  dataIndex: 'states',
		  key: 'states',
		  render:(states,record)=>{
		  	return <span> 
		  	 <Switch 
		  	 checkedChildren="在售" 
		  	 unCheckedChildren="下架	" 
		  	 defaultChecked={record.states == '0' ? true : false}
		  	 onChange ={(checked)=>{this.props.handleChangeStates(record.id,checked ? 0 : 1)}}
		  	  />,
		  	</span> 
		  }
		}, 
		{
		  title: '排序',
		  dataIndex: 'order',
		  key: 'order',
		  render:(order,record)=>{
		  	return   <InputNumber   
		  	defaultValue={order} 
		  	onBlur = {(e)=>{
		  		this.props.handleOrder(record.id,e.target.value)
		  	}}
		  	/>

		  }
		}, {
		  title: '操作',
		  key: 'action',
		  render: (text, record) => (
		    <span>
		      	<span> 	
		      		<Divider type="vertical" />
		      		<Link to={"/product/save/"+record.id}>编辑</Link>
		      	 </span>

				<span> 	
		      		<Divider type="vertical" />
		      		<Link to={"/product/save/"+record.id}>查看</Link>
		      	 </span>
		      
		    </span>
		  ),
		}];
		const data = this.props.list.map((product)=>{
			return {
				id:product.get('_id'),
				key:product.get('_id'),
				name:product.get('name'),
				pid:product.get('pid'),
				order:product.get('order'),
				states:product.get('states')
			}
		}).toJS();
		console.log('aaaa',data)
		return(
			<MyLayout>
				<div>
					<Breadcrumb>
						<Breadcrumb.Item>分类管理</Breadcrumb.Item>
						<Breadcrumb.Item>分类列表</Breadcrumb.Item>
					</Breadcrumb>
					<div style={{ marginTop:20 }} className="clearfix">
						<h4 style={{float:"left"}}>商品列表</h4>
						<Link to='/product/save'>
							 <Button type="primary" style={{float:"right"}}>新增分类</Button>
						</Link>
					</div>
				<Table				 
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
						spinning:this.props.isPageFetching,
						tip:'正在请求数据'
					}
				}
				/>
				</div>
			</MyLayout>
		)
	}

}
const mapStateToProps=(state)=>{
	return {
		isPageFetching:state.get('product').get('isPageFetching'),
		current:state.get('product').get('current'),
		total:state.get('product').get('total'),
		pageSize:state.get('product').get('pageSize'),
		list:state.get('product').get('list')
	}	
}
const mapDispatchToProps=(dispatch)=>{
	return {
		getPageData:(page)=>{
			dispatch(actionCreator.getPageProductAction(page))
		},
		handleOrder:(id,newOrder)=>{
			dispatch(actionCreator.getUpdateOrderModalAction(id,newOrder))	
		},
		handleChangeStates:(id,newDefaultChecked)=>{
			dispatch(actionCreator.getUpdateStatesModalAction(id,newDefaultChecked))
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductList)