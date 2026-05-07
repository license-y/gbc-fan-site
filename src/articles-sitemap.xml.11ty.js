export const data = {
  permalink: "/articles-sitemap.xml",
  eleventyExcludeFromCollections: true,
};

export function render({ collections }) {
  const base = "https://greenbeanscoffeeambassador.com";
  const today = new Date().toISOString().split("T")[0];

  const articleEntries = (collections.articles || []).map((post) => {
    const lastmod = new Date(post.date).toISOString().split("T")[0];
    return `  <url>
    <loc>${base}${post.url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
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

  <!-- 個別記事（11tyビルド時に自動生成） -->
${articleEntries.join("\n")}
</urlset>`;
}
