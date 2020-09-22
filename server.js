var http = require("http");
var fs = require("fs");
var url = require("url");
var port = process.argv[2];

if (!port) {
  process.exit(1);
}

var server = http.createServer(function (request, response) {
  var parsedUrl = url.parse(request.url, true);
  var pathWithQuery = request.url;
  var queryString = "";
  if (pathWithQuery.indexOf("?") >= 0) {
    queryString = pathWithQuery.substring(pathWithQuery.indexOf("?"));
  }
  var path = parsedUrl.pathname;
  var query = parsedUrl.query;
  var method = request.method;

  /******** 从这里开始看，上面不要看 ************/

  console.log("发送请求，路径（带查询参数）为：" + pathWithQuery);

  if (path === "/index.html") {
    //   状态码
    response.statusCode = 200;
    // 设置响应头
    response.setHeader("Content-Type", "text/html;charset=utf-8");
    // 设置响应体
    let stringHtml = fs.readFileSync("public/index.html").toString();
    const page1 = fs.readFileSync("db/page1.json").toString();
    const array = JSON.parse(page1);
    // stringHtml = stringHtml.replace("{{page}}", page1);
    const result = array.map((item) => `<li>${item.id}</li>`).join("");
    stringHtml = stringHtml.replace(
      "{{page}}",
      `<ul id="pages">${result}</ul>`
    );
    response.write(stringHtml);
    response.end();
  } else if (path === "/style.css") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/css;charset=utf-8");
    const stringCss = fs.readFileSync("public/style.css");
    response.write(stringCss);
    response.end();
  } else if (path === "/demo.js") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/javasrcipt;charset=utf-8");
    const stringJs = fs.readFileSync("public/demo.js");
    response.write(stringJs);
    response.end();
  } else if (path === "/main.js") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/javasrcipt;charset=utf-8");
    const stringJs = fs.readFileSync("public/main.js");
    response.write(stringJs);
    response.end();
  } else if (path === "/dong.html") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html;charset=utf-8");
    const stringHtml = fs.readFileSync("public/dong.html");
    response.write(stringHtml);
    response.end();
  } else if (path === "/demo.xml") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/xml;charset=utf-8");
    const stringXml = fs.readFileSync("public/demo.xml");
    response.write(stringXml);
    response.end();
  } else if (path === "/demo.json") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/json;charset=utf-8");
    const stringJson = fs.readFileSync("public/demo.json");
    response.write(stringJson);
    response.end();
  } else if (path === "/page1") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/json;charset=utf-8");
    const stringJson = fs.readFileSync("db/page1.json");
    response.write(stringJson);
    response.end();
  } else if (path === "/page2") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/json;charset=utf-8");
    const stringJson = fs.readFileSync("db/page2.json");
    response.write(stringJson);
    response.end();
  } else if (path === "/page3") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/json;charset=utf-8");
    const stringJson = fs.readFileSync("db/page3.json");
    response.write(stringJson);
    response.end();
  } else {
    response.statusCode = 404;
    response.setHeader("Content-Type", "text/html;charset=utf-8");
    response.write(`你访问的页面不存在`);
    response.end();
  }

  /******** 代码结束，下面不要看 ************/
});

server.listen(port);
console.log("监听 " + port + " 成功\n http://localhost:" + port);
