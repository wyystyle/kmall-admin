import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { Input,Button,Row,Col,List } from 'antd';
import { actionCreator } from './store';
 
class ToDoList extends Component{
	componentDidMount(){
		this.props.getInitData()	
	}

	render(){
		//return 只能返回一个
		return(
			<div>
			    <Row>
			      <Col span={10} ><Input 
			      	value ={this.props.value}
			      	onChange={this.props.handelChange}
			       	/> 
			      </Col>
			      <Col span={14} >
			      <Button 
			      type="primary"
			      onClick={this.props.handelAdd}
			      >
			      增加
			      </Button>
			      </Col>
			    </Row>
			    <List
			      style={{ marginTop: 10 }}
			      bordered
			      dataSource={this.props.list}
			      renderItem={(item,index) => (<List.Item onClick={()=>{this.props.handelDelete(index)}} >{item}</List.Item>)}
			    />			    			
			</div>		
		)
	}

}
const mapStateToProps=(state)=>{
	return {
		value :state.get('todolist').get('value'),
		list:state.get('todolist').get('list')
	}	
}
const mapDispatchToProps=(dispatch)=>{
	return {
		handelChange:(e)=>{
			const action = actionCreator.changeValueAction(e.target.value);
			dispatch(action)
		},
		handelAdd:()=>{
			const action = actionCreator.addItemAction();
			dispatch(action)
		},
		handelDelete:(index)=>{
			const action = actionCreator.deleteItemAction(index);
			dispatch(action)
		},
		getInitData:()=>{
			const action = actionCreator.getServerData();
			dispatch(action)
		}
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(ToDoList);