## CSSコード

(1) `body`
ページ全体のスタイル。

`display: flex;` 以下の3行は、中身（今回は`.container`）を画面のど真ん中に配置するためのおまじないです。

```css
/* (1) ページ全体の基本スタイル */
body {
    font-family: sans-serif;
    background-color: #f0f2f5;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
```

--- 

(2) `.container`

`.`で始まるのは**クラスセレクタ**と言い、HTML側で`class="container"`と指定された要素にスタイルを適用します。ここでは、白い背景、余白(`padding`)、角丸(`border-radius`)、影(`box-shadow`)を指定してカード状のデザインを作っています。

```css
/* (2) .containerクラスが付いた要素のスタイル */
.container {
    background-color: white;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
```


--- 

(3) `button`
` <button>`タグ全てに適用されるスタイルです。

```css
/* (3) ボタンのスタイル */
button {
    background-color: #007bff;
    color: white;
    cursor: pointer; /* マウスカーソルを指の形に */
}
```

--- 

(4) `button:hover` 
`:hover`は**疑似クラス**といい、「要素にマウスカーソルが乗っている間」だけ適用されるスタイルを定義できる。これにより、インタラクティブな動きを実現。

```css
/* (4) ボタンにマウスが乗った時のスタイル */
button:hover {
    background-color: #0056b3;
}
```
