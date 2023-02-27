const util = require('node:util')
const execFile = util.promisify(require('node:child_process').execFile)

module.exports = {
  hooks: {
    generateAssets: async () => {
      await execFile('npm', ['run', 'build'], { shell: true })
    }
  },
  packagerConfig: {},
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {},
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
};
