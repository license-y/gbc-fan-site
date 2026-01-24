# プロジェクトの名前
アンバサダー Kikumiによるグリーンビーンズコーヒーのファンサイト

## プロジェクト概要

- 非エンジニア、非デザイナーが、AI Agent (Claude Code)を使ってWebサイトを構築する
- 構築するWebサイトは「ワンページ完結」とする。１ページに必要な情報をまとめて提供する
- **AEO（Answer Engine Optimization）対策を最優先**とする
- ブログなどは、別のサービス（ Substack や note.com など）を利用することを前提とする

## サイト基本情報

- **タイトル**: Green Beans Coffee
- **サブタイトル**: 店名看板のないペットフレンドリーカフェ
- **アンバサダー**: Kikumi（Heroセクション右下に「GBCアンバサダー Kikumi」と表示）

## ファイル構成

```
project-root/
├── project-docs/
│   ├── site-content.md           # メインサイト コンテンツ原稿
│   ├── pets-content.md           # ペットサイト コンテンツ原稿
│   ├── pets-photoshoot-guide.md  # ペット撮影会 素材収集ガイド
│   ├── technical-spec.md         # 技術仕様（JSON-LD含む）
│   └── image-list.md             # 画像リスト
├── public/
│   ├── index.html                # メインHTML（Kikumi）
│   ├── favicon.ico
│   ├── assets/
│   │   ├── images/
│   │   │   ├── hero/
│   │   │   ├── about/
│   │   │   ├── menu/
│   │   │   ├── experience/
│   │   │   ├── diary/
│   │   │   └── magazine/
│   │   ├── css/
│   │   └── js/
│   │
│   └── pets/                     # ペット特化サイト（pome_ponkun）
│       ├── index.html            # ペットサイトHTML
│       └── assets/
│           └── images/           # ペットサイト専用画像
│               ├── hero/
│               ├── pet-friendly/
│               ├── cheki-booth/
│               └── visit-diary/
│
└── CLAUDE.md                     # 本ファイル
```

---

# 作成のためのルール、ワークフロー

## 保存先

- ファイルを作成する際は、必ずUTF-8エンコーディングで保存し、日本語の文字化けが発生しないよう注意してください
- public ディレクトリに成果物を保存する
- 特にユーザーの指示がなければ、index.html で作成する
- 指示があれば、指示に合わせたファイルを publicの下に保存する
- 画像、CSS、Javascriptなどを生成した場合は、public/assets/ 以下の所定のフォルダに保存する

## あなたの仕事

### ⚠️ Git操作の重要ルール（絶対厳守）

**🚨 絶対に守ること 🚨**

1. **ユーザーの明確な指示があるまで、コミットもプッシュも絶対に行わない**
2. **コミットの指示があった場合** → コミットのみ実行し、完了を報告。プッシュはしない
3. **プッシュの指示があった場合** → その時初めてプッシュを実行
4. **「コミット＆プッシュ」の指示があった場合のみ** → 両方を実行

**禁止事項:**
- ❌ 勝手にコミット＆プッシュを連続実行する
- ❌ 「コミットしました」と言って勝手にプッシュもする
- ❌ ユーザーの確認なしに任意のGit操作を行う
- ❌ 作業完了後に自動でコミット＆プッシュする

**このルールは何度も破られているため、各作業の完了時に必ず「コミット＆プッシュの指示をお待ちしております」と伝え、ユーザーの指示を待つこと。**

---

### 主な業務内容

- Webページを作成する: ユーザーの指示、意図を理解し、Webページを作成する。ユーザーがコンテンツも創造的に作って欲しいと判断したら、創造性を発揮して作る。ユーザーがコンテンツを事前に決定し、詳細に依頼してきた場合は、提示されたコンテンツに従って作成する
- Webページの編集: 編集箇所、依頼を理解して編集する
- Webページのチェック: 文法エラー、不要な記述、大きすぎる画像などがあれば、改善方法をアドバイスする

## 画像の取得

- ユーザーから画像が提供されない場合、適切と思われるものを取得する
- unsplash-image-finder を呼び出して、Unsplashの画像を検索し、その情報を使って設定する

## 画像の最適化について

