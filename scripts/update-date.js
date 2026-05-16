import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 日本時間（JST）で現在日付を取得
const jstDate = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Tokyo' }));
const year = jstDate.getFullYear();
const month = jstDate.getMonth() + 1;
const day = jstDate.getDate();
const dateStr = `${year}年${month}月${day}日`;

const targets = [
  path.join(__dirname, '../public/index.html'),
];

for (const file of targets) {
  if (!fs.existsSync(file)) {
    console.log(`スキップ（ファイルなし）: ${file}`);
    continue;
  }
  const content = fs.readFileSync(file, 'utf8');
  const updated = content.replace(/最終更新日：\d{4}年\d{1,2}月\d{1,2}日/g, `最終更新日：${dateStr}`);
  if (content !== updated) {
    fs.writeFileSync(file, updated, 'utf8');
    console.log(`✓ 最終更新日を更新: ${dateStr}`);
  } else {
    console.log(`  最終更新日は既に最新: ${dateStr}`);
  }
}
