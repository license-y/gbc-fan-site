#!/usr/bin/env node
/**
 * 月次アップデート 画像処理スクリプト
 *
 * 使い方:
 *   1. inbox/ に新しいファイルを配置（Finderからドラッグ&ドロップ）
 *   2. ターミナルで実行: npm run update-images
 *
 * inbox/ に置けるファイル:
 *   inbox/magazine-latest.jpg        → マガジンローテーション後 magazine/latest.jpg に
 *   inbox/event-roasting.jpg         → events/event-roasting.jpg に
 *   inbox/event-handdrip.jpg         → events/event-handdrip.jpg に
 *   inbox/monthly-coffee/1.jpg       → monthly-coffee/1.jpg に
 *   inbox/monthly-coffee/2.jpg       → monthly-coffee/2.jpg に
 */

import { readFileSync, existsSync, renameSync, unlinkSync, copyFileSync, readdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const IMAGES = resolve(ROOT, 'public/assets/images');
const INBOX = resolve(ROOT, 'inbox');

// カラー出力
const C = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
  bold: '\x1b[1m',
};
const log = {
  ok: (msg) => console.log(`${C.green}✓${C.reset} ${msg}`),
  skip: (msg) => console.log(`${C.gray}－ ${msg}${C.reset}`),
  info: (msg) => console.log(`${C.cyan}ℹ ${msg}${C.reset}`),
  warn: (msg) => console.log(`${C.yellow}⚠ ${msg}${C.reset}`),
  error: (msg) => console.error(`${C.red}✗ ${msg}${C.reset}`),
  header: (msg) => console.log(`\n${C.bold}${msg}${C.reset}`),
};

// ファイルサイズを読みやすい形式に変換
function formatSize(bytes) {
  return `${Math.round(bytes / 1024)}KB`;
}

// TinyPNG で圧縮してコピー
async function compressAndCopy(srcPath, destPath, tinify) {
  const srcSize = readFileSync(srcPath).length;
  try {
    await tinify.fromFile(srcPath).toFile(destPath);
    const destSize = readFileSync(destPath).length;
    const reduction = Math.round((1 - destSize / srcSize) * 100);
    log.ok(`${srcPath.replace(ROOT + '/', '')} → ${destPath.replace(ROOT + '/', '')} (${formatSize(srcSize)} → ${formatSize(destSize)}, ${reduction}%削減)`);
  } catch (err) {
    log.error(`TinyPNG エラー: ${err.message}`);
    throw err;
  }
}

// TinyPNG なしで単純コピー
function simpleCopy(srcPath, destPath) {
  copyFileSync(srcPath, destPath);
  const size = readFileSync(destPath).length;
  log.ok(`${srcPath.replace(ROOT + '/', '')} → ${destPath.replace(ROOT + '/', '')} (${formatSize(size)}, 圧縮なし)`);
}

// マガジンローテーション
function rotateMagazine() {
  const magazineDir = resolve(IMAGES, 'magazine');
  const latestPath = resolve(magazineDir, 'latest.jpg');

  if (!existsSync(latestPath)) {
    log.warn('magazine/latest.jpg が見つかりません。ローテーションをスキップします。');
    return;
  }

  log.header('マガジンローテーション');

  // back-06.jpg を削除
  const back06 = resolve(magazineDir, 'back-06.jpg');
  if (existsSync(back06)) {
    unlinkSync(back06);
    log.info('magazine/back-06.jpg を削除しました（7ヶ月前の号）');
  }

  // 05→06, 04→05, 03→04, 02→03, 01→02
  for (let i = 5; i >= 1; i--) {
    const from = resolve(magazineDir, `back-0${i}.jpg`);
    const to = resolve(magazineDir, `back-0${i + 1}.jpg`);
    if (existsSync(from)) {
      renameSync(from, to);
      log.info(`magazine/back-0${i}.jpg → back-0${i + 1}.jpg`);
    }
  }

  // latest → back-01
  renameSync(latestPath, resolve(magazineDir, 'back-01.jpg'));
  log.info('magazine/latest.jpg → back-01.jpg');
}

