import React,{ Component } from 'react';
import MyLayout from 'common/layout';
import { Card } from 'antd';
import { actionCreator } from './store';
import { connect } from 'react-redux';
import './index.css';
class Home extends Component{
	constructor(props){
		super(props);
		this.state = {
			usernum:100,
			ordernum:101,
			productnum:102
		}
	}

	componentDidMount(){
		this.props.getCountData();
	}
	render(){
		return(
			<div className='home'>
				<MyLayout>
				  <Card title="用户数量" style={{ width: 300 }}>
				    <p>{this.props.usernum}</p>
				  </Card>
				   <Card title="上架数量" style={{ width: 300 }}>
				    <p>{this.props.ordernum}</p>
				  </Card>
				   <Card title="商品数量" style={{ width: 300 }}>
				    <p>{this.props.productnum}</p>
				  </Card>
				 </MyLayout>
			</div>
		)
	}

}
const mapStateToProps=(state)=>{
	return {
		usernum:state.get('home').get('usernum'),
		ordernum:state.get('home').get('ordernum'),
		productnum:state.get('home').get('productnum')
	}	
}
const mapDispatchToProps=(dispatch)=>{
	return {
		getCountData:()=>{
			const action = actionCreator.getCountAction();
			dispatch(action)
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);