# ペット特化サイト コンテンツ・実装仕様書

## 基本情報

- **サイトURL**: `/pets/` (サブディレクトリ)
- **アンバサダー名**: pome_ponkun
- **目的**: ペット愛好家視点でGreen Beans Coffeeの魅力を伝える

---

## 決定事項サマリー

| 項目 | 決定 |
|------|------|
| ドメイン構造 | サブディレクトリ `/pets/` |
| Menuセクション | 入れない（メインサイトへリンク） |
| FAQ | パターン2: メイン17問 + ペット特化5問 = 22問 |
| チェキブースセクション | 追加する |
| 画像 | 初期はUnsplashプレースホルダー |

---

## ファイル構成

```
public/
├── index.html                    # メインサイト（Kikumi）
└── pets/                         # ペット特化サイト
    ├── index.html                # ペットサイトHTML
    └── assets/
        └── images/               # ペットサイト専用画像
            ├── hero/
            ├── pet-friendly/
            ├── cheki-booth/
            └── visit-diary/
```

---

## セクション構成

```
[Hero] #hero
  → Home

[About] #about
  → About（店舗基本情報 + pome_ponkun紹介）

[Pet Friendly] #pet-friendly
  → Pet Friendly（ペット同伴ルール・設備）

[Cheki Booth] #cheki-booth
  → Cheki Booth（チェキブース紹介・参加者の声）

[Access] #access
  → Access（Googleマップ）

[Visit Diary] #visit-diary
  → Visit Diary（pome_ponkunの訪問記）

[FAQ] #faq
  → FAQ（22問）

[Links] #links
  → （ナビなし）

[Footer]
```

### ナビゲーション項目（6項目）
Home / About / Pet Friendly / Cheki Booth / Access / Visit Diary / FAQ

---

## 各セクションの詳細仕様

### 1. Hero (#hero)

**レイアウト:** メインサイトと同様（フルスクリーン）

**コンテンツ:**
```
[メインタイトル]
Green Beans Coffee

[サブタイトル]
愛犬と一緒に過ごせる
北参道のペットフレンドリーカフェ

[右下表示]
GBCアンバサダー
pome_ponkun
```

**背景画像:**
- 初期: Unsplash（犬とカフェ関連）
- 将来: 撮影会で取得した写真に差し替え

**Unsplash検索キーワード:**
- "dog cafe"
- "pet friendly cafe"
- "dog coffee shop"

---

### 2. About (#about)

**レイアウト:** 2カラム（メインサイトと同様）

**リード文（pome_ponkun視点）:**
```
北参道・千駄ヶ谷エリアの「ダガヤサンドウ」で見つけた、愛犬と一緒に過ごせる隠れ家カフェ。

店内に入った瞬間に広がるコーヒーの香り、そしてペットを温かく迎えてくれるスタッフさんたち。ここは私と愛犬にとって特別な場所になりました。

このサイトでは、ペット愛好家の視点からGreen Beans Coffeeの魅力をお伝えします。
```

**店舗基本情報:** メインサイトと同一（同期必須）

**アンバサダー紹介:**
```
[pome_ponkun について]

愛犬と一緒にカフェ巡りを楽しむのが趣味。
Green Beans Coffeeは愛犬と店内でゆっくり過ごせる
数少ないお気に入りのカフェです。

ペットと一緒に楽しめるカフェ情報を発信しています。
```

---

### 3. Pet Friendly (#pet-friendly)

**レイアウト:** カード形式のグリッド

**セクションタイトル:** Pet Friendly

**リード文:**
```
Green Beans Coffeeは店内でペットと一緒に過ごせる、
東京でも珍しいペットフレンドリーカフェです。
```

**カード1: ペット同伴ルール**
```
タイトル: ペット同伴について

- 小型犬〜中型犬まで店内同伴OK
- リードの着用をお願いしています
- 他のお客様への配慮をお願いします
- ペット用メニューはありませんが、お水は提供可能
```

**カード2: 設備・サービス**
```
タイトル: ペット向け設備

- 犬用のお水を無料提供
- 足ふきシート完備
- テラス席もあり（天気の良い日におすすめ）
- チェキ撮影サービスあり
```

**カード3: ペットとの過ごし方**
```
タイトル: おすすめの過ごし方

1. まずはテラス席で落ち着かせる
2. 店内の雰囲気に慣れたら移動もOK
3. チェキブースで記念撮影
4. ゆっくりコーヒーを楽しむ
```

