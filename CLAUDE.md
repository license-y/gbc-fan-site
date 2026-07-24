# プロジェクトの名前
アンバサダー Kikumiによるグリーンビーンズコーヒーのファンサイト

## プロジェクト概要

- 非エンジニア、非デザイナーが、AI Agent (Claude Code)を使ってWebサイトを構築する
- **AEO（Answer Engine Optimization）対策を最優先**とする

## サイト基本情報

- **タイトル**: Green Beans Coffee
- **サブタイトル**: 店名看板のないペットフレンドリーカフェ
- **アンバサダー**: Kikumi（Heroセクション右下に「GBCアンバサダー Kikumi」と表示）

### 用語統一
- 「**店名看板のないカフェ**」で統一すること。「看板のないカフェ」は誤り。
- 「**新宿から10分ほど**」で統一すること。「新宿から電車で10分ほど」は誤り（「電車で」は不要）。
- 「**千駄ヶ谷駅徒歩7分**」で統一すること。「徒歩5分」「徒歩圏内」は誤り。北参道駅は「徒歩3分」で統一。
  - ⚠️ この表記ルールは **GBCへのアクセス（最寄り駅からの徒歩時間）** にのみ適用する。国立競技場・鳩森八幡神社・明治神宮など **周辺スポットへの距離**は対象外（「鳩森八幡神社まで徒歩5分」等はOK）。
- **ダガヤサンドウの方位**（GBC・北参道駅基準）：北側＝代々木・新宿、北東側＝新宿御苑・東京体育館、東側＝国立競技場、南東側＝外苑前・青山、南側＝原宿・渋谷、南西側＝明治神宮・代々木公園。「国立競技場・東京体育館が北側」「外苑前・青山が東側」「明治神宮・代々木公園が西側」「代々木・新宿が北西側」は誤り。
- **GBC体験イベントは2種類**：「ハンドドリップ体験」と「焙煎体験（オリジナルブレンド焙煎含む）」。「焙煎体験」と「オリジナルブレンド焙煎体験」は同じイベント。「3種類」と書かないこと。


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

### ⚠️ ブランチ戦略（必須）

**基本方針:**

- **メインサイトとペットサイトは両方とも `main` ブランチで管理**
- 日常的な更新（FAQ追加、コンテンツ更新、画像差し替え等）は直接 `main` ブランチで実施
- 大きな機能追加や実験的な変更のみ、短期的なフィーチャーブランチを使用
  - 例: 新しいセクション追加、大規模リニューアル、デザイン変更等
  - 完成したらすぐに `main` にマージしてブランチを削除

**作業時の注意:**

1. **変更前の確認** → `git status` で未コミットの変更があるか確認
2. **ユーザーの手動編集を尊重** → ユーザーが直接ファイルを編集している可能性を常に考慮
3. **フィーチャーブランチを使う場合** → 必要に応じて `git stash` で一時保存してからブランチを切り替え
4. **ブランチ切り替え時** → 変更が失われないよう、必ず stash または commit してから切り替えること

---

### 📌 タグ付けルール

**命名規則**: `YYYY.MM.パッチ番号` の形式（カレンダーバージョニング）

**例**:
```
2026.02.0 - 2月号の初回リリース（1月最終週に作業）
2026.02.1 - 2月号への追加修正
2026.02.2 - 2月号への2回目の修正
```

**運用ルール**:
- タグの月番号は「対象コンテンツの月」を示す（実際の作業月ではない）
- GBCマガジンの月号更新など、翌月コンテンツを追加する場合は翌月のタグ番号を使う
- 同じ月のコンテンツに対する修正は、パッチ番号をインクリメント（例: 2026.02.0 → 2026.02.1）
- コンテンツと無関係な修正（FAQ誤字など）は、現在の月のタグを使う

**タグの移動**:
- タグを間違えた位置につけた場合は、削除して再作成できる
- コマンド例:
  ```bash
  git tag -d 2026.02.0
  git push origin :refs/tags/2026.02.0
  git tag -a 2026.02.0 -m "メッセージ"
  git push origin 2026.02.0
  ```

