const http = require('http');
const fs = require('fs');
const ejs = require('ejs');

const index = fs.readFileSync('./index.ejs','utf8')

let server = http.createServer(getFromCliant);
server.listen(3000);
console.log('Server start!')

function getFromCliant(req,res){
    let content = ejs.render(index);
    res.writeHead(200, {'Content-Type':'text/html'});
    res.write(content);
    res.end();
}
