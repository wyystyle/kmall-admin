
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');

const publicPath = '/';
module.exports = {
	mode:'development',
  // mode:'production',
	entry:{
			index:'./src/index.js'
		},
	output:{
		filename:'bundle.js',
    publicPath:publicPath,
		path:path.resolve(__dirname,'dist')
	},
  //配置别名
  resolve:{
    alias:{
      pages:path.resolve(__dirname,'./src/pages'),
      util:path.resolve(__dirname,'./src/util'),
      api:path.resolve(__dirname,'./src/api')
    }
  },
	module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
            }
          },
          "css-loader"
        ]
      },
      {
        test:/\.(png|jpg|gif)$/,
        use:[
          'url-loader'
        ]
      },
      {
        test:/\.js$/,
        exclude: /(node_modules)/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['env','es2015','react','stage-3'],
                plugins: [
                            ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]
                         ]
            }
        }               
      }, 

    ]
  },
 
  plugins:[
  	new CleanWebpackPlugin(['dist']),
    new MiniCssExtractPlugin({
      filename: "main.css",
      chunkFilename: "index.css"
    }),
    new HtmlWebpackPlugin({
    	template:'./src/index.html',
      filename:'index.html',
      inject:true,
    	hash:true
    })
  ],
  devServer:{
  	contentBase:'./dist',
    historyApiFallback:true
  } 
};