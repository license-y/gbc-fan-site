# GBCアンバサダーサイト 画像リスト

## 概要

このドキュメントでは、サイトに必要な画像とその仕様をまとめています。

---

## 画像保存先

```
public/assets/images/
├── hero/
│   └── hero-bg.jpg
├── about/
│   └── interior.jpg
├── menu/
│   ├── coffee.jpg
│   └── focaccia.jpg
├── experience/
│   ├── roasting.jpg
│   └── pet.jpg
├── diary/
│   └── （訪問記用画像、任意）
├── magazine/
│   ├── 202501-front.jpg
│   ├── 202501-back.jpg
│   └── （バックナンバー）
└── icons/
    └── favicon.ico
```

---

## ユーザー提供予定の画像

| セクション | ファイル名 | 用途 | 推奨サイズ | 備考 |
|-----------|-----------|------|-----------|------|
| Hero | hero-bg.jpg | ヒーロー背景 | 1920×1080px | 店内の雰囲気がわかる写真 |
| About | interior.jpg | 店内紹介 | 800×600px | コンクリート打ちっぱなしの空間 |
| Menu | coffee.jpg | コーヒー紹介 | 600×400px | ハンドドリップの様子 |
| Menu | focaccia.jpg | フード紹介 | 600×400px | 自家製フォカッチャ |
| Experience | roasting.jpg | 焙煎体験 | 600×400px | イベントの様子 |
| Experience | pet.jpg | ペットフレンドリー | 600×400px | ペットと過ごす様子 |
| Magazine | 最新号画像 | マガジン表示 | 800×1132px (A4縦) | 表紙・裏表紙各1枚 |

---

## Unsplashで補完する場合

ユーザーから画像が提供されない場合、以下のキーワードで検索して代替画像を使用。

### 検索キーワード

| セクション | 検索キーワード |
|-----------|---------------|
| Hero | `coffee shop interior concrete modern` |
| About | `cafe interior industrial design` |
| Menu (Coffee) | `hand drip coffee barista` または `specialty coffee` |
| Menu (Food) | `focaccia bread cafe` または `gluten free food` |
| Experience (Roasting) | `coffee roasting beans` |
| Experience (Pet) | `dog friendly cafe` または `pet cafe` |

### Unsplash URL形式

```
https://images.unsplash.com/photo-[ID]?w=800&q=80
```

- `w=800`: 幅800px
- `q=80`: 品質80%

---

## 画像仕様

### 共通仕様
- **フォーマット**: JPG または WebP
- **最適化**: 必須（TinyPNG、Squoosh等で圧縮）
- **HTML属性**: `loading="lazy" decoding="async"` を必ず設定

### サイズガイドライン

| 用途 | 推奨幅 | 最大ファイルサイズ |
|-----|-------|-------------------|
| Hero背景 | 1920px | 300KB以下 |
| セクション画像 | 800px | 150KB以下 |
| サムネイル | 400px | 50KB以下 |

---

## ファビコン

| ファイル名 | サイズ | 用途 |
|-----------|-------|------|
| favicon.ico | 32×32px | ブラウザタブ |
| apple-touch-icon.png | 180×180px | iOS |
| favicon-192.png | 192×192px | Android |

### 作成方法
1. 店舗ロゴまたはコーヒー豆アイコンを用意
2. https://realfavicongenerator.net/ で各サイズを生成

---

## GBCマガジン画像

### ファイル命名規則
```
YYYYMM-front.jpg  （表紙）
YYYYMM-back.jpg   （裏表紙）
```

### 例
- 2025年1月号: `202501-front.jpg`, `202501-back.jpg`
- 2024年12月号: `202412-front.jpg`, `202412-back.jpg`

### 変換方法
1. PDFを開く
2. 表紙・裏表紙をそれぞれ画像として書き出し
3. 推奨サイズ: 幅800px（A4縦の比率を維持）
4. 圧縮してアップロード

### 見開き表示の実装
```html
<div class="flex gap-4 justify-center">
  <img src="assets/images/magazine/202501-front.jpg" alt="GBCマガジン2025年1月号 表紙" class="w-1/2 max-w-md">
  <img src="assets/images/magazine/202501-back.jpg" alt="GBCマガジン2025年1月号 裏表紙" class="w-1/2 max-w-md">
</div>
```

---

## 画像最適化サービス

ユーザーに案内する無料サービス:

- **TinyPNG** (https://tinypng.com/): PNG・JPEG最適化の定番
- **Squoosh** (https://squoosh.app/): Googleが提供する画像圧縮ツール
- **Optimizilla** (https://imagecompressor.com/): 複数画像の一括処理対応

---

## チェックリスト

### 画像準備
- [ ] Hero背景画像
- [ ] About用店内画像
- [ ] Menu用コーヒー画像
- [ ] Menu用フォカッチャ画像
- [ ] Experience用焙煎体験画像
- [ ] Experience用ペット画像
- [ ] 最新号マガジン画像（表紙・裏表紙）
- [ ] ファビコン

### 最適化確認
- [ ] すべての画像を圧縮済み
- [ ] ファイルサイズが適切
- [ ] alt属性を設定

### HTML設定
- [ ] `loading="lazy"` 設定
- [ ] `decoding="async"` 設定
- [ ] 適切なwidth/height属性（CLSを防ぐ）
