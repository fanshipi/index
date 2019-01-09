var http=require('http');

var fs=require('fs');

var io=require('socket.io');

var httpServer=http.createServer(function(req,res){
	var url=req.url;
	var file=documentRoot+url;
	console.log(file);

	fs.readFile(file,function(err,data){
		if(err){
			res.writeHeader(404,{
				'content-type':'text/html;charset="utf-8" '
			})
			res.write('<h1>404</h1>你要找的页面不存在！');
			res.end();
		}
		else{
			res.writeHeader(200,{
				'content-type':'text/html;charset="utf-8" '
			})
			res.write(data)
			res.end();
		}
	}).listen(8888);
});

var socket=io.listen(httpServer);
socket.socket.on('connection',function(socket){
	socket.emit('hello','welcome');
	socket.broadcast.emit('a','someone is coming');
	socket.on('move',function(data){
		socket.broadcast.emit('move2',data);
	})
})