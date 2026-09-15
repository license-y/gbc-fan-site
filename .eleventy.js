import { createRequire } from "module";
const require = createRequire(import.meta.url);

const TAG_SLUGS = {
  "コーヒー": "coffee",
  "焙煎": "roasting",
  "グルテンフリー": "gluten-free",
  "体験・イベント": "events",
  "ペット": "pet",
  "美容健康": "beauty-health",
  "ビジネス": "business",
  "サードプレイス": "third-place",
  "カフェ店内": "cafe-interior",
  "ダガヤサンドウ": "dagayasando",
};

// カテゴリ一覧ページ（tags/index.njk）用の個別description（100〜120字、カテゴリごとに内容を変えて重複コンテンツを回避）
const TAG_DESCRIPTIONS = {
  "コーヒー": "東京・渋谷区北参道のGreen Beans Coffeeで味わう自家焙煎スペシャルティコーヒーにまつわる記事一覧です。豆の産地や抽出方法、季節ごとの一杯選びをアンバサダーKikumiが北参道駅徒歩3分の店内からお届けします。",
  "焙煎": "東京・北参道のGreen Beans Coffeeで参加した焙煎体験にまつわる記事一覧です。生豆の選別から焙煎機の仕組み、浅煎り・中煎り・深煎りの違いや豆の保存方法まで、体験を通じて学んだことをお届けします。",
  "グルテンフリー": "東京・千駄ヶ谷のGreen Beans Coffeeで味わうグルテンフリーメニューにまつわる記事一覧です。米粉フォカッチャや旬の夏野菜を使ったランチなど、渋谷区で楽しめる腸と美容に優しい食事習慣を紹介します。",
  "体験・イベント": "東京・北参道のGreen Beans Coffeeで毎月開催されるハンドドリップ・焙煎体験にまつわる記事一覧です。参加したイベントの様子や豆選びのコツ、オリジナルブレンド作りをアンバサダーKikumiがレポートします。",
  "ペット": "東京・千駄ヶ谷のペット同伴カフェGreen Beans Coffeeにまつわる記事一覧です。愛犬とのカフェ時間や入店マナー、複数頭でのマナー、チェキ撮影の体験談を渋谷区のペットフレンドリー視点でお届けします。",
  "美容健康": "東京・北参道のGreen Beans Coffeeで学んだコーヒーと美容健康の関係にまつわる記事一覧です。クロロゲン酸やグルテンフリー食、ブラックコーヒー習慣から始める体にやさしい生活法を紹介します。",
  "ビジネス": "東京・渋谷区千駄ヶ谷のビジネスカフェGreen Beans Coffeeにまつわる記事一覧です。打ち合わせやオンライン会議、朝活ミーティング、商談やおもてなしでの活用法を新宿エリアで働く方にもお届けします。",
  "サードプレイス": "東京・渋谷区ダガヤサンドウのサードプレイスGreen Beans Coffeeにまつわる記事一覧です。仕事や読書、ひとり時間、フリーランスの作業を過ごす第3の居場所としての魅力を3年通った視点で紹介します。",
  "カフェ店内": "東京・ダガヤサンドウのGreen Beans Coffee店内の様子にまつわる記事一覧です。焙煎機のある空間やカウンター席、トイレのアメニティまで、居心地のよさを支える店内のこだわりを詳しくお届けします。",
  "ダガヤサンドウ": "東京・渋谷区の隠れたカフェエリア、ダガヤサンドウにまつわる記事一覧です。Green Beans Coffeeを起点に鳩森八幡神社や国立競技場、明治神宮外苑周辺を歩いた散策記をアンバサダーKikumiが紹介します。",
};

