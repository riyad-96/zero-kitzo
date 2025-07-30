const features = ['button'];

export default features.flatMap(feature => {
  const input = `src/${feature}/index.js`;
  const outputBase = `dist/${feature}/${feature}`;

  return [
    {
      input: input,
      output: {
        file: `${outputBase}.umd.js`,
        format: 'umd',
        name: 'kitzo'
      }
    },
    {
      input: input,
      output: {
        file: `${outputBase}.esm.js`,
        format: 'esm'
      }
    }
  ]
})