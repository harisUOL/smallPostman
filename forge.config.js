// forge.config.js
const path = require('path');

module.exports = {
  packagerConfig: {
    asar: true,
    icon: path.join(__dirname, 'assets', 'icon'), // picks .png/.ico/.icns per OS
    executableName: 'smallpostman'
  },
  makers: [
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          productName: 'Small Postman',
          productDescription:
            'A minimal Postman-like REST client. Build requests, view responses, save collections.',
          maintainer: 'Haris Moin',
          homepage: 'https://github.com/yourname/smallpostman',
          categories: ['Development'],
          icon: path.join(__dirname, 'assets', 'icon.png')
        }
      }
    },
    { name: '@electron-forge/maker-zip', platforms: ['linux'] }
  ]
};
