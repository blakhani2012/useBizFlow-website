/**
 * Repairs per-segment prefetch filenames in the static export on Windows.
 *
 * ── The bug ────────────────────────────────────────────────────────────────
 * Next 16's client router prefetches each route segment individually. Under
 * `output: "export"` it cannot use request headers to ask for a segment, so it
 * encodes the segment path into the filename instead
 * (next/dist/client/components/segment-cache/cache.js →
 * addSegmentPathToUrlInOutputExportMode), using:
 *
 *   convertSegmentPathToStaticExportFilename(segmentPath)
 *     => `__next${segmentPath.replace(/\//g, ".")}.txt`
 *
 * So for /demo it requests  /demo/__next.demo.__PAGE__.txt.
 *
 * The exporter builds that same name (next/dist/export/index.js), but it feeds
 * it a segment path produced by `path.relative()`, which on Windows uses `\`
 * as the separator. `.replace(/\//g, ".")` only rewrites forward slashes, so
 * the backslash survives — and the subsequent `path.join()` then treats it as
 * a directory separator. A Windows build emits:
 *
 *   out/demo/__next.demo/__PAGE__.txt        <-- nested, never requested
 *
 * instead of:
 *
 *   out/demo/__next.demo.__PAGE__.txt        <-- what the browser asks for
 *
 * Every segment path containing a slash is affected — in practice the
 * `__PAGE__` segment of every route — which is exactly the set of 404s seen in
 * hosting logs (/demo/__next.demo.__PAGE__.txt, /pricing/…, /about/…). The
 * flat segments (_tree, _full, _head, _index) have no inner slash and are
 * emitted correctly, which is why only some prefetches 404.
 *
 * ── The fix ────────────────────────────────────────────────────────────────
 * Flatten those directories back into the filenames the client actually
 * requests. This is not a workaround for the symptom: the file contents are
 * already correct and complete, they are simply written to the wrong path.
 *
 * This runs as `postbuild`, so it is applied automatically. It is a no-op on
 * macOS/Linux, where `path.relative()` already returns forward slashes and the
 * exporter gets the name right — so building in Linux CI also avoids the bug
 * entirely and this script simply finds nothing to do.
 *
 * Usage:
 *   node scripts/fix-export-segment-paths.js [outDir]
 */
const fs = require("fs");
const path = require("path");

const OUT_DIR = path.resolve(
  process.argv[2] || path.join(__dirname, "..", "out"),
);

/** Prefix Next gives every static-export segment prefetch file. */
const SEGMENT_PREFIX = "__next.";

/** Collect every file under `dir`, as paths relative to `dir`. */
function filesUnder(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = entry.name;
    if (entry.isDirectory()) {
      for (const nested of filesUnder(path.join(dir, rel))) {
        out.push(path.join(rel, nested));
      }
    } else {
      out.push(rel);
    }
  }
  return out;
}

/**
 * A `__next.*` *directory* is the corrupted form. Flatten each file inside it
 * into `<dirName>.<inner.path.with.dots>` next to the directory, then drop the
 * now-empty directory.
 */
function flattenSegmentDir(parentDir, dirName) {
  const dir = path.join(parentDir, dirName);
  let moved = 0;

  for (const rel of filesUnder(dir)) {
    const flatName = `${dirName}.${rel.split(path.sep).join(".")}`;
    const dest = path.join(parentDir, flatName);
    fs.renameSync(path.join(dir, rel), dest);
    moved += 1;
    console.log(
      `  ${path.relative(OUT_DIR, path.join(dir, rel))} -> ${path.relative(OUT_DIR, dest)}`,
    );
  }

  fs.rmSync(dir, { recursive: true });
  return moved;
}

function walk(dir) {
  let moved = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    if (entry.name.startsWith(SEGMENT_PREFIX)) {
      moved += flattenSegmentDir(dir, entry.name);
    } else {
      moved += walk(path.join(dir, entry.name));
    }
  }
  return moved;
}

function main() {
  if (!fs.existsSync(OUT_DIR)) {
    // Nothing to repair — e.g. `postbuild` firing before a build ever ran.
    console.log(`No export directory at ${OUT_DIR}; nothing to do.`);
    return;
  }

  const moved = walk(OUT_DIR);
  console.log(
    moved === 0
      ? "Segment prefetch filenames already correct; nothing to do."
      : `Flattened ${moved} segment prefetch file(s).`,
  );
}

main();
