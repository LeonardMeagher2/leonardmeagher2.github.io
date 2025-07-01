module.exports = function (eleventyConfig) {
  // Copy static assets
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/pages/demos");
  eleventyConfig.addPassthroughCopy("CNAME");
  eleventyConfig.addPassthroughCopy("cards-manifest.json");

  // Add collections
  eleventyConfig.addCollection("ideas", function (collectionApi) {
    return collectionApi.getFilteredByTag("ideas");
  });

  // Add collection for navigation tree
  eleventyConfig.addCollection("folderTree", function (collectionApi) {
    const pages = collectionApi.getAll().filter((page) => {
      // Only include pages that are in the pages directory
      const isInPages =
        page.inputPath.includes("\\pages\\") ||
        page.inputPath.includes("/pages/");
      return isInPages && page.data.folder;
    });
    const tree = {};

    pages.forEach((page) => {
      if (page.data.permalink === false) return;
      if (!page.data.folder) return;

      const folders = page.data.folder.split("/");
      let current = tree;

      folders.forEach((folder) => {
        if (!current[folder]) {
          current[folder] = { pages: [], subfolders: {} };
        }
        current = current[folder].subfolders;
      });

      // Go back to the last folder to add the page
      let target = tree;
      folders.slice(0, -1).forEach((folder) => {
        target = target[folder].subfolders;
      });

      const lastFolder = folders[folders.length - 1];
      if (!target[lastFolder]) {
        target[lastFolder] = { pages: [], subfolders: {} };
      }
      target[lastFolder].pages.push(page);
    });

    return {
      tree,
      hasSubFolders: Object.values(tree).some(
        (folder) =>
          folder.subfolders && Object.keys(folder.subfolders).length > 0
      ),
    };
  });

  // Icon shortcode
  eleventyConfig.addShortcode(
    "icon",
    function (name, alt, className = "inline-icon-wrapper") {
      return `<span class="${className}"><img src="/assets/images/icons/${name}" alt="${
        alt || name + " icon"
      }" class="inline-icon"/></span>`;
    }
  );

  // Date filter for ideas posts
  eleventyConfig.addFilter("dateDisplay", function (date) {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
