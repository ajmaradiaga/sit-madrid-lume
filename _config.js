import lume from "lume/mod.ts";
import top from "top/mod.ts";

const site = lume();

site.use(top());

site.ignore("README.md", "CHANGELOG.md", "node_modules");

export default site;
