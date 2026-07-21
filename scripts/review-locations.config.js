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
    file: 'public/index.html',
    reviewCountPatterns: [
      /\d+(?=件のレビュー)/g,
      /(?<="reviewCount":\s*")\d+/g,
    ],
    ratingValuePatterns: [
      /(?<="ratingValue":\s*")[\d.]+/g,
      /(?<=text-sm font-medium text-\[#4A3728\] whitespace-nowrap">)[\d.]+(?=<)/g,
    ],
  },
  {
    file: 'public/pets/index.html',
    reviewCountPatterns: [
      /(?<="reviewCount":\s*")\d+/g,
    ],
    ratingValuePatterns: [
      /(?<="ratingValue":\s*")[\d.]+/g,
    ],
  },
  {
    file: 'src/_layouts/article.njk',
    reviewCountPatterns: [
      /\d+(?=件のレビュー)/g,
    ],
    ratingValuePatterns: [
      /(?<=text-xs font-medium text-\[#4A3728\]">)[\d.]+(?=<)/g,
    ],
  },
  {
    file: 'src/_layouts/articles-base.njk',
    reviewCountPatterns: [
      /(?<="reviewCount":\s*")\d+/g,
    ],
    ratingValuePatterns: [
      /(?<="ratingValue":\s*")[\d.]+/g,
    ],
  },
  {
    file: 'public/en/index.html',
    reviewCountPatterns: [
      /\d+(?=\s*reviews)/g,
      /(?<="reviewCount":\s*")\d+/g,
    ],
    ratingValuePatterns: [
      /(?<=text-sm font-medium text-\[#4A3728\] whitespace-nowrap">)[\d.]+(?=<)/g,
      /(?<="ratingValue":\s*")[\d.]+/g,
    ],
  },
];
