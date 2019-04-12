const fs = require('fs')
const archiver = require('archiver') // 压缩文件
const path = require('path')
const config = require('../config')
const rm = require('rimraf')
const chalk = require('chalk')
var Client = require('ssh2').Client
const readline = require('readline')
var socks = require('socksv5');
var net = require('net');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

var conn = new Client()
let outputDir = path.basename(config.build.assetsRoot)
// const env = {
//   NODE_ENV: '"production"',
//   REMOTE_HOST: '47.106.64.41',
//   DEFAULT_HOST: {
//     host: '47.106.64.41',
//     user: 'yezhao',
//     password: '159357',
//     key: '',
//     name: outputDir,
//     path: '/h5'
//   }
// }
const env = { // 跳板机
  NODE_ENV: '"production"',
  REMOTE_HOST: '120.24.83.137', // 外网管道
  DEFAULT_HOST: {
    host: '120.24.83.137',
    user: 'uview',
    password: 'sz075@dev12&ms',
    key: '',
    name: outputDir,
    path: '/data/segingx/h5/h5'
  }
}
const targetEnv = {
  NODE_ENV: '"production"',
  REMOTE_HOST: '10.170.0.239',
  DEFAULT_HOST: {
    host: '10.170.0.239',
    user: 'uhome',
    password: '',
    key: '',
    name: outputDir,
    path: '/data/segingx/h5/h5'
  }
}
const user = {
  host: env.DEFAULT_HOST.host,
  port: 41122,
  username: env.DEFAULT_HOST.user,
  password: env.DEFAULT_HOST.password
}

const targetUser = {
  host: targetEnv.DEFAULT_HOST.host,
  port: 22,
  username: targetEnv.DEFAULT_HOST.user,
  password: targetEnv.DEFAULT_HOST.password
}
/**
 * 1.进入目录
 * 2.删除旧的备份项目
 * 3.将原项目名称加上bak标志为备份文件
 * 4.解压缩上传的zip文件并将名称改为项目名称
 * 5.删除zip文件
 * 6.退出
 * @type {string[]}
 */
const uploadShellList = [
  `cd ${env.DEFAULT_HOST.path}\n`,
  `rm -rf ${env.DEFAULT_HOST.name}.bak\n`,
  `mv ${env.DEFAULT_HOST.name} ${env.DEFAULT_HOST.name}.bak\n`,
  `unzip ${env.DEFAULT_HOST.name}.zip\n`,
  `mv dist ${env.DEFAULT_HOST.name}\n`,
  `rm -rf ${env.DEFAULT_HOST.name}.zip\n`,
  `exit\n`
]
const testShellList = [
  `cd ${env.DEFAULT_HOST.path}\n`,
  `pwd\n`,
  `exit\n`
]
const params = {
  file: `../${env.DEFAULT_HOST.name}.zip`,
  target: `${env.DEFAULT_HOST.path}/${env.DEFAULT_HOST.name}.zip`
}

/**
 * 上传文件
 * @param conn
 * @param params
 * @constructor
 */
function UploadFile(conn, params) {
  const file = params.file
  const target = params.target
  if (!conn) return
  conn.sftp((err, sftp) => {
    if (err) {
      console.error(err)
      throw err
    }
    sftp.fastPut(file, target, {}, (err, result) => {
      if (err) {
        console.log(chalk.red(err.message))
        throw err
      }
      Shell(conn)
    })
  })

}

function ready() {
  rl.question(chalk.green(`发布至服务器${env.DEFAULT_HOST.host},请输入服务器密码`), (answer) => {
    if (answer !== null) {
      targetUser.password = answer.replace(/\r\n$/, '')
      rl.close()
      connect(user).then((data) => {
          console.log(data, '目标服务器')
        //   return connect(targetUser)
        UploadFile(conn, params)
      }).catch(e => {
          console.log('连接失败')
      })
    //   conn.on('ready', function() {
    //     console.log('Client :: ready');
    //     conn.forwardIn('127.0.0.1', 3080, function(err) {
    //       if (err) throw err;
    //       console.log('Listening for connections on server on port 3080!');
    //       let targetCoon = new Client()
    //     connect(targetCoon).then(data => {
    //         console.log(data)
    //         UploadFile(targetCoonv, params)
    //     }).catch(e => {
    //         console.log(e)
    //     })
    //     });
    //   }).on('tcp connection', function(info, accept, reject) {
    //     console.log('TCP :: INCOMING CONNECTION:');
    //     console.dir(info);
        
    //     accept().on('close', function() {
    //       console.log('TCP :: CLOSED');
    //     }).on('data', function(data) {
    //       console.log('TCP :: DATA: ' + data);
    //     }).end([
    //       'HTTP/1.1 404 Not Found',
    //       'Date: Thu, 15 Nov 2012 02:07:58 GMT',
    //       'Server: ForwardedConnection',
    //       'Content-Length: 0',
    //       'Connection: close',
    //       '',
    //       ''
    //     ].join('\r\n'));
    //   }).connect(user)
    } else {
      console.log(登录失败)
    }
  })
}

function connect(targetCoon) {

  return new Promise((resolve, reject) => {
    // socks.createServer((into, accept, deny) => {
    //     console.log('目标服务器连接', into)
    //   targetCoon.on('ready', function () {
    //     targetCoon.forwardOut(info.srcAddr,
    //       info.srcPort,
    //       info.dstAddr,
    //       info.dstPort,
    //       function (err, stream) {
    //         if (err) {
    //           targetCoon.end();
    //            deny();
    //            return reject(err)
    //         }
    //         var clientSocket;
    //         if (clientSocket = accept(true)) {
    //           stream.pipe(clientSocket).pipe(stream).on('close', function () {
    //             targetCoon.end();
    //           });
    //         } else
    //           targetCoon.end();
    //       });
    //       resolve('代理配置完成')
    //   }).on('error', function (err) {
    //     deny();
    //     reject(err)
    //   }).connect(targetUser);
    // }).listen(3080, '127.0.0.1', function () {
    //   console.log('SOCKSv5 proxy server started on port 3080');
    // }).useAuth(socks.auth.None());
    conn.on('ready', (err) => {
        if (err) {
          console.log(chalk.red(err.message))
          reject(err) 
        }
        resolve('连接完成')
      }).connect(user)
  })

}
/**
 * 上传完成后服务器需要执行的内容
 * 删除本地压缩文件
 * @param conn
 * @constructor
 */
function Shell(conn) {
  conn.shell((err, stream) => {
    if (err) throw err
    var buf = ''
    var bData = false
    stream.on('close', () => {
      console.log('Stream :: close')
      conn.end()
    }).stdin.on('data', (data) => {
      console.log('STDOUT: ' + data)
    }).stderr.on('data', (data) => {
      console.log('STDERR: ' + data)
    })
    stream.end(testShellList.join(''))
  })
}

module.exports = function () {
  rm(`${config.build.assetsRoot}.zip`, err => {
    if (err) throw err


    var output = fs.createWriteStream(`${config.build.assetsRoot}.zip`)
    var archive = archiver('zip')
    output.on('close', function () {
      // console.log(chalk.cyan('  Zip files.\n'))
      // console.timeEnd('key')
      console.log('compress completed...ready upload')
      // require('./publish')()
      try {
        ready()
      } catch (e) {
        console.error(e)
      }
    })
    output.on('end', function () {
      console.log('写入结束')
    })
    archive.on('error', function (err) {
      throw err
    })
    archive.pipe(output)
    archive.glob(`${config.build.assetsRoot}/**`)
    archive.finalize()
  })

}()
