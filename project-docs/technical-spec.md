# GBCアンバサダーサイト 技術仕様書

## 概要

- **サイト種別**: ワンページ完結型ファンサイト
- **目的**: AEO（Answer Engine Optimization）対策に特化したアンバサダーサイト
- **ホスティング**: Cloudflare Pages
- **参考サイト**: https://kaze-love.com（藤井風ファンサイト）

---

## 技術スタック

### フレームワーク・ライブラリ
- **HTML5**: セマンティック要素を使用
- **Tailwind CSS v4.1+**: CDN版を使用
- **Animate.css v4.1.1+**: 控えめなアニメーション
- **AOS v2.3+**: スクロールアニメーション
- **Lucide Icons v0.536.0**: アイコン

### パフォーマンス要件
- モバイルファースト・レスポンシブデザイン
- 画像: `loading="lazy" decoding="async"` 必須
- 外部依存は最小限

---

## ファイル構成

```
project-root/
├── project-docs/
│   ├── site-content.md      # コンテンツ原稿
│   ├── technical-spec.md    # 技術仕様（本ファイル）
│   └── image-list.md        # 画像リスト
├── public/
│   ├── index.html           # メインHTML
│   ├── favicon.ico          # ファビコン
│   └── assets/
│       ├── images/
│       │   ├── hero/
│       │   ├── about/
│       │   ├── menu/
│       │   ├── experience/
│       │   ├── diary/
│       │   └── magazine/
│       ├── css/
│       │   └── custom.css   # カスタムCSS（必要な場合）
│       └── js/
│           └── main.js      # カスタムJS（必要な場合）
└── CLAUDE.md                # Claude Code用ルール
```

---

## カラーパレット提案

コーヒー専門店らしい温かみのある配色

```css
/* Tailwind CSS カスタムカラー */
--color-primary: #4A3728;      /* ダークブラウン（コーヒー） */
--color-secondary: #8B7355;    /* ミディアムブラウン */
--color-accent: #C9A86C;       /* ゴールドベージュ */
--color-background: #FAF8F5;   /* オフホワイト */
--color-text: #2D2A26;         /* ダークグレー */
--color-text-light: #6B6560;   /* ライトグレー */
```

---

## ナビゲーション仕様

### 表示項目（7項目）
1. Home（#hero）
2. About（#about）
3. Menu（#menu）
4. Experience（#experience）
5. Access（#access）
6. Visit Diary（#visit-diary）
7. FAQ（#faq）

### 動作仕様
- スティッキーナビゲーション
- 初期位置: 背景透明、文字は白（または背景に応じたコントラスト色）
- スクロール後: `backdrop-blur-sm bg-white/70` または `bg-gray-900/70`
- レスポンシブ: タブレット以下でハンバーガーメニュー

---

## セクション別仕様

### 1. Hero (#hero)
- 全画面高さ（100vh）
- 背景画像にオーバーレイ（暗め）
- タイトル・サブタイトル中央配置
- 右下に「GBCアンバサダー Kikumi」表示
- スクロール誘導アイコン（下向き矢印、アニメーション付き）
- **背景画像2枚（`hero_bg-1.jpg`, `hero_bg-2.jpg`）を5秒ごとに自動切り替え**
  - フェードイン/アウトによる緩やかでスムーズな遷移
  - JavaScriptで実装（setInterval + opacity transition）

### 2. About (#about)
- 2カラムレイアウト（モバイルは1カラム）
- 左: 店舗紹介文
- 右: 基本情報テーブル
- 店舗情報はカード形式で見やすく

### 3. Menu (#menu)
- 3カテゴリをタブまたはカード形式で表示
- 各カテゴリに画像＋説明文
- グルテンフリー対応を明記

### 4. Experience (#experience)
- グリッドレイアウト
- 焙煎体験、ペット撮影会、ペットフレンドリー、貸切イベント
- Instagram埋め込み（リール動画）の設置場所を確保

### 5. Access (#access)
- Googleマップ埋め込み
- テキストベースのアクセス案内（行動目線）
- 各駅からの所要時間リスト

### 6. Visit Diary (#visit-diary)
- タイムライン形式またはカード形式
- 5回分の訪問記を時系列で表示
- 画像があれば添付

### 7. GBC Magazine (#gbc-magazine)
- ナビゲーションには非表示
- 最新号: 見開き表示（表紙＋裏表紙を横並び）
- バックナンバー: グリッド表示（6号分）
- クリックで拡大表示（モーダル）

### 8. FAQ (#faq)
- アコーディオン形式
- 15問のQ&A
- JSON-LD構造化データ対応（後述）

