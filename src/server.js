const http = require('http');
const server = http.createServer((req,res)=>{
	res.setHeader("Access-Control-Allow-Origin","*")
	let data = ['aaa','bbbb','ccc'];
	res.end(JSON.stringify(data))
})
server.listen('3000','127.0.0.1',()=>{
	console.log('server is running 127.0.1:3000')
})