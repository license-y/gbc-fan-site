# GBCペット専門11tyサイト｜作業引継ぎ記録

このファイルは、ペット専門11tyサイト（`/pets/articles/`・`/en/pets/`）プロジェクトの作業引継ぎ専用ドキュメント。日付ごとに記録を追記していく。既存の記録は上書き・削除せず、新しい日付のセクションを追加すること。

---

## 2026-11-06 作業終了時点の引継ぎ

### 1. プロジェクトの目的

GBCの日本語・英語・ペット専門11ty記事サイトを連携させ、SEO・AEOを強化する。

- Google検索／AI検索（ChatGPT等）での発見・引用・推薦機会の拡大
- 国内旅行者・インバウンド認知獲得
- ペット同伴カフェを探すユーザーへの情報提供
- 記念日・チェキ撮影・ランチなどの目的来店促進
- Googleマップ・予約・店舗ページへの誘導
- 広告非依存の資産型集客構築

基本戦略：「地域 × 業種 × 目的 × 体験 × 属性」。GBCは近隣カフェではなく、遠方からも目的来店されるブランド店を目指す。

### 2. サイト構成（2026-11-06時点）

既存記事：日本語125本／英語11本（変更なし、維持）

ペット専門コンテンツ：

**日本語**
- `/pets/`
- `/pets/articles/`
- `/pets/articles/dog-birthday-cafe-kitasando/`
- `/pets/articles/cheki-anniversary-album-kitasando/`
- `/pets/articles/rescue-dog-adoption-anniversary-kitasando/`
- `/pets/articles/pet-anniversary-repeat-visit-kitasando/`

**英語**
- `/en/pets/`
- `/en/pets/articles/`
- `/en/pets/articles/dog-friendly-lunch-tokyo/`

**英語ドラフト（非公開・`draft: true`）**
- `dog-stroller-tokyo.md`
- `pet-photo-experience-tokyo.md`
- `tokyo-day-trip-with-dog.md`

公開URL・sitemap・Pagefind・記事一覧・公開ページ内部リンクのいずれにも出現しないよう制御済み。

### 3. GBCの正式なペット同伴ルール（確定情報）

**大型犬を含め、すべての犬種・サイズが店内同伴可能。**

英語表現: "Dogs of all breeds and sizes, including large dogs, are welcome inside Green Beans Coffee."

日本語・英語ペットハブで表現統一済み。ペットカートでの来店も可能。

**使用禁止の表現**（過去の誤情報。再度書かないこと）:
- 小型犬・中型犬のみ同伴可能
- 大型犬は原則不可
- 大型犬はサイズを理由に事前確認が必要

⚠️ 未確認の犬用フード・サービス・料金・予約条件などを推測で追加しないこと。

### 4. 完了済み作業

**サイト構築**
- 日本語ペット専門記事4本
- 英語ペットハブ・記事一覧
- 英語ランチ記事1本
- 英語ドラフト3本の非公開制御（`eleventyComputed.permalink`方式）
- 既存記事からの関連内部リンク

**写真**
- ストック写真 → 実際のGBC店内写真に差し替え
- JA/EN ペットハブの写真確認
- alt属性を実際の写真内容に修正
- 保護犬記事：写真の犬を保護犬と断定しない表現に統一

**SEO・AEO**
- canonical / hreflang / sitemap / robots.txt / FAQ / JSON-LD / 内部リンク / Pagefind

**GA4**
- `click_store_page` / `click_reserve` / `click_instagram` / `click_map`
- ローカル環境で`window.dataLayer`への発火を確認済み（本番DebugView確認は未完了）

### 5. 最終検証結果（2026-11-06時点、次回再開時は再確認推奨）

- `npm run build`：成功
- 既存日本語記事125本／英語11本：URL維持
- 内部リンク・アセット確認：136件、エラー0
- JSON-LD：38ブロック、構文エラー0
- 英語FAQ：表示内容と構造化データ一致
- canonical・hreflang：正常
- モバイル390px：横スクロールなし
- GA4：ローカルイベント発火確認（本番受信は未確認）
- 英語ドラフト3本：非公開維持
- 大型犬の旧ルール表現：残存0件

### 6. Git状態（2026-11-06作業終了時点）

```
ブランチ: main
作業ツリー: クリーン
origin/main: 31ff87c
ローカルのみ（未プッシュ）のコミット3件（古い順）:
  27f38d8 Add pet-specialty 11ty site (/pets/articles/, /en/pets/) with 4 JA + hub-ready EN content
  1396679 Fix pet-site content accuracy and gate unfinished EN drafts before launch
  1021e95 Update pet policy copy to the official all-sizes rule (JA/EN)
```

GitHubへのプッシュ・本番公開は未実施。**ユーザーの明示的な承認があるまでプッシュ・デプロイしないこと。**

### 7. 明日以降の作業予定

**優先順位① 本番公開前の状態確認**（再開時に実施し、まず報告）
- Gitの状態／未プッシュのコミット／ビルド結果／公開対象URL／英語ドラフトの非公開状態／既存記事への影響