**Unsplash検索キーワード:**
- "dog water bowl cafe"
- "pet terrace"
- "dog cafe interior"

---

### 4. Cheki Booth (#cheki-booth)

**レイアウト:** 2カラム（画像 + テキスト）

**セクションタイトル:** Cheki Booth

**リード文:**
```
ペット連れで来店すると、チェキで愛犬の写真を撮ってもらえます。
撮影したチェキは店内に飾られて、次に来たときに見返すのも楽しみのひとつ。
```

**内容:**
```
[チェキブースについて]

GBCでは来店したペットの写真をチェキで撮影してくれます。
撮影は無料で、1枚はお持ち帰り、もう1枚は店内に飾られます。

店内の壁には今までに来店したたくさんのワンちゃんたちの
チェキが飾られていて、見ているだけで楽しくなります。

[参加者の声]
※撮影会後に取得したカード内容を掲載予定

「愛犬の可愛い写真が撮れて大満足！」
「チェキが飾られているのを見つけて嬉しかった」
「スタッフさんが上手に撮ってくれました」
```

**Unsplash検索キーワード:**
- "polaroid dog"
- "pet photo wall"
- "instant photo"

---

### 5. Access (#access)

**レイアウト:** メインサイトと同様

**内容:** メインサイトと同一（Googleマップ埋め込み含む）

---

### 6. Visit Diary (#visit-diary)

**レイアウト:** カード形式タイムライン

**セクションタイトル:** Visit Diary

**リード文:**
```
私と愛犬がGBCに通って見つけた魅力。
訪問のたびに新しい発見があります。
```

**訪問記 #1（プレースホルダー）:**
```
タイトル: 初めての訪問

[内容は撮影会後に差し替え予定]

初めてGBCに愛犬と一緒に訪れた日。
店内に入ると温かく迎えてくれるスタッフさんと
コーヒーのいい香り。愛犬も落ち着いて過ごせました。
```

**訪問記 #2（プレースホルダー）:**
```
タイトル: チェキ撮影体験

[内容は撮影会後に差し替え予定]

チェキブースで愛犬の写真を撮ってもらいました。
スタッフさんが上手に撮影してくれて、
可愛い写真が撮れて大満足です。
```

---

### 7. FAQ (#faq)

**レイアウト:** アコーディオン形式

**構成:** メイン17問 + ペット特化5問 = 22問

#### メインFAQ（17問）- メインサイトと同一

1. グリーンビーンズコーヒーはどこにありますか？
2. 営業時間と定休日は？
3. 予約はできますか？
4. ホームページはありますか？
5. ペットを連れて行っても大丈夫ですか？
6. 子ども連れでも入れますか？
7. グルテンフリーのメニューはありますか？
8. おすすめメニューは何ですか？
9. コーヒー豆は買えますか？
10. Wi-Fiや電源はありますか？
11. 一人でも入りやすいですか？
12. デートで使えますか？
13. 焙煎体験イベントは予約が必要ですか？
14. 貸切はできますか？
15. 支払い方法は何が使えますか？
16. テイクアウトはできますか？
17. メニューの詳細はどこで確認できますか？

#### ペット特化FAQ（5問）- 新規追加

**Q18. 大型犬も入れますか？**
```
基本的には小型犬〜中型犬が中心ですが、大型犬については事前に
お店にご確認いただくのがおすすめです。混雑状況やお店の判断に
よりますので、Instagram DMや電話で相談してみてください。
```

**Q19. 犬以外のペット（猫、うさぎ等）は同伴できますか？**
```
基本的には犬の同伴がメインですが、他のペットについては
事前にお店にご確認ください。ケージに入れた状態での
来店など、対応できる場合もあるかもしれません。
```

**Q20. ペット用メニューはありますか？**
```
専用のペットメニューはありませんが、犬用のお水は
無料で提供してもらえます。ペット用のおやつなどは
持ち込みOKですので、お気に入りのものを持参するのも◎
```

**Q21. テラス席以外でもペット同伴できますか？**
```
はい、店内のテーブル席でもペット同伴OKです。
リードの着用と他のお客様への配慮をお願いしています。
天気の良い日はテラス席もおすすめです。
```

