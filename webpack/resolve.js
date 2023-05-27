const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = () => ({
  plugins: [new TsconfigPathsPlugin()],
  extensions: ['.ts', '.js'],
});