- 画像の最適化が必要であれば、ユーザーに伝える
- 画像最適化については、以下の無料サービスを案内する:
    - **TinyPNG** (https://tinypng.com/): PNG・JPEG最適化の定番
    - **Squoosh** (https://squoosh.app/): Googleが提供する画像圧縮ツール
    - **Optimizilla** (https://imagecompressor.com/): 複数画像の一括処理対応

---

# 条件、技術スタック

## HTML、CSS、Javascript

### 使用するライブラリ

- Tailwind CSS v4.1 以上を使用し、コード量を減らしつつ、エラーが少ない簡潔なコードを書いてください。
- Tailwind CSS v4.1 以上は、CDNを使ってください（画像最適化の方が速度に寄与するので、Tailwind CSSの最適化は不要です）
- Animate.css v4.1.1 以上を使用して、適度にアニメーションをつける（派手にならないように注意）
- スクロールアニメーションは、AOS v2.3 以上を使用するか、ユーザーの要求によっては、  Animate.css v4.1.1 + Intersection Observer API で実装してください
- アイコンや、ロゴは、Lucide v0.536.0 (https://lucide.dev/) を使ってください

### パフォーマンス最適化

- レスポンシブデザイン必須（モバイルファースト）
- 画像に loading="lazy" decoding="async" を設定
- CSS/JSは最小限、不要なライブラリは避ける
- 外部依存を最小限に抑制

### HTML構造

- セマンティック要素の適切な使用（header、nav、main、section、article、footer）
- 各セクションにID属性を設定
- メタタグ完備（description、keywords、og:image等）
- ファビコン設定

## デザイン要件

- Tailwind CSS の theme を使ってカラーパレットを設定
- **カラーパレット**:
  - Primary: #4A3728（ダークブラウン）
  - Secondary: #8B7355（ミディアムブラウン）
  - Accent: #C9A86C（ゴールドベージュ）
  - Background: #FAF8F5（オフホワイト）
  - Text: #2D2A26（ダークグレー）
- フォントは日本語に最適なものを選択、パフォーマンスを考慮する
- ホワイトスペースを効果的に使い、読みやすさを重視

---

# セクション構成（確定）

ナビゲーションに表示: Home / About / Menu / Experience / Access / Visit Diary / FAQ（7項目）

```
[Hero] #hero ← ナビ: Home
  ↓
[About] #about ← ナビ: About（店舗紹介＋基本情報統合）
  ↓
[Menu] #menu ← ナビ: Menu
  ↓
[Experience] #experience ← ナビ: Experience（体験イベント＋ペットフレンドリー統合）
  ↓
[Access] #access ← ナビ: Access
  ↓
[Visit Diary] #visit-diary ← ナビ: Visit Diary
  ↓
[GBC Magazine] #gbc-magazine ← ナビなし（スクロールで表示）
  ↓
[FAQ] #faq ← ナビ: FAQ
  ↓
[Links] #links ← ナビなし（フッター付近）
  ↓
[About This Site] フッター
```

---

# AEO対策 重要事項

## JSON-LD構造化データ（必須）

以下の構造化データを `<head>` 内または `</body>` 直前に設置:

1. **LocalBusiness (CafeOrCoffeeShop)**: 店舗情報
2. **FAQPage**: よくある質問（15問）
3. **WebSite**: サイト情報

詳細は `project-docs/technical-spec.md` を参照。

## FAQセクション

- アコーディオン形式で実装
- **メインサイト**: 17問のQ&Aを掲載
- **ペットサイト**: 22問（メイン17問 + ペット特化5問）
- JSON-LD FAQPage と連動

## コンテンツの書き方

- 自然で人間味のある文章（AIが引用しやすい）
- 具体的な情報を明記（住所、電話番号、営業時間など）
- 「北参道」「千駄ヶ谷」「ダガヤサンドウ」などの地域名を自然に含める
- ペットフレンドリー、グルテンフリー、コーヒー専門店などのキーワードを含める

---

# ナビ部分について

- ナビゲーションは、スティッキーを採用する
- ナビゲーションは、初期位置にある時は透明（ナビのリンク文字やボタンは、背景の色を考慮し、コントラストが生まれる色や装飾を選択すること）
- ナビゲーションは、スクロールが開始したら、透明色を解除し、blur 12%、ホワイト系か、ダーク系の背景色で70%の透明度、ナビの文字色はコントラストが生まれる色を選択すること
- ナビはレスポンシブ対応とする（タブレットサイズで、切り替える）
- **ナビ項目は7個**: Home / About / Menu / Experience / Access / Visit Diary / FAQ

---

# GBCマガジンセクション

## 表示方法
- 最新号は **見開き表示**（表紙と裏表紙を横並び）
- A4縦×2枚を横に並べて全体が見えるように
- バックナンバーは小さめのサムネイルグリッド（6号分）

## ファイル命名規則
```
assets/images/magazine/YYYYMM-front.jpg
assets/images/magazine/YYYYMM-back.jpg
```

## 更新手順（毎月）
1. PDFを画像に変換（表紙・裏表紙）
2. 画像を最適化
3. magazine/ フォルダに保存
4. index.html の該当箇所を更新

---

# ペット特化サイト（/pets/）

## 概要

- **URL**: `/pets/`（サブディレクトリ）
- **アンバサダー**: pome_ponkun
- **目的**: ペット愛好家視点でGreen Beans Coffeeの魅力を伝える
- **詳細仕様**: `project-docs/pets-content.md` を参照

## セクション構成（ペットサイト）

ナビゲーションに表示: Home / About / Pet Friendly / Cheki Booth / Access / Visit Diary / FAQ（7項目）

```
[Hero] #hero ← ナビ: Home
  ↓
[About] #about ← ナビ: About（店舗紹介＋pome_ponkun紹介）
  ↓
[Pet Friendly] #pet-friendly ← ナビ: Pet Friendly（ペット同伴ルール・設備）
  ↓
[Cheki Booth] #cheki-booth ← ナビ: Cheki Booth（チェキブース・参加者の声）
  ↓
[Access] #access ← ナビ: Access
  ↓
[Visit Diary] #visit-diary ← ナビ: Visit Diary（pome_ponkunの訪問記）
  ↓
[FAQ] #faq ← ナビ: FAQ（22問: メイン17問 + ペット特化5問）
  ↓
[Links] #links ← ナビなし
  ↓
[Footer]
```

## メインサイトとの違い

| 項目 | メインサイト | ペットサイト |
|------|-------------|-------------|
| アンバサダー | Kikumi | pome_ponkun |
| Menuセクション | あり | なし（メインへリンク） |
| GBC Magazine | あり | なし |
| Pet Friendly | Experienceに含む | 独立セクション |
| Cheki Booth | なし | あり |
| FAQ数 | 17問 | 22問（+ペット特化5問） |

## 基本情報の同期ルール

両サイトで同一に保つ情報（更新時は**両方を同時に更新**すること）:

- 営業時間・定休日
- 住所・電話番号
- Googleマップ埋め込み
- 公式SNSリンク
- 支払い方法
- FAQ（メイン17問は同一内容）

**更新手順:**
1. メインサイト（`/public/index.html`）を更新
2. ペットサイト（`/public/pets/index.html`）も同じ箇所を更新
3. JSON-LDを両方確認
4. 同時にコミット

---

# 参考情報

## 公式情報リンク
- Instagram: https://www.instagram.com/green.beanscoffee
- YouTube: https://www.youtube.com/@greenbeanscoffee9
- Googleマップ: https://www.google.com/maps/place/%E3%82%B0%E3%83%AA%E3%83%BC%E3%83%B3%E3%83%93%E3%83%BC%E3%83%B3%E3%82%BA%E3%82%B3%E3%83%BC%E3%83%92%E3%83%BC/@35.677521,139.7052597,17z/data=!3m1!4b1!4m6!3m5!1s0x60188d4404ef151f:0x85142d57557d0f87!8m2!3d35.6775167!4d139.7078346!16s%2Fg%2F11s4ybh4cr?entry=ttu
- 食べログ: https://tabelog.com/tokyo/A1309/A130901/13277423
- ホットペッパー: https://www.hotpepper.jp/strJ004509887/

## 参考サイト
- https://kaze-love.com（藤井風ファンサイト - 同じ制作者による類似プロジェクト）

---

# ドメイン取得後の作業（TODO）

独自ドメインを取得したら、以下の箇所を新しいドメインに変更する必要があります：

## 変更が必要な箇所

### 1. index.html のメタタグ（3箇所）
- **OGP og:url**: `<meta property="og:url" content="...">`
- **OGP og:image**: `<meta property="og:image" content="...">`
- **Canonical URL**: `<link rel="canonical" href="...">`

※ HTMLファイル内にTODOコメントあり

### 2. JSON-LD 構造化データ（1箇所）
- **WebSite schema の url**: `</body>` 直前のJSON-LDスクリプト内

## 作業手順

1. 新しいドメインをCloudflare Pagesに設定
2. 上記4箇所のURLを新ドメインに一括置換
3. ブラウザで確認（OGPデバッグツール推奨: https://www.opengraph.xyz/）
4. ユーザーの指示を待ってからコミット＆プッシュ

## 注意事項

- 旧URL（gbc-fan-site.pages.dev）は引き続きアクセス可能
- 必要に応じてリダイレクト設定を検討