### 9. Links (#links)
- ナビゲーションには非表示
- アイコン付きリンクリスト
- 公式SNS + 予約サイト

### 10. Footer (#site-info)
- サイト説明
- クレジット表記
- コピーライト

---

## JSON-LD 構造化データ

### 1. LocalBusiness（店舗情報）

```json
{
  "@context": "https://schema.org",
  "@type": "CafeOrCoffeeShop",
  "name": "Green Beans Coffee",
  "alternateName": "グリーンビーンズコーヒー",
  "description": "北参道・千駄ヶ谷のペットフレンドリー自家焙煎カフェ。店名看板のない隠れ家コーヒー専門店。グルテンフリーメニューあり。",
  "url": "https://[サイトURL]",
  "telephone": "+81-3-6447-0681",
  "email": "contact@greenbeans.co.jp",
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
  "priceRange": "￥1,000〜￥2,999",
  "servesCuisine": ["Coffee", "Gluten-Free", "Cafe"],
  "amenityFeature": [
    {"@type": "LocationFeatureSpecification", "name": "Wi-Fi", "value": true},
    {"@type": "LocationFeatureSpecification", "name": "電源コンセント", "value": true},
    {"@type": "LocationFeatureSpecification", "name": "ペット同伴可", "value": true},
    {"@type": "LocationFeatureSpecification", "name": "バリアフリー", "value": true},
    {"@type": "LocationFeatureSpecification", "name": "テイクアウト", "value": true}
  ],
  "paymentAccepted": ["Cash", "Credit Card", "Electronic Money", "QR Code Payment"],
  "currenciesAccepted": "JPY",
  "sameAs": [
    "https://www.instagram.com/green.beanscoffee",
    "https://www.youtube.com/@greenbeanscoffee9",
    "https://tabelog.com/tokyo/A1309/A130901/13277423"
  ]
}
```

### 2. FAQPage（よくある質問）

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "グリーンビーンズコーヒーはどこにありますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "東京都渋谷区千駄ヶ谷3-30-1 RC APARTMENT 1階です。北参道駅から徒歩3分、千駄ヶ谷駅からは徒歩7分くらい。国立競技場や東京体育館の近く、ダガヤサンドウエリアにあります。ちなみに店名の看板がないので、初めて行くときは通り過ぎないように注意です。"
      }
    },
    {
      "@type": "Question",
      "name": "営業時間と定休日は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "営業時間は10:30〜20:00（ラストオーダー19:30）です。定休日は不定休なので、行く前にInstagram（@green.beanscoffee）でチェックしておくのがおすすめです。"
      }
    },
    {
      "@type": "Question",
      "name": "予約はできますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "はい、できます。Instagram DMや電話（03-6447-0681）で予約できるほか、食べログやホットペッパーからも予約可能です。"
      }
    },
    {
      "@type": "Question",
      "name": "ペットを連れて行っても大丈夫ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "大丈夫です！GBCはペットフレンドリーなカフェで、わんちゃんと一緒に店内で過ごせます。私が行くときもペット連れのお客さんをよく見かけます。ペット撮影会イベントも開催されているくらいなので、安心して連れて行けそうですね。"
      }
    },
    {
      "@type": "Question",
      "name": "子ども連れでも入れますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "はい、大丈夫です。ベビーカーでの入店もOKとのこと。実際に子ども連れのファミリーも見かけます。"
      }
    },
    {
      "@type": "Question",
      "name": "グルテンフリーのメニューはありますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "あります。私自身グルテンフリー生活をしているので、これは本当にありがたいポイント。米粉を使った自家製フォカッチャやグルテンフリーのスイーツがあります。予約のときに伝えておけば、コース料理でも対応してもらえます。"
      }
    },
    {
      "@type": "Question",
      "name": "おすすめメニューは何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "私のおすすめはハンドドリップコーヒー。バリスタさんにその日の気分を伝えるとぴったりの一杯を選んでくれます。フードならグルテンフリーワンプレートランチがおすすめ。米粉の自家製フォカッチャとサラダ付きで、メイン、サイドディッシュ、メインのソースを選べます。ワンプレートを注文したら、ドリンクメニューが半額で注文できるのもうれしい。"
      }
    },
    {
      "@type": "Question",
      "name": "コーヒー豆は買えますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "買えます。お店で飲んで気に入った豆をそのまま購入できます。毎日飲む人は毎月届く定期便サービスもあります。"
      }
    },
    {
      "@type": "Question",
      "name": "Wi-Fiや電源はありますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "両方あります。電源完備で無料でWi-Fiも使えるので、ノートPC持ち込みで作業している人も見かけます。カウンター席でもテーブル席でも全ての席で電源が使えます。"
      }
    },
    {
      "@type": "Question",
      "name": "一人でも入りやすいですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "はい。私も一人で行くことがありますが、カウンター席もあるし落ち着いた雰囲気なので居心地いいですよ。"
      }
    },
    {
      "@type": "Question",
      "name": "デートで使えますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "はい。むしろデートにおすすめ。実際にカップルで来ている人もよく見かけます。GBCを選んだら女性が喜ぶこと間違いなし。落ち着いた雰囲気でおしゃれ＆静か。コーヒーのいい香りに癒されて、いい雰囲気でお話ができるでしょう。"
      }
    },
    {
      "@type": "Question",
      "name": "焙煎体験イベントは予約が必要ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "はい。開催日程はInstagramで告知されるので、参加したい人はチェックしておくといいですよ。スタッフさんに直接聞くかDMで申し込みとのことです。"
      }
    },
    {
      "@type": "Question",
      "name": "貸切はできますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "貸切対応可能です。私も実際に貸切の忘年会に参加しました。着席で最大20名、立食で30名くらいまで対応可能とのこと。予約は3ヶ月前から2週間前まで受け付けているそうです。夜は照明が落ち着いた雰囲気になって、大人な空間になります。"
      }
    },
    {
      "@type": "Question",
      "name": "支払い方法は何が使えますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "現金、クレジットカード（VISA、Master、JCBなど）、Suicaなどの電子マネー、PayPayなどのQR決済、いろいろ使えます。"
      }
    },
    {
      "@type": "Question",
      "name": "テイクアウトはできますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "できます。コーヒーやフォカッチャなどをテイクアウトして、ダガヤサンドウをお散歩しながら楽しむのもいいですよ。"
      }
    }
  ]
}
```

### 3. WebSite（サイト情報）

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Green Beans Coffee アンバサダーサイト",
  "url": "https://[サイトURL]",
  "description": "北参道・千駄ヶ谷のペットフレンドリー自家焙煎カフェ「Green Beans Coffee」のアンバサダーサイト",
  "author": {
    "@type": "Person",
    "name": "Kikumi"
  },
  "about": {
    "@type": "CafeOrCoffeeShop",
    "name": "Green Beans Coffee"
  }
}
```

