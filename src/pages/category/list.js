
import React,{ Component } from 'react';
import { Route,Switch,Link } from "react-router-dom";
import { Breadcrumb,Button,Table,Divider,Tag,InputNumber,Modal  } from "antd";
import { connect } from 'react-redux';
import { actionCreator } from './store';
import MyLayout from 'common/layout';

class CategoryList extends Component{
	constructor(props){
		super(props);
		this.state={
			pid:this.props.match.params.pid || 0
		}
	}
	componentDidMount(){
		this.props.getPageData(this.state.pid,1)
	}                                               
	componentDidUpdate(preProps,preState){
		let oldpath = preProps.location.pathname;
		let newpath = this.props.location.pathname;
		if(oldpath != newpath){
			let newPid = this.props.match.params.pid || 0;
			this.setState({
				pid:newPid
			},()=>{
				this.props.getPageData(newPid,1)
			})
		}
	}

	render(){
		const pid = this.state.pid;

		const columns = [{
		  title: 'id',
		  dataIndex: 'id',
		  key: 'id',
		}, {
		  title: '分类名称	',
		  dataIndex: 'name',
		  key: 'name',
		}, {
		  title: '排序',
		  dataIndex: 'order',
		  key: 'order',
		  render:(order,record)=>{
		  	return   <InputNumber   defaultValue={order} />

		  }
		}, {
		  title: '操作',
		  key: 'action',
		  render: (text, record) => (
		    <span>
		      <a href=
		      	"javascript:;"
		      	onClick={()=>{
			  		this.props.showUpdateModal(record.id,record.name)
			  	}}
		      >更新名称</a>
		      {
		      	record.pid == 0
		      	? <span> 	
		      		<Divider type="vertical" />
		      		<Link to={"/category/"+record.id}>查看子分类</Link>
		      	  </span>
		      	: null  	
		      }	
		      
		    </span>
		  ),
		}];
		const data = this.props.list.map((category)=>{
			return {
				id:category.get('_id'),
				key:category.get('_id'),
				name:category.get('name'),
				pid:category.get('pid'),
				order:category.get('order'),
			}
		}).toJS();
		return(
			<MyLayout>
				<div>
					<Breadcrumb>
						<Breadcrumb.Item>分类管理</Breadcrumb.Item>
						<Breadcrumb.Item>分类列表</Breadcrumb.Item>
					</Breadcrumb>
					<div style={{ marginTop:20 }} className="clearfix">
						<h4 style={{float:"left"}}>父类列表id:{ pid }</h4>
						<Link to='/category/add'>
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
							this.props.getPageData(pid,pagination.current)
						}}
				loading = {
					{
						spinning:this.props.isPageFetching,
						tip:'正在请求数据'
					}
				}
				/>
				<Modal
					title="修改分类名称"
					visible={this.props.updateModalVisible}
					onOk={this.props.handleUpdateName}
					onCancel={this.props.handleCancelName}
				>
					<p>{}</p>
				</Modal>
				</div>
			</MyLayout>
		)
	}

}
const mapStateToProps=(state)=>{
	return {
		isPageFetching:state.get('category').get('isPageFetching'),
		current:state.get('category').get('current'),
		total:state.get('category').get('total'),
		pageSize:state.get('category').get('pageSize'),
		list:state.get('category').get('list'),
		updateModalVisible:state.get('category').get('updateModalVisible')

	}	
}
const mapDispatchToProps=(dispatch)=>{
	return {
		getPageData:(pid,page)=>{
			dispatch(actionCreator.getPageCategoryAction(pid,page))
		},
		showUpdateModal:(updateId,updateName)=>{
			dispatch(actionCreator.getShowUpdateModalAction(updateId,updateName));
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(CategoryList)