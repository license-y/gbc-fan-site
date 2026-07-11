import fs from 'fs';
import path from 'path';
import { targets, root } from './review-locations.config.js';

const reviewCounts = new Set();
const ratingValues = new Set();
const missingFiles = [];

for (const target of targets) {
  const filePath = path.join(root, target.file);
  if (!fs.existsSync(filePath)) {
    missingFiles.push(target.file);
    continue;
  }

  const content = fs.readFileSync(filePath, 'utf8');

  for (const pattern of target.reviewCountPatterns) {
    (content.match(pattern) || []).forEach((v) => reviewCounts.add(v));
  }
  for (const pattern of target.ratingValuePatterns) {
    (content.match(pattern) || []).forEach((v) => ratingValues.add(v));
  }
}

let hasProblem = false;

if (missingFiles.length > 0) {
  console.warn(`⚠️  レビュー整合性チェック: ファイルが見つかりません → ${missingFiles.join(', ')}`);
}

if (reviewCounts.size > 1) {
  console.warn(`⚠️  reviewCount がファイル間で食い違っています: ${[...reviewCounts].join(' / ')}`);
  console.warn('   → npm run update-reviews -- <正しい件数> で統一してください');
  hasProblem = true;
}

if (ratingValues.size > 1) {
  console.warn(`⚠️  ratingValue がファイル間で食い違っています: ${[...ratingValues].join(' / ')}`);
  console.warn('   → npm run update-reviews -- <reviewCount> <正しい評価値> で統一してください');
  hasProblem = true;
}

if (!hasProblem && reviewCounts.size === 1) {
  console.log(`✓ レビュー件数の整合性チェックOK（${[...reviewCounts][0]}件 / 評価${[...ratingValues][0] || '-'}）`);
}
