const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'iy7uep',
  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
});
