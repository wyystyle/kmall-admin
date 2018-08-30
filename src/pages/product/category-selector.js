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
			levelTwoCategoryId:''
		}
		this.handleLevelOneChange=this.handleLevelOneChange.bind(this)
		this.handleLevelTwoChange=this.handleLevelTwoChange.bind(this)
	}
	componentDidMount(){

		this.loadLevelOneCategory()
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
		        	style={{ width: 300,marginRight:30 }} 
		        	onChange={this.handleLevelOneChange}>
		          	{levelOneOpations}
		        </Select>
		        <Select 
		        	defaultValue={levelTwoCategoryId}
					value={levelTwoCategoryId}
		        	style={{ width: 300 }} 
		        	onChange={this.handleLevelTwoChange}
		        	>
		          {levelTwoOpations}
		        </Select>
		    </div>
		)
	}

}
export default CategorySlector