const features = ['button'];

function getGlobarVariable(feature) {
  if(feature === 'button') return 'Btn'
}

export default features.flatMap(feature => {
  const input = `src/${feature}/index.js`;
  const outputBase = `dist/${feature}/${feature}`;

  return [
    {
      input: input,
      output: {
        file: `${outputBase}.umd.js`,
        format: 'umd',
        name: `kitzo${getGlobarVariable(feature)}`
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