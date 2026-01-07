# Google Analytics 設定手順書

このドキュメントは、Green Beans Coffee ファンサイトにGoogle Analytics（GA4）を設定するための手順をまとめたものです。

---

## 📋 概要

Google Analyticsを設定することで、以下の情報を確認できるようになります：

- **訪問者数**: サイトに何人訪れたか
- **ページビュー**: どのページが見られているか
- **流入元**: Google検索、SNS、直接アクセスなど
- **デバイス**: PC、スマートフォン、タブレットの割合
- **地域**: 訪問者がどの地域から来ているか
- **滞在時間**: サイトにどのくらい滞在しているか

---

## 🚀 設定手順

### ステップ1: Google Analyticsアカウントを作成

1. **Google Analyticsにアクセス**
   - https://analytics.google.com/ を開く
   - Googleアカウントでログイン（お持ちでない場合は作成）

2. **「測定を開始」をクリック**
   - 初めての場合、「測定を開始」ボタンが表示されます

3. **アカウントの設定**
   - **アカウント名**: `Green Beans Coffee`（任意の名前でOK）
   - アカウントのデータ共有設定: 推奨設定のまま（すべてチェック）でOK
   - 「次へ」をクリック

4. **プロパティの設定**
   - **プロパティ名**: `GBC公式サイト` または `Green Beans Coffee ファンサイト`
   - **レポートのタイムゾーン**: `日本`
   - **通貨**: `日本円 (JPY)`
   - 「次へ」をクリック

5. **ビジネス情報**
   - **業種**: `フード、飲料`
   - **ビジネスの規模**: `小規模 - 従業員数1〜10名`
   - **Analyticsの利用目的**: 該当するものにチェック（例：「顧客エンゲージメントの調査」など）
   - 「作成」をクリック

6. **利用規約に同意**
   - 利用規約を確認し、同意にチェック
   - 「同意する」をクリック

---

### ステップ2: データストリーム（Webサイト）を作成

1. **「Webストリームを設定」を選択**
   - プラットフォームの選択画面で「ウェブ」を選択

2. **ストリームの詳細を入力**
   - **ウェブサイトのURL**: `https://greenbeanscoffeeambassador.com`
   - **ストリーム名**: `GBC公式サイト`
   - **拡張計測機能を有効にする**: チェックを入れたまま（推奨）
   - 「ストリームを作成」をクリック

3. **測定IDをコピー**
   - ストリーム作成後、**測定ID（`G-XXXXXXXXXX`形式）** が表示されます
   - この測定IDをメモまたはコピーしてください
   - 例: `G-ABC123XYZ9`

---

### ステップ3: サイトにトラッキングコードを設置

#### 方法A: 制作者に依頼する場合

1. 取得した **測定ID（`G-XXXXXXXXXX`）** を制作者に伝える
2. 制作者がHTMLファイルを更新します

#### 方法B: ご自身で設置する場合

1. **ファイルを開く**
   - `/Users/kikumi/web-projects/gbc-fan-site/public/index.html` を開く
   - テキストエディタ（VS Code、メモ帳など）を使用

2. **トラッキングコードを編集**
   - ファイルの上部（6〜18行目あたり）に以下のようなコメントがあります：

```html
<!-- TODO: Google Analytics GA4 トラッキングコード -->
<!-- サイトオーナーがGoogle Analyticsアカウントを作成後、以下に測定IDを設定してください -->
<!-- 設定方法は project-docs/google-analytics-setup.md を参照 -->
<!--
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
-->
```

3. **コメントアウトを解除し、測定IDを設定**
   - `<!--` と `-->` を削除してコメントアウトを解除
   - `G-XXXXXXXXXX` の部分を、ステップ2で取得した実際の測定IDに置き換える（2箇所）

**編集後の例**（測定IDが `G-ABC123XYZ9` の場合）：

```html
<!-- Google Analytics GA4 トラッキングコード -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-ABC123XYZ9"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-ABC123XYZ9');
</script>
```

4. **ファイルを保存**
   - UTF-8エンコーディングで保存してください

---

### ステップ4: サイトに反映（デプロイ）

#### Cloudflare Pagesを使用している場合

1. **変更をGitにコミット**
   ```bash
   git add public/index.html
   git commit -m "Add Google Analytics tracking code"
   ```

2. **GitHubにプッシュ**
   ```bash
   git push origin main
   ```

3. **自動デプロイ**
   - Cloudflare Pagesが自動的にサイトを更新します（通常1〜3分）

#### 制作者に依頼する場合

- 「Google Analyticsのトラッキングコードを設置してデプロイしてください」と依頼

---

### ステップ5: 動作確認

1. **リアルタイムレポートで確認**
   - Google Analyticsにログイン
   - 左メニューから「レポート」→「リアルタイム」を選択

2. **自分のサイトにアクセス**
   - https://greenbeanscoffeeambassador.com を別タブで開く
   - ページを移動してみる

3. **レポートを確認**
   - リアルタイムレポートに「1人」と表示されればOK
   - 表示されない場合は、5分ほど待ってから再度確認

---

## ⚠️ トラブルシューティング

### トラッキングコードが動作しない場合

1. **測定IDが正しいか確認**
   - `G-` から始まる10桁のIDか
   - コピー&ペーストミスがないか
   - 2箇所とも同じIDになっているか

2. **コメントアウトが解除されているか確認**
   - `<!--` と `-->` が残っていないか

3. **ブラウザのキャッシュをクリア**
   - Ctrl + Shift + R（Windows）または Cmd + Shift + R（Mac）で強制リロード

4. **広告ブロッカーを無効化**
   - 広告ブロック拡張機能がGAをブロックしている可能性があります
   - 一時的に無効化して確認

5. **デプロイが完了しているか確認**
   - Cloudflare Pagesのダッシュボードで最新のデプロイが成功しているか確認

---

## 📊 データの見方（基本）

### アクセス数を確認する

1. **Google Analyticsにログイン**
2. **左メニュー「レポート」→「ライフサイクル」→「エンゲージメント」→「概要」**
3. **表示期間を変更**: 右上の日付をクリックして期間を選択

### よく見る指標

- **ユーザー**: サイトに訪れた人数
- **セッション**: 訪問回数（同じ人が複数回訪れると複数カウント）
- **ページビュー**: ページが表示された回数
- **直帰率**: 1ページだけ見て離脱した割合
- **平均セッション時間**: 1回の訪問でどのくらい滞在したか

---

## 🔒 プライバシーへの配慮

Google Analyticsは個人を特定する情報は収集しません。以下の情報のみを匿名で収集します：

- ページの閲覧状況
- 訪問者の地域（都道府県レベル）
- デバイスの種類
- 流入元

個人情報（メールアドレス、氏名など）は一切収集されません。

---

## 📝 メモ

- **測定ID**: `G-_______________`（ここにメモしておくと便利です）
- **設定日**: _______________
- **担当者**: _______________

---

## 💡 参考リンク

- [Google Analytics公式ヘルプ](https://support.google.com/analytics)
- [GA4スタートガイド](https://support.google.com/analytics/answer/9304153)
- [Google Analytics Academy（無料学習コース）](https://analytics.google.com/analytics/academy/)

---

## 🆘 困ったときは

制作者（制作代行者）に以下の情報を添えてお問い合わせください：

- 測定ID（`G-XXXXXXXXXX`）
- どの手順でつまずいたか
- エラーメッセージ（あれば）
