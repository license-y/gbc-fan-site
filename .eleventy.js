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
