var net = require('net'); 

var HOST = '127.0.0.1'; 
var PORT = 8888; 

var source = new EventSource("/pageTell"); //(服務器公開的API) 

source.onmessage = function(event) { 
    document.getElementById("result").innerHTML += event.data + "<br>"; 
}; 

net.createServer(function (sock) { 
console.log('connected : ' + sock.remoteAddress + ':'+sock.remotePort); 
var ip = sock.remoteAddress.split(':')[3]; 
console.log(ip); 
sock.write('客戶端您連接到服務器10.0.0.19 ...'); 

sock.on('data', function (data) { 
    console.log('DATA '+ sock.remoteAddress+' - '+data); 
    sock.write('you said : '+data); 
}); 

function sendto(result) { //tried call from html file 
    console.log('sent '+result); 
    sock.write('data : '+result); 
} 

sock.on('close', function (data) { 
    console.log('closed'); 
}); 

}).listen(PORT); 

console.log('server running on '+PORT); 