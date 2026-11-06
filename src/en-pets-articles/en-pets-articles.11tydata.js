// draft: true の記事は permalink を false にして出力自体を止める（公開URL・Pagefindの対象から除外）。
// 本文が完成したら draft: true を削除（または false に変更）すれば通常どおり公開される。
export default {
  eleventyComputed: {
    permalink: (data) => (data.draft ? false : data.permalink),
  },
};