**優先順位② 本番公開**
- 上記確認後、ユーザーの明示的な承認があった場合のみプッシュ・本番公開
- 公開後：9ページの表示・HTTPステータス・写真・FAQ・リンク・canonical・hreflang・sitemap・robots.txtを確認

**優先順位③ GA4本番検証**
- 本番公開後、GA4 DebugViewで実際のイベント受信を確認（ローカルdataLayer確認とは区別する）

**優先順位④ 英語記事制作**（本番公開・計測確認完了後）
1. Pet Photo Experiences
2. Dog Stroller
3. Tokyo Day Trip with Dog

各記事：ネイティブ英語、SEO・AEO、FAQ、実際の店舗情報、目的来店導線を重視。未完成記事は引き続き非公開。

### 8. 次回再開時のルール

- まずこの引継ぎ内容とGitの現在状態を照合する
- 完了済み作業を重複して行わない
- 既存記事125本・11本のURL、デザイン、GA4イベント、構造化データ、写真、公開制御を維持する
- 作業開始前に以下を簡潔に報告する：
  1. 現在のGit状態
  2. 本番公開の有無
  3. 完了済み作業
  4. 未完了作業
  5. 次に実施する推奨作業
- ユーザーの承認を得てから作業を開始する

---

## 2026-11-07｜制作・公開フェーズ完了

本セクションをもって、英語ペット専門サイトの**制作・公開フェーズを正式に完了**とする。2026-11-06時点の記録（上記）は履歴として維持し、本セクションが最新状況。

### 1. 公開済み記事（4本すべて公開済み）

1. `/en/pets/articles/dog-friendly-lunch-tokyo/`
2. `/en/pets/articles/pet-photo-experience-tokyo/`（Cheki記事）
3. `/en/pets/articles/dog-stroller-tokyo/`
4. `/en/pets/articles/tokyo-day-trip-with-dog/`

4記事とも `draft: true` は設定されていない（frontmatter確認済み）。2026-11-06時点の記録にある「英語ドラフト（非公開）」という記載は**本セクション時点でもう当てはまらない**。

### 2. 英語ペットハブ（`https://greenbeanscoffeeambassador.com/en/pets/`）

`public/en/pets/index.html` に以下を実装済み：

- 「Explore Dog-Friendly Experiences in Tokyo」セクションを追加
- 4記事すべてへの直接リンク（実写真付きの記事カード形式）
- 「See all pet articles」で記事一覧（`/en/pets/articles/`）への導線
- セクション内リンク計5件（記事カード4件＋See all 1件）

### 3. チェキ記事（`pet-photo-experience-tokyo.md`）

- `thumbnail` を `cheki-photo-booth-four-dogs-kitasando.jpg` に設定 → OG/Twitter画像（`og:image`／`twitter:image`）もレイアウト側で自動的に同画像を参照するよう連動済み
- FAQ 7問（Q&A形式、JSON-LD FAQPageと連動）
- 店内展示写真を維持（`cheki-1.jpg`、`dogs-wood-floor-interior-kitasando.jpg`）
- 「チェキ写真は持ち帰り不可（展示専用）」という説明を維持

### 4. SEO・AEO（4記事共通、レイアウト側で実装済み）

- `title` / `description`
- `canonical` / `hreflang`（en・x-default・ja alternate）
- `BreadcrumbList` / `BlogPosting` / `FAQPage`（JSON-LD）
- 内部リンク（記事間相互リンク・ハブへの導線）
- サイトマップ（`articles-sitemap.xml`、ビルド時自動生成）
- 実写真（ストック画像なし、全記事実写真使用）

いずれも `en-pets-articles-base.njk` / `en-pets-article.njk` の共通レイアウトに実装されており、4記事すべてに適用される。

### 5. GA4

**既存イベント**（変更なし）：
- `click_store_page` / `click_reserve` / `click_instagram` / `click_map`

**追加イベント**：
- `click_pet_article`（`data-ga-location="explore_cards"`）
- 英語ペットハブの「Explore」セクション内5リンク（記事カード4件＋See all 1件）に設定済み（`public/en/pets/index.html` で確認済み）

⚠️ **GA4 DebugViewでの実受信確認は未完了**。ローカルdataLayer発火の確認は過去セクション参照だが、本イベント（`click_pet_article`）は未確認。

### 6. Git

- 最終公開コミット：`d6709b4`（Improve English pet hub and Cheki article thumbnail）
- `origin/main` へのプッシュ・本番反映は完了済み（`git fetch` で確認、ローカルとリモートが一致）

### 7. 次回の残課題（2026-11-07時点、過去の完了項目は除外済み）

1. GA4 DebugViewで `click_pet_article` の実受信確認
2. モバイル375px・390px・430pxでの実画面確認
3. Google Search Consoleのインデックス状況・検索実績の確認
4. 次回の記事追加は、上記の検索データを参考にしてから判断する（新規記事の即時追加は行わない）

**次回再開時はGA4・Search Consoleの効果測定から開始する。新たな記事制作・サイト改修は行わない。**
