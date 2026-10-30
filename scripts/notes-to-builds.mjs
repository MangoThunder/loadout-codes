// Turns Obsidian notes tagged #publish into builds for the website.
//
// Reads every .md note in builds/ (any depth) and writes js/notes-builds.js.
// A note is published when its frontmatter tags include "publish" or its text contains #publish.
//
// Note format (all fields optional except the code):
//   ---
//   gun: AS Val
//   class: Assault Rifle
//   code: AS Val Assault Rifle-Operations (Extraction Mode)-6LFEJOG014H9D6PDMV79E
//   tags: [publish]
//   ---
//   ![[build screenshot.png]]        first picture  -> "View build"
//   ![[calibration screenshot.png]]  second picture -> "Calibration"
//
// Without "gun" the note's file name is used. Without "code" the first line that looks like
// an import code ("...-Operations...") is used. Without "class" it's read from the code.
// A picture whose file name contains "calibrat" is always used for Calibration.

import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { basename, extname, join, relative, sep } from "node:path";

const ROOT = process.cwd();
const NOTES_DIR = join(ROOT, "builds");
const OUT = join(ROOT, "js", "notes-builds.js");
const IMAGE_EXT = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".avif"]);
const SKIP_DIRS = new Set([".git", ".github", ".obsidian", ".trash", "node_modules"]);

function walk(dir, out = []) {
  let entries = [];
  try { entries = readdirSync(dir); } catch { return out; }
  for (const name of entries) {
    if (SKIP_DIRS.has(name)) continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

// Obsidian finds attachments by file name anywhere in the vault, so index the whole repo.
const allFiles = walk(ROOT);
const imagesByName = new Map();
for (const f of allFiles) {
  if (!IMAGE_EXT.has(extname(f).toLowerCase())) continue;
  const key = basename(f).toLowerCase();
  if (!imagesByName.has(key)) imagesByName.set(key, f);
}
const toUrl = (file) => relative(ROOT, file).split(sep).map(encodeURIComponent).join("/");

function parseFrontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return { data: {}, body: text };
  const data = {};
  let listKey = null;
  for (const line of m[1].split(/\r?\n/)) {
    const item = line.match(/^\s*-\s+(.*)$/);
    if (item && listKey) { data[listKey].push(unquote(item[1])); continue; }
    const kv = line.match(/^([A-Za-z][\w -]*?)\s*:\s*(.*)$/);
    if (!kv) continue;
    const key = kv[1].trim().toLowerCase();
    const value = kv[2].trim();
    if (value === "") { data[key] = []; listKey = key; continue; }
    listKey = null;
    data[key] = value.startsWith("[") && value.endsWith("]")
      ? value.slice(1, -1).split(",").map((v) => unquote(v.trim())).filter(Boolean)
      : unquote(value);
  }
  return { data, body: text.slice(m[0].length) };
}
const unquote = (v) => v.replace(/^["']|["']$/g, "");

function classFromCode(code) {
  const c = code.toLowerCase();
  if (c.includes("submachine gun")) return "SMG";
  if (c.includes("machine gun")) return "LMG";
  if (c.includes("marksman rifle")) return "Marksman Rifle";
  if (c.includes("sniper rifle")) return "Sniper Rifle";
  if (c.includes("shotgun")) return "Shotgun";
  if (c.includes("assault rifle") || c.includes("battle rifle")) return "Assault Rifle";
  return "Special";
}

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function embeds(body, noteFile) {
  const found = [];
  const re = /!\[\[([^\]|#]+)(?:[|#][^\]]*)?\]\]|!\[[^\]]*\]\(([^)]+)\)/g;
  let m;
  while ((m = re.exec(body))) {
    const target = decodeURIComponent((m[1] || m[2]).trim().replace(/^<|>$/g, ""));
    if (/^https?:\/\//i.test(target)) { found.push(target); continue; }
    const byName = imagesByName.get(basename(target).toLowerCase());
    const byPath = [join(ROOT, target), join(noteFile, "..", target)].find((p) => {
      try { return statSync(p).isFile(); } catch { return false; }
    });
    const file = byPath || byName;
    if (file && IMAGE_EXT.has(extname(file).toLowerCase())) found.push(toUrl(file));
    else console.warn(`  ! picture not found: ${target}`);
  }
  return found;
}

const builds = [];
const problems = [];
for (const file of allFiles.filter((f) => f.startsWith(NOTES_DIR + sep) && f.toLowerCase().endsWith(".md"))) {
  const name = relative(ROOT, file);
  if (basename(file).toLowerCase() === "readme.md") continue;
  const { data, body } = parseFrontmatter(readFileSync(file, "utf8"));
  const tags = [].concat(data.tags || data.tag || []).map((t) => String(t).replace(/^#/, "").toLowerCase());
  const published = tags.includes("publish") || /(^|\s)#publish\b/i.test(body);
  if (!published) continue;

  const code = (data.code || (body.match(/^.*-Operations.*$/m) || [""])[0]).trim().replace(/^[`>*\-\s]+|[`*\s]+$/g, "");
  if (!code) { problems.push(`${name}: tagged #publish but has no code`); continue; }
  const weapon = String(data.gun || data.weapon || basename(file, ".md")).trim();
  const pics = embeds(body, file);
  const calibration = pics.find((p) => /calibrat/i.test(p)) || pics.filter((p) => !/calibrat/i.test(p))[1] || "";
  const image = pics.find((p) => p !== calibration) || "";

  const build = { id: slug(weapon), weapon, category: String(data.class || data.category || classFromCode(code)), code };
  if (image) build.image = image;
  if (calibration) build.calibration = calibration;
  if (data.notes) build.notes = String(data.notes);
  builds.push(build);
  console.log(`  + ${weapon} (${build.category})${image ? "" : " - no build picture"}${calibration ? "" : " - no calibration picture"}`);
}

writeFileSync(OUT,
  "// Generated from the Obsidian notes in builds/ that are tagged #publish.\n" +
  "// Don't edit by hand: it's rebuilt by scripts/notes-to-builds.mjs on every push.\n" +
  "window.NOTE_BUILDS = " + JSON.stringify(builds, null, 2) + ";\n");
console.log(`${builds.length} published note build(s) written to js/notes-builds.js`);
for (const p of problems) console.warn(`  ! ${p}`);
