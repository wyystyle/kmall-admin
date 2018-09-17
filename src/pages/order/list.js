import React,{ Component } from 'react';
import { Route,Link } from "react-router-dom";
import { Breadcrumb,Button,Table,Divider,Tag,InputNumber,Modal,Input } from "antd";
import { connect } from 'react-redux';
import { actionCreator } from './store';
import MyLayout from 'common/layout';

class OrderList extends Component{
	constructor(props){
		super(props);
	}
	componentDidMount(){
			this.props.getPageData(1)
	}                                           
	render(){	
		const Search = Input.Search;
		const { keyword } =this.props; 
		const data = this.props.list.map((order)=>{
			return {
				key:order.get('orderNo'),
				orderNo:order.get('orderNo'),
				name:order.get('shipping').get('name'),
				payment:order.get('payment'),
				statusDesc:order.get('statusDesc'),
				createdAt:order.get('createdAt'),
				keyword:order.get('keyword')
			}
		}).toJS();
		const columns = [{
		  title: '订单号',
		  dataIndex: 'orderNo',
		  key: 'orderNo',
		  render:(orderNo,record)=>{
		  	if(keyword){
		  		let reg = new RegExp('('+keyword+')','ig');
		  		let html = orderNo.replace(reg,"<b style='color:red';>$1</b>");
		  		return <span dangerouslySetInnerHTML={{__html:html}}></span>
		  	}else{
		  		return orderNo
		  	}
		  }
		}, {
		  title: '收件人	',
		  dataIndex: 'name',
		  key: 'name',

		},
		{
		  title: '订单状态',
		  dataIndex: 'statusDesc',
		  key: 'statusDesc',
		},
		{
		  title: '订单金额',
		  dataIndex: 'payment',
		  key: 'payment',
		}, 
		{
		  title: '创建时间',
		  dataIndex: 'createdAt',
		  key: 'createdAt',
		}, {
		  title: '操作',
		  key: 'action',
		  render: (text, record) => (
				<span> 	
		      		<Divider type="vertical" />
		      		<Link to={"/order/detail/"+record.orderNo}>查看</Link>
		      	 </span>
		  ),
		}];
		return(
			<MyLayout>
				<div>
					<Breadcrumb>
						<Breadcrumb.Item>分类管理</Breadcrumb.Item>
						<Breadcrumb.Item>订单列表</Breadcrumb.Item>
					</Breadcrumb>
					<Search
				      placeholder="请输入订单号查询"
				      enterButton="查询"
				      style={{ width: 300,marginTop:20 }}
				      onSearch={value =>{
				      	this.props.getSearchData(value)
				      }}
				    />
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
					if(keyword){
						this.props.getSearchData(keyword,pagination.current)
					}else{
						this.props.getPageData(pagination.current)
					}
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
		isPageFetching:state.get('order').get('isPageFetching'),
		current:state.get('order').get('current'),
		total:state.get('order').get('total'),
		pageSize:state.get('order').get('pageSize'),
		list:state.get('order').get('list'),
		keyword:state.get('order').get('keyword')
	}	
}
const mapDispatchToProps=(dispatch)=>{
	return {
		getPageData:(page)=>{
			dispatch(actionCreator.getPageOrderAction(page))
		},
		getSearchData:(keyword,page)=>{
			dispatch(actionCreator.getSearchOrderAction(keyword,page))
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(OrderList)