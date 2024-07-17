module.exports = () => [
  {
    test: /\.(webp|mp3|json)$/,
    type: 'asset/resource',
  },
  {
    test: /\.(vert|frag)$/,
    type: 'asset/source',
  },
];
