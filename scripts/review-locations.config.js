import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Googleレビューの評価件数（reviewCount）・評価値（ratingValue）が
// 埋め込まれている全ファイルと、その正規表現パターン一覧。
// ファイルを追加した場合はここに1エントリ追記するだけで
// update-review-count.js / check-review-consistency.js の両方に反映される。
export const root = path.join(__dirname, '..');

export const targets = [
  {
    // 2026-11: Googleガイドラインに従い、JSON-LDのaggregateRatingは出力を停止。
    // ページ上の「Google評価」表示テキストのみを対象とする。
    file: 'public/index.html',
    reviewCountPatterns: [
      /\d+(?=件のレビュー)/g,
    ],
    ratingValuePatterns: [
      /(?<=text-sm font-medium text-\[#4A3728\] whitespace-nowrap">)[\d.]+(?=<)/g,
    ],
  },
  // 2026-11: public/pets/index.html はJSON-LDのaggregateRatingを削除（ページ上に評価の可視表示が元々無いため対象外）。
  {
    file: 'src/_layouts/article.njk',
    reviewCountPatterns: [
      /\d+(?=件のレビュー)/g,
    ],
    ratingValuePatterns: [
      /(?<=text-xs font-medium text-\[#4A3728\]">)[\d.]+(?=<)/g,
    ],
  },
  // 2026-11: src/_layouts/articles-base.njk は店舗情報(CafeOrCoffeeShop/aggregateRating)を削除したため対象外。
  {
    file: 'public/en/index.html',
    reviewCountPatterns: [
      /\d+(?=\s*reviews)/g,
    ],
    ratingValuePatterns: [
      /(?<=text-sm font-medium text-\[#4A3728\] whitespace-nowrap">)[\d.]+(?=<)/g,
    ],
  },
  {
    file: 'src/_layouts/en-article.njk',
    reviewCountPatterns: [
      /\d+(?=\s*reviews)/g,
    ],
    ratingValuePatterns: [
      /(?<=text-xs font-medium text-\[#4A3728\]">)[\d.]+(?=<)/g,
    ],
  },
  // 2026-11: src/_layouts/en-articles-base.njk も同様に店舗情報を削除したため対象外。
  {
    // 2026-11: ペット専門11tyサイトの記事テンプレート。article.njkと同じ表示構造。
    file: 'src/_layouts/pets-article.njk',
    reviewCountPatterns: [
      /\d+(?=件のレビュー)/g,
    ],
    ratingValuePatterns: [
      /(?<=text-xs font-medium text-\[#4A3728\]">)[\d.]+(?=<)/g,
    ],
  },
  {
    file: 'src/_layouts/en-pets-article.njk',
    reviewCountPatterns: [
      /\d+(?=\s*reviews)/g,
    ],
    ratingValuePatterns: [
      /(?<=text-xs font-medium text-\[#4A3728\]">)[\d.]+(?=<)/g,
    ],
  },
  // 2026-11: src/_layouts/pets-articles-base.njk / en-pets-articles-base.njk も店舗情報を削除したため対象外。
];
