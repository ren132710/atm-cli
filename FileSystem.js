const fs = require('fs')

//https://nodejs.org/docs/latest/api/fs.html#fs_fs_readfile_path_options_callback
//If no encoding is specified, then the raw buffer is returned.

module.exports = class FileSystem {
  static read(path) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, 'utf8', (err, data) => {
        if (err) return reject(err)
        resolve(data)
      })
    })
  }

  static write(path, content) {
    return new Promise((resolve, reject) => {
      fs.writeFile(path, content.toString(), (err) => {
        if (err) return reject(err)
        resolve()
      })
    })
  }
}
