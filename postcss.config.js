const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')({ preset: 'default' })
const purgecss = require('@fullhuman/postcss-purgecss')({
  // Specify the paths to all of the template files in your project
  content: [
    './public/index.html',
    './**/index.html',
    './src/**/*.html',
    './src/**/*.jsx',
    './src/**/*.tsx',
    // etc.
  ],
  // content: ['public/index.html', 'src/App.tsx'],
  // css: ['src/index.scss'],
  // whitelist: ['my-class'],
  // whitelistPatterns: [/ais-.*/],

  // Include any special characters you're using in this regular expression
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
})

module.exports = {
  plugins: [
    process.env.NODE_ENV === 'production' ? autoprefixer : null,
    process.env.NODE_ENV === 'production' ? cssnano : null,
    // process.env.NODE_ENV === 'production' ? [purgecss] : [],
  ],
}
