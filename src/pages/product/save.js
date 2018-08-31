
import React,{ Component } from 'react';
import { Breadcrumb,Form, Input,Select,Button,InputNumber  } from "antd";
import MyLayout from 'common/layout';
import { connect } from 'react-redux';
import { actionCreator } from './store';
import { uploadProductImageUrl,uploadDetalimageUrl } from 'api';
import  CategorySlector  from './category-selector.js';
import  UploadImage  from 'common/upload_images';
import MySimditor from 'common/rich-simditor';


const FormItem = Form.Item;
const Option = Select.Option;
class Product_Save extends Component{
	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
/*	componentDidMount(){
		this.props.getLevelOneCategory()
	}*/
	handleSubmit (e){
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			this.props.getSaveRequire(err,values)
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
				          required={true}
				          validateStatus={this.props.validateStatusValue}
				          help={this.props.validateStatusHelpValue}
				        >
				          <CategorySlector 
				          	getCategoryId={(parentCategoryId,categoryId)=>{
				          		this.props.getCategory(parentCategoryId,categoryId)
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
				        	<UploadImage 
				        		action={uploadProductImageUrl}
				        		max={3}
				        		getFileList={(fileList)=>{
				        			this.props.getImage(fileList)
				        		}}
				        	/>
				        	
				        </FormItem>
				        <FormItem
				        {...formItemLayout}
				          label="商品详情"
				        >
				        <MySimditor 
				        	url = { uploadDetalimageUrl }
				        	getDetal={
				        		(value)=>{
				        			this.props.getDetalValue(value)
				        		}
				        	}
				        />

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
		isSeveFetching:state.get('product').get('isSaveFetching'),
		validateStatusValue:state.get('product').get('validateStatusValue'),
		validateStatusHelpValue:state.get('product').get('validateStatusHelpValue')
		
		
	}	
}
const mapDispatchToProps=(dispatch)=>{
	return {
		getSaveRequire:(err,values)=>{
			dispatch(actionCreator.getSaveAction(err,values))
		},
		getCategory:(parentCategoryId,categoryId)=>{
			dispatch(actionCreator.getCategoryAction(parentCategoryId,categoryId))
		},
		getImage:(fileList)=>{
			dispatch(actionCreator.getImageAction(fileList))
		},
		getDetalValue:(value)=>{
			dispatch(actionCreator.getDetalValueAction(value))
		}
	}
}
const ProductSave = Form.create()(Product_Save);
export default connect(mapStateToProps,mapDispatchToProps)(ProductSave)