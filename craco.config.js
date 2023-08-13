// craco.config.js
module.exports = {
  plugins: [
    {
      plugin: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
      options: {
        // Plugin options
      },
    },
  ],
  webpack: {
    configure: {
      // Webpack configuration options
    },
  },
};