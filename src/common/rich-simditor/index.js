import React,{ Component } from 'react';
import Simditor from 'simditor';
import $ from '../../../node_modules/jquery/dist/jquery.js';
import './index.css';

import 'simditor/styles/simditor.css';
class MySimditor extends Component{
	constructor(props){
		super(props);
		this.toolbar=
		[
		  'title',
		  'bold',
		  'italic',
		  'underline',
		  'strikethrough',
		  'fontScale',
		  'color',
		  'ol',
		  'ul',
		  'blockquote',
		  'code',
		  'table',
		  'link',
		  'image',
		  'hr',
		  'indent',
		  'outdent',
		  'alignment'
		]
		//jQuery跨域携带cookies
		$.ajaxSetup({
			xhrFields:{
				withCredentials:true
			}
		})
		
	}
	componentDidMount(){
		this.editor = new Simditor({
  			textarea: $(this.textarea),
  			toolbar:this.toolbar,
  			upload:{
  				url: this.props.url,
  				fileKey: 'upload'
  			}
		});
		this.editor.on('valuechanged',()=>{
			this.props.getDetal(this.editor.getValue())
		})

	}

	render(){
		return(
				<div>
					<textarea ref={(textarea)=>{this.textarea=textarea}} ></textarea>
				</div>
		)
	}
}
export default 	MySimditor;