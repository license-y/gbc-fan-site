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
  "店内": "interior",
  "ダガヤサンドウ": "dagayasando",
};

export default function (eleventyConfig) {
  eleventyConfig.addFilter("tagSlug", (tag) => TAG_SLUGS[tag] || tag);
  eleventyConfig.addGlobalData("tagSlugs", TAG_SLUGS);
  // src/articles/assets/ 以下の静的ファイルをそのまま出力先にコピー
  eleventyConfig.addPassthroughCopy("src/articles/assets");

  // タグページ（カテゴリ一覧）の自動生成
  eleventyConfig.addCollection("tagList", function (collectionApi) {
    const tagSet = new Set();
    collectionApi.getAll().forEach((item) => {
      (item.data.tags || []).forEach((tag) => {
        if (tag !== "articles") tagSet.add(tag);
      });
    });
    return [...tagSet].sort();
  });

  // カテゴリ別記事一覧コレクション
  eleventyConfig.addCollection("articles", function (collectionApi) {
    return collectionApi
      .getFilteredByTag("articles")
      .sort((a, b) => b.date - a.date);
  });

  // 日付フォーマットフィルター（例: 2026年5月7日）
  eleventyConfig.addFilter("dateJa", function (date) {
    const d = new Date(date);
    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
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
