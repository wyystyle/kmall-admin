
import React,{ Component } from 'react';
import { Breadcrumb,Form, Input,Select,Button } from "antd";
import MyLayout from 'common/layout';
import { connect } from 'react-redux';
import { actionCreator } from './store';

const FormItem = Form.Item;
const Option = Select.Option;
class Category_Add extends Component{
	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	componentDidMount(){
		this.props.getLevelOneCategory()
	}
	handleSubmit (e){
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.props.getAddRequire(values)	
			}
		});
	}	
	render(){
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {
	      labelCol: {
	        xs: { span: 24 },
	        sm: { span: 8 },
	      },
	      wrapperCol: {
	        xs: { span: 24 },
	        sm: { span: 16 },
	      },
	    };
	    const tailFormItemLayout = {
	      wrapperCol: {
	        xs: {
	          span: 24,
	          offset: 0,
	        },
	        sm: {
	          span: 16,
	          offset: 8,
	        },
	      },
	    };
		return(
			<MyLayout>
				<div>
					<Breadcrumb>
						<Breadcrumb.Item>分类管理</Breadcrumb.Item>
						<Breadcrumb.Item>添加分类</Breadcrumb.Item>
					</Breadcrumb>
					<Form>
				        <FormItem
				          {...formItemLayout}
				          label="分类名称"
				        >
				          {getFieldDecorator('name', {
				            rules: [{
				              required: true, message: '请输入分类名称',
				            }],
				          })(
				            <Input />
				          )}
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="分类名称"
				        >
				          {getFieldDecorator('pid', {
				            rules: [{
				              required: true, message: '请选择父级分类',
				            }],
				          })(
					    <Select initialValue="lucy" style={{ width: 300 }}>
					      <Option value="0">根分类</Option>
					      {
					      	this.props.OneLevelCategories.map((categories)=>{
					      		return <Option key={ categories.get('_id') } value={ categories.get('_id') }>根分类/{ categories.get('name') }</Option>
					      	})

					      }
					    </Select>
				          )}
				        </FormItem>

				        <FormItem {...tailFormItemLayout}>
				          <Button 
					          type="primary"
					          onClick={ this.handleSubmit }
					          loading={this.props.isAddFetching}
					          >
					          提交
				          </Button>
				        </FormItem>				        					
					</Form>
				</div>
			</MyLayout>
		)
	}

}
const mapStateToProps=(state)=>{
	return {
		isAddFetching:state.get('category').get('isAddFetching'),
		OneLevelCategories:state.get('category').get('OneLevelCategories')	
	}	
}
const mapDispatchToProps=(dispatch)=>{
	return {
		getAddRequire:(values)=>{
			dispatch(actionCreator.getAddAction(values))
		},
		getLevelOneCategory:()=>{
			dispatch(actionCreator.getLevelOneCategoryAction())
		}
	}
}
const CategoryAdd = Form.create()(Category_Add);
export default connect(mapStateToProps,mapDispatchToProps)(CategoryAdd)