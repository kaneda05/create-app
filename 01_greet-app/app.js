// 必要なライブラリを読み込む
const http = require('http'); // HTTPサーバー機能
const fs = require('fs');     // ファイル読み書き機能
const querystring = require('querystring'); // URLクエリ文字列やPOSTデータを扱う機能

// サーバーを作成する
const server = http.createServer((req, res) => {
    
    // GETリクエストでルートURL ('/') にアクセスされた場合
    if (req.url === '/' && req.method === 'GET') {
        fs.readFile('index.html', 'utf-8', (err, data) => {
            if (err) {
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('Server Error');
                return;
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        });
    } 

    // ★★★★★ ここからが追加された部分 ★★★★★
    // '/style.css' へのリクエストがあった場合
    else if (req.url === '/style.css') {
        fs.readFile('style.css', 'utf-8', (err, data) => {
            if (err) {
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('Server Error');
                return;
            }
            // ブラウザに「これはCSSファイルですよ」と伝えるためにContent-Typeを'text/css'に設定
            res.writeHead(200, {'Content-Type': 'text/css'});
            res.end(data);
        });
    }
    // ★★★★★ ここまでが追加された部分 ★★★★★

    // POSTリクエストで '/greet' にアクセスされた場合
    else if (req.url === '/greet' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const formData = querystring.parse(body);
            const userName = formData.username || '名無し';
            
            const responseHtml = `
            <html>
                <head><title>応答ページ</title></head>
                <body>
                    <h1>こんにちは、${userName}さん！</h1>
                    <a href="/">戻る</a>
                </body>
            </html>
            `;
            
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end(responseHtml);
        });
    } 
    
    else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Not Found');
    }
});

// 8000番ポートでサーバーを起動する
const port = 8000;
server.listen(port, () => {
    console.log(`サーバーをポート ${port} で起動します...`);
    console.log(`ブラウザで http://localhost:${port} を開いてください`);
});