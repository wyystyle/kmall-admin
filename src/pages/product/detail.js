
import React,{ Component } from 'react';
import { Breadcrumb,Form, Input,Select,Button,InputNumber  } from "antd";
import MyLayout from 'common/layout';
import { connect } from 'react-redux';
import { actionCreator } from './store';
import { uploadProductImageUrl,uploadDetalimageUrl } from 'api';
import  CategorySlector  from './category-selector.js';
import  UploadImage  from 'common/upload_images';
import MySimditor from 'common/rich-simditor';
import './detail.css';

const FormItem = Form.Item;
const Option = Select.Option;
class Product_Detail extends Component{
	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state={
			productId:this.props.match.params.productId
		}
	}
	componentDidMount(){

		this.props.handleEditProduct(this.state.productId)
	}  
	handleSubmit (e){
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			values.id = this.state.productId;
			this.props.getSaveRequire(err,values)
		});
	}	
	render(){
		const {
			images,
			details,
			parentCategoryId,
			categoryId,
			editName,
			editSketch,
			editPrice,
			editShopnum
		} = this.props;
		const { getFieldDecorator } = this.props.form;
		let uplodeImg = '';
		if(images){
			uplodeImg = images.split(',').map((img,index)=>(
			   	<li key={index}>
			   		<img src={img} />
			   	</li>
			))
		}

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
						<Breadcrumb.Item>商品管理</Breadcrumb.Item>
						<Breadcrumb.Item>
							商品详情
						</Breadcrumb.Item>
					</Breadcrumb>
					<Form style={{marginTop:30}}>
				        <FormItem
				          {...formItemLayout}
				          label="商品分类"
				        >
				            <Input 
				            	defaultValue={editName}
				            	disabled={true}
				            />
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="商品描述"
				        >
				            <Input 
				            	defaultValue={editSketch}
				            	disabled={true}
				            />
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="选择分类"
				          required={true}
				          validateStatus={this.props.validateStatusValue}
				          help={this.props.validateStatusHelpValue}
				        >
				          <CategorySlector
				            parentCategoryId={parentCategoryId}
						    categoryId={categoryId} 
				          	getCategoryId={(parentCategoryId,categoryId)=>{
				          		this.props.getCategory(parentCategoryId,categoryId)
				          	}}
				          />
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="商品价格"
				        >
		               <InputNumber
		               	  value={editPrice}
				          disabled={true}
				          key={editPrice}
					      formatter={value => `${value}元`}
					      style={{ width: 300 }}
					    />
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="商品库存"
				        >
		               <InputNumber
		              	  value={editShopnum}
				          disabled={true}
					      formatter={value => `${value}件`}
					      key={editShopnum}
					      style={{ width: 300 }}
					    />				        
					    </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="商品图片"
				        >
				        	<ul className="lodeImg">
				        		{uplodeImg}
				        	</ul>
				        	
				        </FormItem>
				        <FormItem
				        {...formItemLayout}
				          label="商品详情"
				        >
				        <div dangerouslySetInnerHTML={{__html:details}}></div>

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
		validateStatusHelpValue:state.get('product').get('validateStatusHelpValue'),
		images:state.get('product').get('images'),
		details:state.get('product').get('details'),
		parentCategoryId:state.get('product').get('parentCategoryId'),
		categoryId:state.get('product').get('categoryId'),
		editName:state.get('product').get('editName'),
		editSketch:state.get('product').get('editSketch'),
		editPrice:state.get('product').get('editPrice'),
		editShopnum:state.get('product').get('editShopnum')
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
		},
		handleEditProduct:(productId)=>{
			dispatch(actionCreator.getEditProduct(productId))
		}
	}
}
const ProductDetail = Form.create()(Product_Detail);
export default connect(mapStateToProps,mapDispatchToProps)(ProductDetail)