**Q22. 混雑時のペット同伴について注意点はありますか？**
```
ランチタイム（11:30〜13:30頃）は混み合うことがあるため、
ゆっくり過ごしたい場合は少し時間をずらすのがおすすめです。
平日の午後や夕方は比較的空いていて過ごしやすいです。
```

---

### 8. Links (#links)

**内容:** メインサイトと同一（公式SNS、予約サイトへのリンク）

**追加:**
- メインサイトへのリンク「詳しいメニューはこちら」

---

### 9. Footer

**コンテンツ:**
```
このサイトについて

このサイトはGreen Beans CoffeeアンバサダーKikumiが運営する
ペット愛好家向けのサブサイトです。

お店の最新情報・公式情報は
Instagram（@green.beanscoffee）をご確認ください。

---

Created by pome_ponkun & Kikumi | 2026
GBC Ambassador Site - Pets Edition

© 2026 Kikumi. All rights reserved.
```

---

## メタ情報（SEO/AEO対策）

### title
```
Green Beans Coffee | 愛犬と一緒に過ごせる北参道のペットフレンドリーカフェ
```

### description
```
北参道駅徒歩3分、愛犬と店内で過ごせるペットフレンドリーカフェ。店内同伴OK、犬用水提供、チェキ撮影サービスあり。ペット撮影会も開催。アンバサダーpome_ponkunがペット愛好家視点で魅力を紹介します。
```

### keywords
```
ペット同伴カフェ, 犬連れカフェ 東京, ドッグフレンドリーカフェ, 北参道 ペットOK, 千駄ヶ谷 犬カフェ, グリーンビーンズコーヒー ペット, ダガヤサンドウ 犬, わんこと一緒 カフェ, ペットフレンドリー 渋谷区
```

### OGP
```html
<meta property="og:title" content="Green Beans Coffee | 愛犬と一緒に過ごせる北参道のペットフレンドリーカフェ">
<meta property="og:description" content="北参道駅徒歩3分、愛犬と店内で過ごせるペットフレンドリーカフェ。店内同伴OK、犬用水提供、チェキ撮影サービスあり。">
<meta property="og:type" content="website">
<meta property="og:url" content="https://greenbeanscoffeeambassador.com/pets/">
<meta property="og:image" content="https://greenbeanscoffeeambassador.com/pets/assets/images/hero/og-image.jpg">
```

### Canonical URL
```html
<link rel="canonical" href="https://greenbeanscoffeeambassador.com/pets/">
```

---

## JSON-LD構造化データ

### 1. CafeOrCoffeeShop（ペット特化版）

```json
{
  "@context": "https://schema.org",
  "@type": "CafeOrCoffeeShop",
  "name": "Green Beans Coffee",
  "alternateName": "グリーンビーンズコーヒー",
  "description": "北参道・千駄ヶ谷のペットフレンドリー自家焙煎カフェ。店内ペット同伴OK、犬用水提供、チェキ撮影サービスあり。",
  "url": "https://greenbeanscoffeeambassador.com/pets/",
  "telephone": "+81-3-6447-0681",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "千駄ヶ谷3-30-1 RC APARTMENT 1階",
    "addressLocality": "渋谷区",
    "addressRegion": "東京都",
    "postalCode": "151-0051",
    "addressCountry": "JP"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 35.6775167,
    "longitude": 139.7078346
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    "opens": "10:30",
    "closes": "20:00"
  },
  "amenityFeature": [
    {"@type": "LocationFeatureSpecification", "name": "ペット同伴可", "value": true},
    {"@type": "LocationFeatureSpecification", "name": "犬用水提供", "value": true},
    {"@type": "LocationFeatureSpecification", "name": "テラス席", "value": true},
    {"@type": "LocationFeatureSpecification", "name": "チェキ撮影サービス", "value": true},
    {"@type": "LocationFeatureSpecification", "name": "Wi-Fi", "value": true},
    {"@type": "LocationFeatureSpecification", "name": "バリアフリー", "value": true}
  ],
  "sameAs": [
    "https://www.instagram.com/green.beanscoffee",
    "https://www.youtube.com/@greenbeanscoffee9"
  ]
}
```

### 2. FAQPage（22問）

