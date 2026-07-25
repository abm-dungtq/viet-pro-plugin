#!/usr/bin/env node
// package-viet-pro-skill.mjs — bundle viet-pro skill + 4 newsroom agents + INSTALL.md into dist zip
// Usage: node package-viet-pro-skill.mjs
// Output: <repo>/dist/viet-pro-4.0.zip (structure: skills/viet-pro/** + agents/viet-pro-*.md + INSTALL.md + README.md + plugin.json)

import { cpSync, mkdirSync, rmSync, existsSync, copyFileSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { platform } from 'node:os';

const VERSION = '4.0';
const SKILL_DIR = resolve(dirname(fileURLToPath(import.meta.url)), '..'); // .../skills/viet-pro
const PLUGIN_DIR = resolve(SKILL_DIR, '..', '..');                        // .../viet-pro-plugin
const AGENTS = ['viet-pro-researcher.md', 'viet-pro-editor.md', 'viet-pro-publisher.md', 'viet-pro-reviewer.md'];

// verify agents exist BEFORE staging
const missing = AGENTS.filter((a) => !existsSync(join(PLUGIN_DIR, 'agents', a)));
if (missing.length) { console.error(`FAIL — thiếu agent files: ${missing.join(', ')}`); process.exit(1); }
if (!existsSync(join(SKILL_DIR, 'INSTALL.md'))) { console.error('FAIL — thiếu INSTALL.md trong skill dir'); process.exit(1); }

const distDir = join(PLUGIN_DIR, 'dist');
const stage = join(distDir, 'viet-pro-package');
const zipPath = join(distDir, `viet-pro-${VERSION}.zip`);

rmSync(stage, { recursive: true, force: true });
rmSync(zipPath, { force: true });
mkdirSync(join(stage, 'agents'), { recursive: true });
mkdirSync(distDir, { recursive: true });

// Stage plugin files
cpSync(SKILL_DIR, join(stage, 'skills', 'viet-pro'), { recursive: true });
for (const a of AGENTS) copyFileSync(join(PLUGIN_DIR, 'agents', a), join(stage, 'agents', a));
copyFileSync(join(PLUGIN_DIR, 'INSTALL.md'), join(stage, 'INSTALL.md'));
copyFileSync(join(PLUGIN_DIR, 'README.md'), join(stage, 'README.md'));
copyFileSync(join(PLUGIN_DIR, 'plugin.json'), join(stage, 'plugin.json'));

// Cross-platform zip
try {
  if (platform() === 'win32') {
    execFileSync('powershell.exe', ['-NoProfile', '-NonInteractive', '-Command',
      `Compress-Archive -Path "${stage}\\*" -DestinationPath "${zipPath}" -Force`], { stdio: 'inherit' });
  } else {
    execFileSync('zip', ['-r', '-q', zipPath, '.'], { cwd: stage, stdio: 'inherit' });
  }
  rmSync(stage, { recursive: true, force: true });
  console.log(`OK — đóng gói xong: ${zipPath}`);
} catch (err) {
  console.error(`FAIL — Lỗi đóng gói zip: ${err.message}`);
  process.exit(1);
}
