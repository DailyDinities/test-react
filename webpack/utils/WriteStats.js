// A webpack plugin to write webpack stats that can be consumed when rendering
// the page (e.g. it attach the public path to the script names)
// These stats basically contains the path of the script files to
// <script>-load in the browser.

import fs from "fs";
import path from "path";

const filepath = path.resolve(__dirname, "../../src/app/webpack-stats.json");


export default class WriteStats {
  apply(compiler) {
    compiler.hooks.done.tap('WriteStats', (stats) => {
      var publicPath = compiler.options.output.publicPath;
      var json = stats.toJson();

      // get chunks by name and extensions
      function getChunks(name, ext) {
        ext = ext || "js";
        var chunk = json.assetsByChunkName[name];

        // a chunk could be a string or an array, so make sure it is an array
        if (!(Array.isArray(chunk))) {
          chunk = [chunk];
        }

        return chunk
          // filter by extension
          .filter(function (chunkName) {
            return path.extname(chunkName) === "." + ext;
          })
          .map(function (chunkName) {
            return publicPath + chunkName;
          });
      }

      var script = getChunks("main", "js");
      var css = getChunks("main", "css");

      var content = {
        script: script,
        css: css
      };

      fs.writeFileSync(filepath, JSON.stringify(content));
    });
  }
}