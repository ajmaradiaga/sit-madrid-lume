import lume from "lume/mod.ts";
import top from "top/mod.ts";

const site = lume({ location: new URL("https://sitmadrid.com") });

site.use(top());

// Ship our own scroll-reveal module; base layout loads it as /script.js
site.add("script.js");

site.ignore("README.md", "CHANGELOG.md", "node_modules");

export default site;
