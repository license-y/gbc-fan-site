export default {
  eleventyComputed: {
    permalink: (data) => {
      const isDraft = !!data.draft;
      const isProductionBuild = process.env.ELEVENTY_RUN_MODE === "build";
      if (isDraft && isProductionBuild) return false;
      return data.permalink;
    },
  },
};
