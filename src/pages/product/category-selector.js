import React,{ Component } from 'react';
import { Request } from 'util';
import { Select } from 'antd';
import { getLevelOneUrl } from 'api';

const Option = Select.Option;
class CategorySlector extends Component{
	constructor(props){
		super(props);
		this.state = {
			levelOneCategories:[],
			levelOneCategoryId:'',
			levelTwoCategories:[],
			levelTwoCategoryId:'',
			needTwoLevel:false,
			isChanged:false
		}
		this.handleLevelOneChange=this.handleLevelOneChange.bind(this)
		this.handleLevelTwoChange=this.handleLevelTwoChange.bind(this)
	}
	componentDidMount(){
		this.loadLevelOneCategory()
	}
	static getDerivedStateFromProps(props, state){
		const leLevelOneChange = props.parentCategoryId != state.levelOneCategoryId;
		const leLevelTwoChange = props.categoryId != state.levelTwoCategoryId;
		if(state.levelOneCategoryId && !props.parentCategoryId && !props.categoryId){
			return null
		}

		if(!leLevelOneChange && !leLevelTwoChange){
			return null
		}
		if(state.isChanged){
			return null
		}
		if(props.parentCategoryId  == 0){
			return {
				levelOneCategoryId:props.categoryId,
				levelTwoCategoryId:'',
				isChanged:true
			}
		}else{
				return {
					levelOneCategoryId:props.parentCategoryId,
					levelTwoCategoryId:props.categoryId,
					needTwoLevel:true,
					isChanged:true
				}
		}


		return null
	}
	componentDidUpdate(){
		if(this.state.needTwoLevel){
			this.loadLevelTwoCategory();
			this.setState({
				needTwoLevel:false
			})
		}
	}
	loadLevelOneCategory(){
		Request({
			method:'get',
			url:getLevelOneUrl,
			data:{
				pid:0
			}
		})
		.then((result)=>{
			if(result.code == 0){
				this.setState({
					levelOneCategories:result.data
				})
			}
		})
	}
	handleLevelOneChange(value){
		this.setState({
			levelOneCategoryId:value,
			levelTwoCategories:[],
			levelTwoCategoryId:''
		},()=>{
			this.loadLevelTwoCategory();
			this.onValueChange()
		})
	}
	handleLevelTwoChange(value){
		this.setState({
			levelTwoCategoryId:value
		},()=>{
			this.onValueChange()
		})
	}
	loadLevelTwoCategory(){
		Request({
			method:'get',
			url:getLevelOneUrl,
			data:{
				pid:this.state.levelOneCategoryId
			}
		})
		.then((result)=>{
			if(result.code == 0){
				this.setState({
					levelTwoCategories:result.data
				})
			}
		})
	}
	onValueChange(){
		const {levelOneCategoryId,levelTwoCategoryId} = this.state;
		
		//如果选择了二级分类
		if(levelTwoCategoryId){
			this.props.getCategoryId(levelOneCategoryId,levelTwoCategoryId)
		}else{
			this.props.getCategoryId(0,levelOneCategoryId)
		}
		
	}
	render(){
		const {levelOneCategories,levelOneCategoryId,levelTwoCategories,levelTwoCategoryId} = this.state;
		const levelOneOpations = levelOneCategories.map(category=><Option key={category._id} value={category._id}>{category.name}</Option>)
		const levelTwoOpations = levelTwoCategories.map(category=><Option key={category._id} value={category._id}>{category.name}</Option>)
		return(
			<div>
		        <Select  
		        	defaultValue={levelOneCategoryId}
					value={levelOneCategoryId}
		        	style={{ width: 300,marginRight:30 }} 
		        	onChange={this.handleLevelOneChange}
		        	disabled={this.props.disabled}
		        	>
		          	{levelOneOpations}
		        </Select>
		        {
		        levelTwoOpations.length
		        ? <Select 
		        	defaultValue={levelTwoCategoryId}
					value={levelTwoCategoryId}
		        	style={{ width: 300 }} 
		        	onChange={this.handleLevelTwoChange}
		        	disabled={this.props.disabled}
		        	>
		          {levelTwoOpations}
		          </Select>
		        : null  
		        }
		    </div>
		)
	}

}
export default CategorySlector