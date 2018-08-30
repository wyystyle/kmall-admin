
import React,{ Component } from 'react';
import { Breadcrumb,Form, Input,Select,Button,InputNumber  } from "antd";
import MyLayout from 'common/layout';
import { connect } from 'react-redux';
import { actionCreator } from './store';
import  CategorySlector  from './category-selector.js';
import  UploadPicture  from 'common/add_img';


const FormItem = Form.Item;
const Option = Select.Option;
class Product_Save extends Component{
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
	        sm: { span: 2 },
	      },
	      wrapperCol: {
	        xs: { span: 24 },
	        sm: { span: 22 },
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
	          offset: 2,
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
					<Form style={{marginTop:30}}>
				        <FormItem
				          {...formItemLayout}
				          label="商品分类"
				        >
				          {getFieldDecorator('name', {
				            rules: [{
				              required: true, message: '请输入分类名称',
				            }],
				          })(
				            <Input 
				            	placeholder="商品分类"
				            />
				          )}
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="商品描述"
				        >
				          {getFieldDecorator('Sketch', {
				            rules: [{
				              required: true, message: '请输入商品描述信息',
				            }],
				          })(
				            <Input 
				            	
				            />
				          )}
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="选择分类"
				        >
				          <CategorySlector 
				          	getCategoryId={(pid,id)=>{
				          		console.log(pid,id)
				          	}}
				          />
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="商品价格"
				        >
				          {getFieldDecorator('price', {
				            rules: [{
				              required: true, message: '请输入商品价格',
				            }],
				          })(
		               <InputNumber
					      min={0}
					      max={100}
					      formatter={value => `${value}元`}
					      parser={value => value.replace('元', '')}
					      style={{ width: 300 }}
					    />
				          )}
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="商品库存"
				        >
				          {getFieldDecorator('shopnum', {
				            rules: [{
				              required: true, message: '请输入商品库存数量',
				            }],
				          })(
		               <InputNumber
					      min={0}
					      max={100}
					      formatter={value => `${value}件`}
					      parser={value => value.replace('件', '')}
					      style={{ width: 300 }}
					    />
				          )}
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="商品图片"
				        >
				        	<UploadPicture />
				        	
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="商品详情"
				        >

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
const ProductSave = Form.create()(Product_Save);
export default connect(mapStateToProps,mapDispatchToProps)(ProductSave)