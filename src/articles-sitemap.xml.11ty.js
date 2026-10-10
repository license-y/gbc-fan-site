export const data = {
  permalink: "/articles-sitemap.xml",
  eleventyExcludeFromCollections: true,
};

// .eleventy.js の TAG_SLUGS と同じ対応表（タグ名→スラッグ）
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

export function render({ collections }) {
  const base = "https://greenbeanscoffeeambassador.com";
  const today = new Date().toISOString().split("T")[0];

  const articleEntries = (collections.articles || []).map((post) => {
    const lastmod = new Date(post.data.updated || post.date).toISOString().split("T")[0];
    return `  <url>
    <loc>${base}${post.url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
  });

  const tagEntries = (collections.tagList || []).map((tag) => {
    const slug = TAG_SLUGS[tag] || tag;
    return `  <url>
    <loc>${base}/articles/tags/${slug}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- 記事一覧ページ -->
  <url>
    <loc>${base}/articles/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- カテゴリ別タグページ（11tyビルド時に自動生成） -->
${tagEntries.join("\n")}

  <!-- 個別記事（11tyビルド時に自動生成） -->
${articleEntries.join("\n")}
</urlset>`;
}
