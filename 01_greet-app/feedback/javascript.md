## JavaScriptコード

### 1:前準備
Node.jsに標準で備わっている便利なモジュールを宣言
- `require("...")`は、Node.jsに「`...`」という名前の機能を使いたいので準備しるという命令文
- `const`とは
JavaScriptのconstは、ES2015(ES6)で導入された変数宣言で、再代入できない「定数」を作成。宣言時に必ず初期化が必要で、オブジェクトや配列の「参照」自体は固定されるが、
中身（プロパティや要素）は変更可能。意図しない値の書き換えを防ぎ、コードの安全性と信頼性を高めるため、再代入が不要な変数はconstで宣言することが推奨されている。


[参考：【JavaScriptの基本】letとconstの使い分け](https://tcd-theme.com/2021/04/javascript-difference-let-const.html#:~:text=let%E3%81%A8const%E3%81%A9%E3%81%A1%E3%82%89%E3%82%92,%E3%81%AFlet%E3%82%92%E4%BD%BF%E3%81%84%E3%81%BE%E3%81%99%E3%80%82)


```javascript
// httpという名前で、HTTPサーバーを立てるための機能を読み込む
const http = require('http'); 

// fsという名前で、ファイル（File System）を読み書きする機能を読み込む
const fs = require('fs');     

// querystringという名前で、送信されたフォームデータを扱いやすい形に変換する機能を読み込む
const querystring = require('querystring');
```

---

### 2:サーバー作成：リクエスト処理

Webサイトへのアクセス（リクエスト）があるたびに実行される、メインの処理内容を定義

- `http.createServer(...)` 
 - Node.jsの組み込みモジュールであるhttpモジュールが提供する関数で、HTTPサーバーインスタンスを作成
 - `(req, res)`: **コールバック関数**で、リクエスト（req）とレスポンス（res）という2つの引数を取る
 - `req (Request)`: クライアントから送信されたHTTPリクエストを表します。URL、ヘッダー、ボディなどの情報を含む
 - `res (Response)`: サーバーからクライアントへ返すHTTPレスポンスを表す

[コールバック関数とは](https://qiita.com/nakajima417/items/4d0c2d46ff82351549e6)
１つの関数（親関数）に引数として渡され、親関数の中で特定のタイミングで呼び出される関数。これを利用することで、非同期処理やイベントハンドリングなど、柔軟かつダイナミックなプログラムの構築が可能。

**コールバック関数と再帰関数の違い**
|項目|コールバック関数|再帰関数|
|:--:|:--:|:--:|
|主な役割|処理の終了後に次に実行する関数を「受け取る|繰り返し処理のために「自身を呼び出す」|
|関係性|呼び出す関数と、処理完了後に呼び出される関数の関係|関数が「自身」を呼び出す関係|
|目的|処理の順序付け、非同期処理の制御処理の順序付け、非同期処理の制御|同じ処理の繰り返し、複雑な問題の単純化|


```javascript
// httpの機能を使ってサーバーを作成し、serverという名前の変数に格納する
const server = http.createServer((req, res) => {
    
    // ... アクセスがあるたびに、この波括弧 { } の中の処理が実行される ...
    
});
```

---


### 3:ルーティング：リクエストを仕分ける

`createServer`の中に書かれた、if / else if でアクセスされたURLに応じて、サーバーを切り替える。

`req.url`でアクセスされたURLを、`req.method` で通信方法（`GET`か`POST`か）を確認し、条件に応じて処理を仕分けている。


```javascript
// もし、アクセスされたURLが '/' で、かつ、通信方法が 'GET' ならば
if (req.url === '/' && req.method === 'GET') {
    // index.htmlを渡す処理（後述）

} 
// そうではなく、もし、URLが '/style.css' ならば
else if (req.url === '/style.css') {
    // style.cssを渡す処理（後述）

}
// そうではなく、もし、URLが '/greet' で、かつ、通信方法が 'POST' ならば
else if (req.url === '/greet' && req.method === 'POST') {
    // フォームデータを受け取って挨拶を返す処理（後述）

} 
// 上記のどれにも当てはまらない場合
else {
    // 「ページが見つかりません」とエラーを返す処理
}
```

---


### 4:GET：HTMLとCSSを渡す

`fs`（ファイルシステム）の機能を使って、HTMLファイルやCSSファイルを読み込み、ブラウザに返す。

- `(err, data) => { ... }` :  これはコールバック関数と呼ばれ、「ファイルの読み込みが終わった時（または失敗した時）」に呼び出される処理

    - `err` : もし読み込みに失敗した場合のエラー情報が入る
    - `data` : 読み込みに成功した場合のファイルの中身が入る

- `res.writeHead(...) ` : レスポンスの種類を伝え、res.end(...) で中身を渡して通信を完了する


```javascript
// もし、アクセスされたURLが '/' で、かつ、通信方法が 'GET' ならば
if (req.url === '/' && req.method === 'GET') {
    // index.htmlを渡す処理（後述）

} 
// そうではなく、もし、URLが '/style.css' ならば
else if (req.url === '/style.css') {
    // style.cssを渡す処理（後述）

}
// そうではなく、もし、URLが '/greet' で、かつ、通信方法が 'POST' ならば
else if (req.url === '/greet' && req.method === 'POST') {
    // フォームデータを受け取って挨拶を返す処理（後述）

} 
// 上記のどれにも当てはまらない場合
else {
    // 「ページが見つかりません」とエラーを返す処理
}
```

---

### 5:POST：フォームデータを受け取る

フォームから送られてくるデータを受け取り、処理をする部分。

```javascript
// (5-1) 受け取ったデータを入れておくための、空の変数を用意
let body = '';

// (5-2) データのかたまり(chunk)が送られてくるたびに、この処理を実行する
req.on('data', chunk => {
    body += chunk.toString(); // body変数にどんどん追加していく
});

// (5-3) 全てのデータを受け取り終わったら、この処理を実行する
req.on('end', () => {
    // (5-4) 'username=...'の形式を { username: '...' } の形式に変換
    const formData = querystring.parse(body);
    // (5-5) usernameの値を取り出す。もし空なら'名無し'を代わりに入れる
    const userName = formData.username || '名無し';
    
    // (5-6) ユーザー名を含んだHTML文字列を作成
    const responseHtml = `... こんにちは、${userName}さん！ ...`;
    
    // (5-7) 作成したHTMLをブラウザに送信
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.end(responseHtml);
});
```

---


### 起動

最後に、作成したサーバーを指定したポート番号で起動させる。これで初めて、外部からのアクセスを受け付けられるようになる。

```javascript
// 使うポート番号を8000番に設定
const port = 8000;

// 作成したserverを、8000番ポートで起動する
server.listen(port, () => {
    // サーバーの起動が完了したら、この中の処理が実行される
    console.log(`サーバーをポート ${port} で起動します...`);
    console.log(`ブラウザで http://localhost:${port} を開いてください`);
});
```