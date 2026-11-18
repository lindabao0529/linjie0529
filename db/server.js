/* ============================================================
 * server.js —— 数据服务器（数据服务：读取 db.json 提供诗词数据）
 * 作者：林洁 ｜ 建立时间：2026-11-12 ｜ 使用模型：GLM-5.3-Flash
 * 功能：启动本地 HTTP 服务器（端口 3004），读取同目录 db.json，
 *       提供诗词数据接口； poems 返回诗词 JSON， /db.json 返回原始文件。
 * 启动方式：在本项目根目录执行  node db/server.js
 * ============================================================ */

// http —— Node 内置模块，用于创建 HTTP 服务器；fs —— 用于读取磁盘上的 db.json 文件
var http = require('http');
var fs = require('fs');
var path = require('path');
// linjie_PORT —— 功能：服务器监听端口（任务要求 3004）
var linjie_PORT = 3004;

// linjie_DB_PATH —— 功能：db.json 的绝对路径（以本文件所在目录为基准，避免受启动目录影响）
var linjie_DB_PATH = path.join(__dirname, 'db.json');

/* linjie_readPoems —— 功能：同步读取 db.json 并解析为对象；读取失败时返回空结构，保证接口不崩溃 */
function linjie_readPoems() {
  try {
    return JSON.parse(fs.readFileSync(linjie_DB_PATH, 'utf-8'));
  } catch (linjie_e) {
    console.error('[server] 读取 db.json 失败：', linjie_e.message);
    return { poems: [] };
  }
}

/* linjie_sendJson —— 功能：统一写出 JSON 响应——设置 200 状态、CORS 允许跨域（页面可能以 file:// 或其他端口打开）与 JSON 内容类型 */
function linjie_sendJson(linjie_res, linjie_data) {
  linjie_res.writeHead(200, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*'
  });
  linjie_res.end(JSON.stringify(linjie_data));
}

/* linjie_getAuthors —— 功能：从诗词数据中提取作者并去重（返回去重后的作者字符串数组） */
function linjie_getAuthors() {
  var linjie_set = {};
  var linjie_list = [];
  (linjie_readPoems().poems || []).forEach(function (linjie_item) {
    // 只收集有作者字段的记录，利用对象键唯一性去重
    if (linjie_item.author && !linjie_set[linjie_item.author]) {
      linjie_set[linjie_item.author] = true;
      linjie_list.push(linjie_item.author);
    }
  });
  return linjie_list;
}

// 创建服务器：按请求路径分发——/poems 与 /api/poems 诗词数据接口；/api/authors 去重作者数组；/db.json 原始文件；其余返回 404
var linjie_server = http.createServer(function (linjie_req, linjie_res) {
  var linjie_url = (linjie_req.url || '/').split('?')[0]; // 去掉查询串，只留路径
  console.log('[server] ' + linjie_req.method + ' ' + linjie_url);

  if (linjie_url === '/poems' || linjie_url === '/api/poems') {
    // 诗词数据接口：从 db.json 取出 poems 数组
    linjie_sendJson(linjie_res, { poems: linjie_readPoems().poems || [] });
  } else if (linjie_url === '/api/authors') {
    // 作者接口：返回去重后的作者数组，如 ["曹操","王驾","杜甫","秦观","李白","孟浩然"]
    linjie_sendJson(linjie_res, { authors: linjie_getAuthors() });
  } else if (linjie_url === '/db.json') {
    // 原始数据文件直出
    linjie_sendJson(linjie_res, linjie_readPoems());
  } else {
    linjie_res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    linjie_res.end('404 Not Found（可用路径：/poems、/api/poems、/api/authors、/db.json）');
  }
});

// 监听 3004 端口，启动成功后打印访问提示
linjie_server.listen(linjie_PORT, function () {
  console.log('[server] 数据服务器已启动：http://localhost:' + linjie_PORT + '/poems');
  console.log('[server] 按 Ctrl+C 停止服务');
});