---

## Googleマップ埋め込みコード

```html
<iframe 
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.5!2d139.7052597!3d35.6775167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188d4404ef151f%3A0x85142d57557d0f87!2z44Kw44Oq44O844Oz44OT44O844Oz44K644Kz44O844OS44O8!5e0!3m2!1sja!2sjp!4v1234567890"
  width="100%" 
  height="400" 
  style="border:0;" 
  allowfullscreen="" 
  loading="lazy" 
  referrerpolicy="no-referrer-when-downgrade">
</iframe>
```

---

## Instagram埋め込み

Experienceセクションでリール動画を埋め込む場合:

```html
<blockquote 
  class="instagram-media" 
  data-instgrm-permalink="https://www.instagram.com/reel/[リールID]/"
  data-instgrm-version="14">
</blockquote>
<script async src="//www.instagram.com/embed.js"></script>
```

---

## アクセシビリティ要件

- 適切なalt属性（すべての画像）
- フォーカス可能な要素のアウトライン
- 適切な見出し階層（h1 → h2 → h3）
- コントラスト比 4.5:1 以上
- キーボードナビゲーション対応

---

## SEO/AEO チェックリスト

### 必須
- [ ] title タグ設定
- [ ] meta description 設定
- [ ] meta keywords 設定（AEO用）
- [ ] OGP設定（og:title, og:description, og:image）
- [ ] canonical URL 設定
- [ ] JSON-LD構造化データ（LocalBusiness）
- [ ] JSON-LD構造化データ（FAQPage）
- [ ] 画像のalt属性

### 推奨
- [ ] サイトマップ（sitemap.xml）
- [ ] robots.txt
- [ ] ファビコン各サイズ
- [ ] Apple Touch Icon

---

## 更新運用メモ

### GBCマガジン更新手順（毎月）
1. 最新号のPDFを画像に変換（1ページ1枚）
   - 推奨サイズ: 幅800px程度
   - フォーマット: JPG または WebP
2. `public/assets/images/` に保存
   - 命名規則: `GBCMagagine_YYYYMM.jpg`
   - 例: `GBCMagagine_202601.jpg`（2026年1月号）
3. `index.html` のマガジンセクションを更新
4. バックナンバーに前月号を追加（最大6号保持）

### 将来の拡張
- Substack/noteでのマガジン記事化
- サイトからのリンク追加
