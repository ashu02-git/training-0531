const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const url = require('url');
const qs = require('querystring');

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
            response_index(req, res);
            break;

        case '/sample':
            response_sample(req, res);
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

function response_index(req, res) {
    let message = 'What do you want to tell?';
    let content = ejs.render(index,{
        title: 'Kikuchannel',
        message: message
    });

    res.writeHead(200, {'Content-Type':'text/html'});
    res.write(content);
    res.end();
}

function response_sample(req, res){
    let message = 'ようこそ！';
    if (req.method == 'POST'){
        let body = '';

        req.on('data', (data) => {
            body += data;
        });
        req.on('end', () => {
            let post_data = qs.parse(body);
            msg = 'You said to me "' + post_data.msg +'".';
            let content = ejs.render(sample, {
                title: "Thanks!",
                message: msg
            });
            res.writeHead(200, {'Content-Type':'text/html'});
            res.write(content);
            res.end();
        });
    } else {
        let msg = "ページがありません。"
        let content = ejs.render(sample, {
                title: "Thanks.",
                message: msg
        });
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(content);
        res.end();
    }
}