---


## 画像の取得

- ユーザーから画像が提供されない場合、適切と思われるものを取得する
- unsplash-image-finder を呼び出して、Unsplashの画像を検索し、その情報を使って設定する
- 記事用画像の詳細ルールは `.claude/skills/article-writing/SKILL.md` を参照

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

### レスポンシブデザイン原則

**テキストの配置ルール（2文以上のテキストブロック）:**

複数文で構成されるテキストブロック（リード文、説明文など）は、以下のルールに従う：

- **モバイル表示**: 改行なしで左寄せ（`text-left`）
- **デスクトップ表示**: 適切な位置で改行し中央寄せ（`md:text-center`）
- **実装方法**: `text-left md:text-center` + `<br class="hidden md:block">`

**適用例:**
```html
<p class="text-left md:text-center text-lg mb-16 max-w-3xl mx-auto">
  最初の文章。<br class="hidden md:block">次の文章。
</p>
```

**適用箇所:**
- 各セクションのリード文（導入文）
- 複数文で構成される説明文や紹介文
- その他、2文以上のテキストブロック

**重要**: このルールは一貫性を保つため、サイト全体で徹底すること。

---

# AEO対策 重要事項

## JSON-LD構造化データ（必須）

以下の構造化データを `<head>` 内または `</body>` 直前に設置:

1. **LocalBusiness (CafeOrCoffeeShop)**: 店舗情報
2. **FAQPage**: よくある質問（メインサイト: 28問、ペットサイト: ペット特化FAQ21問）
3. **WebSite**: サイト情報

詳細は `project-docs/technical-spec.md` を参照。

### AggregateRating の更新ルール
- `ratingValue` と `reviewCount` はGoogleマップの最新値に更新する
- 目安：月1回（口コミが増えやすい時期に確認）
- **更新は必ず `npm run update-reviews -- <reviewCount> [ratingValue]` を使うこと**（例: `npm run update-reviews -- 540 4.7`）。`public/index.html`・`public/pets/index.html`・`public/en/index.html`（英語版）・記事テンプレート2ファイル（`src/_layouts/article.njk`／`articles-base.njk`）と、各ファイルのHTMLコメント `最終更新: YYYY-MM` を一括で更新する。対象ファイルの一覧は `scripts/review-locations.config.js` で管理している
- 個別ファイルを手で書き換えないこと（更新漏れの原因になるため）。ファイルが増えた場合は `review-locations.config.js` にエントリを追記する
- ⚠️ **サイトの言語・地域バリエーション（`/en/` など）にも同じ表示があれば必ず対象に含めること**。2026-07に `public/en/index.html` が対象一覧から漏れていて反映漏れが発生した実例がある。新しいサブサイト・言語版ページを追加したときは、レビュー件数・評価を表示している箇所がないか確認し、あれば同時に `review-locations.config.js` へ追記する
- `npm run build` 実行時に `scripts/check-review-consistency.js` が自動で全ファイルの値の食い違いを検知し、あれば警告を出す（ビルド自体は止めない）。手動で `npm run check-reviews` を実行しても確認できる

### VideoObject スキーマ（YouTube動画）
- `inLanguage: "ja"` を必ず含めること（2026-06に全動画へ追加済み）
- 必須フィールド: `name` / `description` / `thumbnailUrl` / `uploadDate` / `embedUrl` / `contentUrl` / `inLanguage` / `publisher`
- 新しいYouTube動画を追加する際は既存のVideoObjectと同じ構造で追記すること

### EventSeries スキーマ（体験イベント）
- `inLanguage: "ja"` と `offers`（予約リンク）を必ず含めること（2026-06に追加済み）
- `offers.url` は公式Instagram（`https://www.instagram.com/green.beanscoffee`）を指定
- 新しいイベントを追加する際は既存のEventSeriesと同じ構造で追記すること

### Schema.org バージョン運用方針
- `"@context": "https://schema.org"` の形式（バージョン番号なし）が最新の推奨形式
- Googleは常に最新の schema.org 仕様を参照するため、バージョンを固定する必要はない
- 変更不要。現状維持すること

