// next.config.js
const withSass = require("@zeit/next-sass");
const withImages = require("next-images");
module.exports = withSass(
  withImages({
    /* config options here */
  })
);
