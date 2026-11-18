/* 作者：林洁 ｜ 建立时间：2026-11-16 ｜ 使用模型：GLM-5.3-Flash ｜ 功能：局域网 HTTPS 静态服务器（自签证书，端口 8443）——
   devicemotion / deviceorientation 等传感器 API 只在"安全上下文"（HTTPS 或 localhost）开放，
   HTTP 局域网地址手机上拿不到传感器数据；用本服务器托管项目目录，手机访问 https://<电脑IP>:8443/页面.html
   即可让页面处于安全上下文。证书为自签（Temp/linjie-https/），浏览器会提示"不安全"，选择继续前往即可。 */
var linjie_https = require('https');
var linjie_fs = require('fs');
var linjie_path = require('path');

var linjie_port = 8443;
var linjie_root = __dirname; // 托管项目根目录

/* linjie_typeOf —— 功能：根据扩展名返回 MIME 类型，浏览器才能正确解析 CSS/JS/图片 */
function linjie_typeOf(linjie_file) {
  var linjie_map = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
    '.gif': 'image/gif', '.svg': 'image/svg+xml', '.ico': 'image/x-icon',
    '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.md': 'text/plain; charset=utf-8'
  };
  return linjie_map[linjie_path.extname(linjie_file).toLowerCase()] || 'application/octet-stream';
}

/* linjie_server —— 功能：HTTPS 请求处理——把 URL 路径映射到项目目录下的文件并返回；
   根路径默认返回 index.html；防目录穿越（resolve 后必须仍在项目目录内） */
var linjie_server = linjie_https.createServer({
  cert: linjie_fs.readFileSync(linjie_path.join(process.env.TEMP, 'linjie-https', 'cert.pem')),
  key: linjie_fs.readFileSync(linjie_path.join(process.env.TEMP, 'linjie-https', 'key.pem'))
}, function (linjie_req, linjie_res) {
  var linjie_urlPath = decodeURIComponent(linjie_req.url.split('?')[0]);
  if (linjie_urlPath === '/') { linjie_urlPath = '/index.html'; }
  var linjie_file = linjie_path.join(linjie_root, linjie_urlPath);
  if (!linjie_file.startsWith(linjie_root)) { linjie_res.writeHead(403); linjie_res.end('Forbidden'); return; }
  linjie_fs.readFile(linjie_file, function (linjie_err, linjie_data) {
    if (linjie_err) { linjie_res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }); linjie_res.end('404 Not Found: ' + linjie_urlPath); return; }
    linjie_res.writeHead(200, { 'Content-Type': linjie_typeOf(linjie_file) });
    linjie_res.end(linjie_data);
  });
});

linjie_server.listen(linjie_port, '0.0.0.0', function () {
  console.log('HTTPS 静态服务器已启动：https://192.168.43.136:' + linjie_port + '/mobile-sensor.html（手机需与电脑同一 Wi-Fi，首次打开选择"继续前往"）');
});