メインの17問 + ペット特化5問のJSON-LDを生成

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    // メイン17問（メインサイトと同一）
    // + ペット特化5問を追加
    {
      "@type": "Question",
      "name": "大型犬も入れますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "基本的には小型犬〜中型犬が中心ですが、大型犬については事前にお店にご確認いただくのがおすすめです。混雑状況やお店の判断によりますので、Instagram DMや電話で相談してみてください。"
      }
    },
    {
      "@type": "Question",
      "name": "犬以外のペット（猫、うさぎ等）は同伴できますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "基本的には犬の同伴がメインですが、他のペットについては事前にお店にご確認ください。ケージに入れた状態での来店など、対応できる場合もあるかもしれません。"
      }
    },
    {
      "@type": "Question",
      "name": "ペット用メニューはありますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "専用のペットメニューはありませんが、犬用のお水は無料で提供してもらえます。ペット用のおやつなどは持ち込みOKですので、お気に入りのものを持参するのも◎"
      }
    },
    {
      "@type": "Question",
      "name": "テラス席以外でもペット同伴できますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "はい、店内のテーブル席でもペット同伴OKです。リードの着用と他のお客様への配慮をお願いしています。天気の良い日はテラス席もおすすめです。"
      }
    },
    {
      "@type": "Question",
      "name": "混雑時のペット同伴について注意点はありますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ランチタイム（11:30〜13:30頃）は混み合うことがあるため、ゆっくり過ごしたい場合は少し時間をずらすのがおすすめです。平日の午後や夕方は比較的空いていて過ごしやすいです。"
      }
    }
  ]
}
```

### 3. WebSite

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Green Beans Coffee ペット特化サイト",
  "url": "https://greenbeanscoffeeambassador.com/pets/",
  "description": "北参道のペットフレンドリーカフェ「Green Beans Coffee」をペット愛好家視点で紹介するサブサイト",
  "author": {
    "@type": "Person",
    "name": "pome_ponkun"
  },
  "isPartOf": {
    "@type": "WebSite",
    "name": "Green Beans Coffee アンバサダーサイト",
    "url": "https://greenbeanscoffeeambassador.com/"
  }
}
```

---

## 基本情報の同期チェックリスト

両サイトで同一に保つ情報（更新時は両方を確認）:

- [ ] 営業時間
- [ ] 住所・電話番号
- [ ] 定休日
- [ ] Googleマップ埋め込み
- [ ] 公式SNSリンク
- [ ] 支払い方法
- [ ] FAQ（メイン17問は同一）

**更新手順:**
1. メインサイトを更新
2. ペットサイトも同じ箇所を更新
3. JSON-LDを両方確認
4. 同時にコミット

---

## 実装時の注意点

### 1. 画像パス
ペットサイトの画像パスは相対パスで指定:
```html
<!-- ペットサイト内の画像 -->
<img src="assets/images/hero/hero-bg.jpg" alt="...">

<!-- メインサイトの共有画像を使う場合 -->
<img src="../assets/images/about-shop-front.jpg" alt="...">
```

### 2. ナビゲーションリンク
ペットサイト内のリンク:
```html
<a href="#hero">Home</a>
<a href="#about">About</a>
```

メインサイトへのリンク:
```html
<a href="../#menu">詳しいメニューを見る</a>
<a href="../">メインサイトへ</a>
```

### 3. Google Analytics
メインサイトと同じGA4トラッキングコードを使用:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-LPQZLGFJVX"></script>
```

### 4. CSSカラーパレット
メインサイトと同一のTailwind設定を使用:
```javascript
tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: '#4A3728',
        secondary: '#8B7355',
        accent: '#C9A86C',
        background: '#FAF8F5',
        text: '#2D2A26',
      }
    }
  }
}
```

---

## Unsplash画像リスト（プレースホルダー用）

### Hero用
- https://unsplash.com/photos/dog-cafe-scene（検索: dog cafe）
- 推奨: 横向き、16:9、犬とカフェの雰囲気

### Pet Friendly用
- 犬用水皿: 検索 "dog water bowl"
- テラス席: 検索 "cafe terrace dog"
- 店内ペット: 検索 "dog inside cafe"

### Cheki Booth用
- ポラロイド風: 検索 "polaroid photo wall"
- ペット写真: 検索 "pet photo"

### Visit Diary用
- 犬とコーヒー: 検索 "dog coffee table"
- カフェでくつろぐ犬: 検索 "relaxed dog cafe"

---

## 更新履歴

- 2026-01-24: 初版作成