// メイン処理
async function main() {
  console.log(`${C.bold}${C.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${C.reset}`);
  console.log(`${C.bold}  月次アップデート 画像処理スクリプト${C.reset}`);
  console.log(`${C.bold}${C.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${C.reset}`);

  // TinyPNG セットアップ
  let tinify = null;
  let apiKeyUsed = false;

  // .env.local から API キーを読み込み
  const envPath = resolve(ROOT, '.env.local');
  if (existsSync(envPath)) {
    const envContent = readFileSync(envPath, 'utf-8');
    const match = envContent.match(/^TINYPNG_API_KEY=(.+)$/m);
    if (match && match[1] && match[1] !== 'your_tinypng_api_key_here') {
      try {
        const tinifyModule = await import('tinify');
        tinify = tinifyModule.default;
        tinify.key = match[1].trim();
        // 接続確認
        await new Promise((res, rej) => {
          tinify.validate((err) => err ? rej(err) : res());
        });
        log.ok(`TinyPNG API 接続OK（今月残り: ${500 - tinify.compressionCount}回）`);
        apiKeyUsed = true;
      } catch (err) {
        log.warn(`TinyPNG API エラー: ${err.message}\n  → 圧縮なしでファイルのみ移動します`);
        tinify = null;
      }
    }
  }

  if (!apiKeyUsed) {
    log.warn('TinyPNG API キーが未設定です。圧縮なしでファイルを移動します。');
    log.info('.env.local に TINYPNG_API_KEY を追加すると自動圧縮が有効になります');
    log.info('APIキー取得: https://tinypng.com/developers');
  }

  // inbox 内のファイルを確認
  const inboxFiles = {
    magazine: resolve(INBOX, 'magazine-latest.jpg'),
    roasting: resolve(INBOX, 'event-roasting.jpg'),
    handdrip: resolve(INBOX, 'event-handdrip.jpg'),
    coffee1: resolve(INBOX, 'monthly-coffee/1.jpg'),
    coffee2: resolve(INBOX, 'monthly-coffee/2.jpg'),
  };

  const hasAnyFile = Object.values(inboxFiles).some(existsSync);
  if (!hasAnyFile) {
    log.warn('inbox/ に処理するファイルが見つかりません。');
    console.log(`\n${C.gray}inbox/ に以下のファイルを置いてから再実行してください:`);
    console.log('  inbox/magazine-latest.jpg');
    console.log('  inbox/event-roasting.jpg');
    console.log('  inbox/event-handdrip.jpg');
    console.log('  inbox/monthly-coffee/1.jpg');
    console.log(`  inbox/monthly-coffee/2.jpg${C.reset}\n`);
    process.exit(0);
  }

  // マガジン処理
  if (existsSync(inboxFiles.magazine)) {
    log.header('マガジン');
    rotateMagazine();
    const destPath = resolve(IMAGES, 'magazine/latest.jpg');
    if (tinify) {
      await compressAndCopy(inboxFiles.magazine, destPath, tinify);
    } else {
      simpleCopy(inboxFiles.magazine, destPath);
    }
    unlinkSync(inboxFiles.magazine);
  } else {
    log.skip('magazine-latest.jpg: スキップ（inbox になし）');
  }

  // イベントチラシ処理
  log.header('イベントチラシ');
  for (const [key, label, dest] of [
    ['roasting', 'event-roasting.jpg', 'events/event-roasting.jpg'],
    ['handdrip', 'event-handdrip.jpg', 'events/event-handdrip.jpg'],
  ]) {
    const srcPath = inboxFiles[key];
    if (existsSync(srcPath)) {
      const destPath = resolve(IMAGES, dest);
      if (tinify) {
        await compressAndCopy(srcPath, destPath, tinify);
      } else {
        simpleCopy(srcPath, destPath);
      }
      unlinkSync(srcPath);
    } else {
      log.skip(`${label}: スキップ（inbox になし）`);
    }
  }

  // Monthly コーヒー処理
  log.header('Monthly コーヒー豆');
  for (const [key, label, dest] of [
    ['coffee1', '1.jpg', 'monthly-coffee/1.jpg'],
    ['coffee2', '2.jpg', 'monthly-coffee/2.jpg'],
  ]) {
    const srcPath = inboxFiles[key];
    if (existsSync(srcPath)) {
      const destPath = resolve(IMAGES, dest);
      if (tinify) {
        await compressAndCopy(srcPath, destPath, tinify);
      } else {
        simpleCopy(srcPath, destPath);
      }
      unlinkSync(srcPath);
    } else {
      log.skip(`${label}: スキップ（inbox になし）`);
    }
  }

  // 完了メッセージ
  console.log(`\n${C.green}${C.bold}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log('  完了！');
  if (apiKeyUsed) {
    console.log(`  今月の TinyPNG 使用回数: ${tinify.compressionCount} / 500`);
  }
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${C.reset}\n`);
}

main().catch((err) => {
  log.error(`予期しないエラーが発生しました: ${err.message}`);
  process.exit(1);
});
