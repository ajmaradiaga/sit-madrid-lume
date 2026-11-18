import lume from "lume/mod.ts";
import top from "top/mod.ts";
import multilanguage from "lume/plugins/multilanguage.ts";

const site = lume({ location: new URL("https://sitmadrid.com") });

site.use(top());

// Multilanguage: English is the default (served at /), Spanish under /es/.
// A page joins the English/Spanish pair by sharing the same `id`; the page's
// own `lang` picks the language. Default-language pages keep their plain URL;
// non-default pages are served under /<lang>/.
site.use(multilanguage({
  languages: ["en", "es"],
  defaultLanguage: "en",
}));

// Ship our own scroll-reveal module; base layout loads it as /script.js
site.add("script.js");

// Frozen snapshots of past editions live under files/archive/<year>. They are
// pre-built HTML/CSS from older commits and must NOT be processed as Lume pages
// (that would inject the current site's metas/fonts). So we ignore them during
// the build, then copy them into the output verbatim afterwards.
site.ignore("files/archive");

async function copyArchive() {
  const from = site.src("files/archive");
  try {
    await Deno.stat(from);
  } catch {
    return; // nothing to copy
  }
  await Deno.mkdir(site.dest("files"), { recursive: true });
  const { success, stderr } = await new Deno.Command("cp", {
    args: ["-R", from, site.dest("files")],
  }).output();
  if (!success) {
    console.error("archive copy failed:", new TextDecoder().decode(stderr));
  }
}
site.addEventListener("afterBuild", copyArchive);
site.addEventListener("afterUpdate", copyArchive);

site.ignore("README.md", "CHANGELOG.md", "node_modules");

export default site;
