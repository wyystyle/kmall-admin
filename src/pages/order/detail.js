
import React,{ Component } from 'react';
import { Breadcrumb,Form, Input,Select,Button,InputNumber  } from "antd";
import MyLayout from 'common/layout';
import { connect } from 'react-redux';
import { actionCreator } from './store';
import  UploadImage  from 'common/upload_images';
import moment from 'moment';
import './index.css';

const FormItem = Form.Item;
const Option = Select.Option;
class Order_Detail extends Component{
	constructor(props){
		super(props);
		this.state={
			orderNo:this.props.match.params.orderNo
		}
	}
	componentDidMount(){

		this.props.handleEditOrder(this.state.orderNo)
	}  	
	render(){
		const {
			orderNo,
			createdAt,
			statusDesc,
			payment,
			productList,
			shipping,
			status,
			paymentTypeDesc
		} = this.props.orderDetail;
		let createdTime = '';
		if(createdAt){
			createdTime = moment(createdAt).format('YYYY-MM-DD HH:mm:ss')
		}
		return(
			<MyLayout>
				<div>
					<Breadcrumb>
						<Breadcrumb.Item>商品管理</Breadcrumb.Item>
						<Breadcrumb.Item>
							订单详情
						</Breadcrumb.Item>
					</Breadcrumb>
					{
						orderNo
						? <div className="order-detail">
						<h2 className="panel-header">订单详情</h2>
							<ul className="order-title">
								<li className="order-no">
									<span className="lable">订单号:</span>
									<span className="text">{orderNo}</span>
								</li>
								<li className="order-creat-time">
									<span className="lable">创建时间:</span>
									<span className="text">{createdTime}</span>
								</li>
								<li className="order-status">
									<span className="lable">订单状态:</span>
									<span className="text">{statusDesc}</span>
								</li>
								<li className="order-man">
									<span className="lable">收件人:</span>
									<span className="text">{shipping.name}</span>
								</li>
								<li className="order-address">
									<span className="lable">收件人地址:</span>
									<span className="text">{shipping.province} {shipping.city}</span>
								</li>
								<li className="order-phone">
									<span className="lable">收件人手机:</span>
									<span className="text">{shipping.phone}</span>
								</li>
								<li className="order-zip">
									<span className="lable">收件人邮编:</span>
									<span className="text">{shipping.zip}</span>
								</li>
								<li className="order-payment">
									<span className="lable">总计:</span>
									<span className="text">{payment}</span>
								</li>
								<li className="order-opreation">
									{
										status == "30"
										? <Popconfirm 
										placement="top" 
										title={"确定已发货"} 
										onConfirm={()=>{
											
										}} 
										okText="确定" 
										cancelText="取消"
										>
										<Button>发货</Button>
										</Popconfirm>
										: null
									}
								</li>
							</ul>


						<ul className="product-title clearfix">

							<li className="product-info">
								商品
							</li>
							<li className="product-price">
								单价
							</li>
							<li className="product-count">
								数量
							</li>
							<li className="product-totalPrice">
								小计
							</li>
						</ul>	
						{
							productList.map((product,index)=>{
								return <ul className="product-item" key="index">
											<li className="product-info">
													<img src={product.images.split(',')[0]} alt="" />
													<span>{product.name}</span>
											</li>
											<li className="product-price">
												￥{product.price}
											</li>
											<li className="product-count">
												数量：
												<span>{product.count}</span>
											</li>
											<li className="product-totalPrice">
												￥{product.totalPrice}
											</li>	
										</ul>

							})
						}		
					</div>
						: null
					}
					
				</div>
			</MyLayout>
		)
	}

}
const mapStateToProps=(state)=>{
	return {
		orderDetail:state.get('order').get('orderDetail'),
		
	}	
}
const mapDispatchToProps=(dispatch)=>{
	return {
		handleEditOrder:(orderNo)=>{
			console.log(orderNo)
			dispatch(actionCreator.getOrderCategoryAction(orderNo))
		}
	}
}
const OrderDetail = Form.create()(Order_Detail);
export default connect(mapStateToProps,mapDispatchToProps)(OrderDetail)