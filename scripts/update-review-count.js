import fs from 'fs';
import path from 'path';
import { targets, root } from './review-locations.config.js';

const [, , reviewCountArg, ratingValueArg] = process.argv;

if (!reviewCountArg) {
  console.error('使い方: npm run update-reviews -- <reviewCount> [ratingValue]');
  console.error('例:     npm run update-reviews -- 540 4.7');
  process.exit(1);
}

if (!/^\d+$/.test(reviewCountArg)) {
  console.error(`reviewCount は数値で指定してください（入力値: ${reviewCountArg}）`);
  process.exit(1);
}

if (ratingValueArg && !/^\d+(\.\d+)?$/.test(ratingValueArg)) {
  console.error(`ratingValue は数値で指定してください（入力値: ${ratingValueArg}）`);
  process.exit(1);
}

// 日本時間で "YYYY-MM"（HTMLコメントの最終更新日用）
const jstDate = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Tokyo' }));
const yyyymm = `${jstDate.getFullYear()}-${String(jstDate.getMonth() + 1).padStart(2, '0')}`;
const dateCommentRegex = /(最終更新: )\d{4}-\d{2}/;

let touchedFiles = 0;

for (const target of targets) {
  const filePath = path.join(root, target.file);
  if (!fs.existsSync(filePath)) {
    console.log(`スキップ（ファイルなし）: ${target.file}`);
    continue;
  }

  const original = fs.readFileSync(filePath, 'utf8');
  let content = original;

  for (const pattern of target.reviewCountPatterns) {
    content = content.replace(pattern, reviewCountArg);
  }

  if (ratingValueArg) {
    for (const pattern of target.ratingValuePatterns) {
      content = content.replace(pattern, ratingValueArg);
    }
  }

  if (dateCommentRegex.test(content)) {
    content = content.replace(dateCommentRegex, `$1${yyyymm}`);
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ 更新: ${target.file}`);
    touchedFiles++;
  } else {
    console.log(`  変更なし: ${target.file}`);
  }
}

console.log(`\nreviewCount を ${reviewCountArg} に更新しました（${touchedFiles}ファイル変更）。`);
if (ratingValueArg) {
  console.log(`ratingValue を ${ratingValueArg} に更新しました。`);
}
console.log('git diff で内容を確認し、問題なければコミットしてください。');
