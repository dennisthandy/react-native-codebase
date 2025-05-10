const path = require('path')
     
const buildEslintCommand = (filenames) =>
  `expo lint ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`
  
module.exports = {
  '*.{ts,tsx}': [buildEslintCommand],
}