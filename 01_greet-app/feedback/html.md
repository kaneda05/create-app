## HTMLコード

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>あいさつアプリ</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>あいさつアプリ</h1>
        <p>あなたの名前を教えてください。</p>
        
        <form action="/greet" method="post">
            <input type="text" name="username" placeholder="名前を入力">
            <button type="submit">送信</button>
        </form>
    </div>
</body>
</html>
```

`<link rel="stylesheet" href="style.css">`
このHTMLファイルにstyle.cssという名のスタイルシートを適用する、という宣言ブラウザはこれを見て、サーバーにstyle.cssをリクエストする。


`<form action="/greet" method="post">`: 

フォームの定義
- action="/greet": このフォームの送信先URLを指定。app.jsのPOST処理のパスと一致。
- method="post": 送信方法をPOSTに指定。


`<input type="text" name="username">`
テキスト入力欄。ここで最も重要なのが name="username" の部分。この name が、サーバー側でデータを受け取る際のキー（名前）になる。