export default function (eleventyConfig) {
  eleventyConfig.addFilter("tagSlug", (tag) => TAG_SLUGS[tag] || tag);

  // 関連記事取得フィルター（タグ一致数が多い順、最大3件）
  eleventyConfig.addFilter("relatedPosts", (collection, currentUrl, currentTags) => {
    const tags = (currentTags || []).filter(t => t !== "articles");
    return collection
      .filter(p => p.url !== currentUrl)
      .map(p => {
        const pTags = (p.data.tags || []).filter(t => t !== "articles");
        const score = pTags.filter(t => tags.includes(t)).length;
        return { post: p, score };
      })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score || b.post.date - a.post.date)
      .slice(0, 3)
      .map(({ post }) => post);
  });

  // 前後記事取得フィルター（コレクションは日付降順）
  eleventyConfig.addFilter("prevPost", (collection, currentUrl) => {
    const idx = collection.findIndex(p => p.url === currentUrl);
    return idx < collection.length - 1 ? collection[idx + 1] : null;
  });
  eleventyConfig.addFilter("nextPost", (collection, currentUrl) => {
    const idx = collection.findIndex(p => p.url === currentUrl);
    return idx > 0 ? collection[idx - 1] : null;
  });
  eleventyConfig.addGlobalData("tagSlugs", TAG_SLUGS);
  eleventyConfig.addGlobalData("tagDescriptions", TAG_DESCRIPTIONS);
  // src/articles/assets/ 以下の静的ファイルをそのまま出力先にコピー
  eleventyConfig.addPassthroughCopy("src/articles/assets");

  // タグページ（カテゴリ一覧）の自動生成
  eleventyConfig.addCollection("tagList", function (collectionApi) {
    const TAG_ORDER = ["コーヒー","焙煎","グルテンフリー","体験・イベント","ペット","美容健康","ビジネス","サードプレイス","カフェ店内","ダガヤサンドウ"];
    const tagSet = new Set();
    collectionApi.getAll().forEach((item) => {
      (item.data.tags || []).forEach((tag) => {
        if (tag !== "articles") tagSet.add(tag);
      });
    });
    return [...tagSet].sort((a, b) => {
      const ai = TAG_ORDER.indexOf(a);
      const bi = TAG_ORDER.indexOf(b);
      return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
    });
  });

  // カテゴリ別記事一覧コレクション
  eleventyConfig.addCollection("articles", function (collectionApi) {
    return collectionApi
      .getFilteredByTag("articles")
      .sort((a, b) => b.date - a.date);
  });

  // ピラー記事（定義・解説ガイド）コレクション
  eleventyConfig.addCollection("pillars", function (collectionApi) {
    return collectionApi
      .getFilteredByTag("articles")
      .filter(p => p.data.pillar === true)
      .sort((a, b) => b.date - a.date);
  });

  // 日付フォーマットフィルター（例: 2026年5月7日）- JST基準
  eleventyConfig.addFilter("dateJa", function (date) {
    const d = new Date(date);
    const jst = new Date(d.toLocaleString('en-US', { timeZone: 'Asia/Tokyo' }));
    return `${jst.getFullYear()}年${jst.getMonth() + 1}月${jst.getDate()}日`;
  });

  // ISO 8601 日付フィルター（例: 2026-05-07）- JST基準
  eleventyConfig.addFilter("dateISO", function (date) {
    const d = new Date(date);
    const jst = new Date(d.toLocaleString('en-US', { timeZone: 'Asia/Tokyo' }));
    const y = jst.getFullYear();
    const m = String(jst.getMonth() + 1).padStart(2, '0');
    const day = String(jst.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  });

  // RSS用：RFC 2822形式の日付フィルター
  eleventyConfig.addFilter("dateToRfc2822", function (date) {
    return new Date(date).toUTCString();
  });

  // 配列の先頭N件を返すフィルター
  eleventyConfig.addFilter("head", function (array, n) {
    return array.slice(0, n);
  });

  // RSS用：HTMLタグを除去して本文冒頭250字を返すフィルター
  eleventyConfig.addFilter("rssExcerpt", function (content) {
    if (!content) return '';
    const text = content.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    if (text.length <= 250) return text;
    return text.slice(0, 250).replace(/[、。！？\s]+$/, '') + '…';
  });

  // FAQPage Schema用：HTMLからQ&Aペアを抽出
  eleventyConfig.addFilter("extractFAQ", function (content) {
    if (!content) return [];
    const items = [];
    const regex = /<strong>(Q\.[^<]+)<\/strong><br\s*\/?>([\s\S]*?)<\/p>/gi;
    let match;
    while ((match = regex.exec(content)) !== null) {
      const q = match[1].trim();
      const a = match[2].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
      if (q && a) items.push({ q, a });
    }
    return items;
  });

  return {
    dir: {
      input: "src",
      output: "public",
      layouts: "_layouts",
      includes: "_includes",
      data: "_data",
    },
    templateFormats: ["njk", "md", "html", "11ty.js"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
