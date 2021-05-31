const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const moment = require('moment');
const url = require('url');

const index = fs.readFileSync('./index.ejs','utf8');
const sample = fs.readFileSync('./sample.ejs','utf8');
const style_css = fs.readFileSync('./style.css','utf8');


let server = http.createServer(getFromCliant);
server.listen(3000);
console.log('Server start!')

function getFromCliant(req,res){

    let url_parts = url.parse(req.url, true);

    switch(url_parts.pathname){

        case '/':

            var query = url_parts.query;
            console.log(url_parts.query);
            if (query.msg != undefined){
                var message = 'You said to me, "' + query.msg + '."';
            } else {
                var message = 'You said nothing';
            }

            var content = ejs.render(index,{
                title: 'Kikuchannel',
                message: message,
            }); 

            res.writeHead(200, {'Content-Type':'text/html'});
            res.write(content);
            res.end();
            break;

        case '/sample':
            var content = ejs.render(sample,{
                title: 'introduction',
                today:datetoday,
            }); 
            res.writeHead(200, {'Content-Type':'text/html'});
            res.write(content);
            res.end();
            break;

        case '/style.css':
            res.writeHead(200, {'Content-Type':'text/css'});
            res.write(style_css);
            res.end();
            break;

        default:
            res.writeHead(404, {'Content-Type':'text/plain'});
            res.end('no page...');
            break;

    }
}
