export const data = {
  permalink: "/en/articles/articles.json",
  eleventyExcludeFromCollections: true,
};

export function render({ collections }) {
  const articles = (collections.enArticles || []).map((post) => {
    const tags = (post.data.tags || []).filter((t) => t !== "en-articles");
    const d = new Date(post.date);
    const dateEn = d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Tokyo' });
    return {
      title: post.data.title || "",
      url: post.url,
      description: post.data.description || "",
      date: dateEn,
      thumbnail: post.data.thumbnail || "",
      tags,
    };
  });
  return JSON.stringify(articles, null, 2);
}
