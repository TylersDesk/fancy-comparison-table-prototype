var connect = require('connect'),
	port 	= 8080;	
connect().use(connect.static(__dirname)).listen(port);
console.log('Running Tyler\'s WebServer');
console.log('Listening at local.dev:', port);