## メタタグ・OGP実装ルール（必須）

### favicon
- パスは必ず**絶対パス** `/favicon.png` で記述する
- 相対パス `favicon.png` はサブディレクトリ（`/pets/` 等）で読み込まれないため使用禁止

### twitter:description と og:description
- 両者は**必ず同一の内容**にすること。別の文章を書かない
- `twitter:description` だけ独自の文章にすると一貫性が崩れてSNS共有時に混乱が生じる
- **og:description・twitter:description も 100〜120字厳守**（name="description" と同じ基準）
  - `name="description"` を長めに書いても `og:description` だけ短いケースが発生しやすい → 3つすべてを確認すること
  - ⚠️ 過去に `og:description` が60字のまま放置された事例あり（2026年6月修正）
- 記事ページのメタタグ詳細（og:type / description字数 / Speakable / author）は `.claude/skills/article-writing/SKILL.md` を参照

## FAQセクション

- アコーディオン形式で実装
- **メインサイト**: 基本Q&Aを掲載（2026-07時点で28問）
- **ペットサイト**: ペット特化FAQを掲載（2026-07時点で21問、メインサイトとは独立）
- 問題数は増減するため固定値として扱わない。正確な件数を確認する場合は各ファイルで `grep -c '"@type": "Question"' public/index.html`（ペットサイトは `public/pets/index.html`）を実行する
- JSON-LD FAQPage と連動

## コンテンツの書き方

- 自然で人間味のある文章（AIが引用しやすい）
- 具体的な情報を明記（住所、電話番号、営業時間など）
- 「北参道」「千駄ヶ谷」「ダガヤサンドウ」などの地域名を自然に含める
- ペットフレンドリー、グルテンフリー、コーヒー専門店などのキーワードを含める
- 記事には「東京カフェ」「スペシャルティコーヒー」も文脈に合う範囲で自然に含める

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

## メインサイトとの違い

| 項目 | メインサイト | ペットサイト |
|------|-------------|-------------|
| アンバサダー | Kikumi | pome_ponkun |
| Menuセクション | あり | なし（メインへリンク） |
| GBC Magazine | あり | なし |
| Pet Friendly | Experienceに含む | 独立セクション |
| Cheki Booth | なし | あり |
| FAQ | 基本FAQ（2026-07時点28問） | ペット特化FAQ（2026-07時点21問・独立） |

## 基本情報の同期ルール

両サイトで同一に保つ情報（更新時は**両方を同時に更新**すること）:

- 営業時間・定休日
- 住所・電話番号
- Googleマップ埋め込み
- 公式SNSリンク
- 支払い方法

**注記**: FAQは各サイトで独立しています。メインサイトは基本FAQ、ペットサイトはペット特化FAQを掲載します。

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
- Kitasando Reserve: https://kitasandoreserve.com/ja/


---

# GBC Articles（11ty 記事管理）

メインサイトに 11ty（Eleventy）を使った記事管理システムがある。`/articles/` 以下で動作し、記事ソースは `src/articles/*.md`。ナビの Articles リンクは `href="/articles/"` で記事一覧ページに直接遷移する。

## ⚠️ 記事作業は必ずSkillに従うこと

**記事の作成・編集・リライトを行うときは、必ず `.claude/skills/article-writing/SKILL.md`（article-writing Skill）を読み込んでその手順に従うこと。**

執筆前の確認（git pull・重複チェック・5つの質問）、カテゴリ、フロントマター、文体ガイドライン、SEO・AEO指針、ピラー記事戦略、内部リンクなどの必須ワークフローはすべてSkill側に定義されている。CLAUDE.mdだけを見て記事を書き始めてはいけない。

## サイトマップ

| ファイル | 管理 |
|---------|------|
| `public/sitemap.xml` | 手動（大きな変更時のみ更新） |
| `public/articles-sitemap.xml` | 自動（ビルド時に自動生成） |

Google Search Console に両方登録すること。
