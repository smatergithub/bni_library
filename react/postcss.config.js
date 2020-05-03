const tailwindcss = require('tailwindcss');
module.exports = {
    plugins: [
        tailwindcss('./src/utils/tailwind.js'),
        require('autoprefixer')
    ],
};