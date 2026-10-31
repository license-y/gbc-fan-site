export const data = {
  permalink: "/en-articles-sitemap.xml",
  eleventyExcludeFromCollections: true,
};

export function render({ collections }) {
  const base = "https://greenbeanscoffeeambassador.com";
  const today = new Date().toISOString().split("T")[0];

  const articleEntries = (collections.enArticles || []).map((post) => {
    const lastmod = new Date(post.data.updated || post.date).toISOString().split("T")[0];
    return `  <url>
    <loc>${base}${post.url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
  });

  const tagEntries = (collections.enTagList || []).map((tag) => {
    const slug = tag.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    return `  <url>
    <loc>${base}/en/articles/tags/${slug}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- 記事一覧ページ -->
  <url>
    <loc>${base}/en/articles/</loc>
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
