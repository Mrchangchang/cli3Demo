const fs = require('fs')
const archiver = require('archiver') // 压缩文件
const vueConfig = require('./vue.config')

module.exports = function () {
    var output = fs.createWriteStream(`./${vueConfig.outputDir}.zip`)
    var archive = archiver('zip')
    output.on('close', function () {
        // console.log(chalk.cyan('  Zip files.\n'))
        // console.timeEnd('key')
        console.log('compress completed...ready upload')
        // require('./publish')()
    })
    output.on('end', function () {
        console.log('写入结束')
    })
    archive.on('error', function (err) {
        throw err
    })
    archive.pipe(output)
    archive.glob(`./${vueConfig.outputDir}/**`)
    archive.finalize()
}()