export const data = {
  permalink: "/articles/articles.json",
  eleventyExcludeFromCollections: true,
};

export function render({ collections }) {
  const articles = (collections.articles || []).map((post) => {
    const tags = (post.data.tags || []).filter((t) => t !== "articles");
    const d = new Date(post.date);
    const dateJa = `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
    return {
      title: post.data.title || "",
      url: post.url,
      description: post.data.description || "",
      date: dateJa,
      thumbnail: post.data.thumbnail || "",
      tags,
    };
  });
  return JSON.stringify(articles, null, 2);
}
