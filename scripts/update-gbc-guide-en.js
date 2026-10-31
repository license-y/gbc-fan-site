import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ARTICLES_DIR = path.join(__dirname, '../src/en-articles');
const TARGET_FILE = path.join(__dirname, '../public/en/index.html');
const CARD_COUNT = 2;

function readFrontmatter(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.charCodeAt(0) === 0xFEFF) content = content.slice(1);
  content = content.replace(/\r\n/g, '\n');
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!fmMatch) return null;
  const fm = fmMatch[1];
  const isPillar = /^pillar:\s*true/m.test(fm);
  if (!isPillar) return null;
  const get = (key) => (fm.match(new RegExp(`^${key}:\\s*(.+)$`, 'm')) || [, ''])[1].trim().replace(/^"(.*)"$/, '$1');
  const date = get('date');
  const title = get('title');
  const description = get('description');
  const thumbnail = get('thumbnail');
  if (!date || !title || !thumbnail) return null;
  const slug = path.basename(filePath, '.md');
  const altShort = title.split('?')[0] + (title.includes('?') ? '?' : '');
  return { slug, date, title, description, thumbnail, altShort };
}

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function buildCardHtml(p) {
  return `          <a href="/en/articles/${p.slug}/" class="group flex flex-col bg-[#FDF8F0] rounded-xl border border-[#C9A86C] overflow-hidden hover:shadow-md transition-shadow duration-200">
            <div class="h-32 overflow-hidden">
              <img src="${p.thumbnail}" alt="${escapeHtml(p.altShort)}" class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300" loading="lazy" decoding="async">
            </div>
            <div class="p-4">
              <span class="text-xs bg-[#C9A86C] text-white rounded-full px-2.5 py-0.5 mb-2 inline-block">Guide</span>
              <h4 class="text-sm font-bold text-[#2D2A26] group-hover:text-[#4A3728] leading-snug mb-1">${escapeHtml(p.title)}</h4>
              <p class="text-xs text-[#8B7355] line-clamp-2 mt-1">${escapeHtml(p.description)}</p>
            </div>
          </a>`;
}

const files = fs.readdirSync(ARTICLES_DIR).filter(f => f.endsWith('.md'));
const pillars = files
  .map(f => readFrontmatter(path.join(ARTICLES_DIR, f)))
  .filter(Boolean)
  .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
  .slice(0, CARD_COUNT);

if (pillars.length === 0) {
  console.log('英語版ピラー記事が見つかりませんでした。GBC Guidesは更新しません。');
  process.exit(0);
}

const newBlock = pillars.map(buildCardHtml).join('\n');
const startMarker = '<!-- EN_GBC_GUIDE_CARDS_START（npm run build で自動更新。手動編集しないこと） -->';
const endMarker = '<!-- EN_GBC_GUIDE_CARDS_END -->';

const original = fs.readFileSync(TARGET_FILE, 'utf8');
const pattern = new RegExp(
  `${startMarker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[\\s\\S]*?${endMarker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`
);

if (!pattern.test(original)) {
  console.error('EN_GBC_GUIDE_CARDS マーカーが public/en/index.html に見つかりません。手動で確認してください。');
  process.exit(1);
}

const updated = original.replace(pattern, `${startMarker}\n${newBlock}\n          ${endMarker}`);

if (updated !== original) {
  fs.writeFileSync(TARGET_FILE, updated, 'utf8');
  console.log('✓ 英語版GBC Guidesを最新ピラー記事2件に更新しました:');
  pillars.forEach(p => console.log(`  - ${p.date} ${p.slug}`));
} else {
  console.log('  英語版GBC Guidesは既に最新です。');
}
