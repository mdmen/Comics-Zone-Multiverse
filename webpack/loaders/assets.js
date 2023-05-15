module.exports = () => [
  {
    test: /\.(png|webp)$/,
    type: 'asset/resource',
  },
  {
    test: /\.json$/,
    type: 'asset/resource',
    generator: {
      filename: 'json/[hash][ext][query]',
    },
  },
  {
    test: /\.woff2$/,
    type: 'asset/resource',
  },
];
