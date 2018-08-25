import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, message } from 'antd';
import axios from 'axios';
import './index.css';
import { actionCreator } from './store';


const FormItem = Form.Item;
class NormalLoginForm extends Component {
	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
			isFetching:false
		}
	}
	handleSubmit (e){
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.props.getLoginRequire(values)	
			}
		});
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<div className="login">
				<Form onSubmit={this.handleSubmit} className="login-form">
					<FormItem>
						{getFieldDecorator('username', {
							rules: [{ required: true, message: '请输入用户名！' },{pattern:/^[a-z|\d]{3,6}$/,message:'请输入3-6个字符'}],
						})(
							<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}  placeholder="用户名" />
						)}
					</FormItem>
					<FormItem>
						{getFieldDecorator('password', {
							rules: [{ required: true, message: '请输入密码！' },{pattern:/^[a-z|\d]{3,6}$/,message:'请输入3-6个字符'}],
						})(
							<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
						)}
					</FormItem>
					<FormItem>
						<Button 
							type="primary" 
							onClick={this.handleSubmit} 
							className="login-form-button"
							loading={this.props.isFetching}
						>
							登录
						</Button>
					</FormItem>
				</Form>
			</div>
		);
	}
}
const Login = Form.create()(NormalLoginForm);
const mapStateToProps=(state)=>{
	return {
		isFetching:state.get('login').get('isFetching')
	}	
}
const mapDispatchToProps=(dispatch)=>{
	return {
		getLoginRequire:(values)=>{
			const action = actionCreator.getLoginAction(values);
			dispatch(action)
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);