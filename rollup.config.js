const input = './src/index.js';
export default [
  {
    input,
    output: {
      file: './dist/zero-kitzo.umd.js',
      format: 'umd',
      name: 'kitzo',
    },
  },
  {
    input,
    output: {
      file: './dist/zero-kitzo.esm.js',
      format: 'esm',
    },
  },
];
