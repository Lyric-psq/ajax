getCSS.onclick = () => {
  //创建HttpRequest对象
  const request = new XMLHttpRequest();
  //调用open方法
  request.open("GET", "/style.css");
  // 监听onreadystatechange
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      console.log("css下载完成");
      // 下载完成判断是否成功
      if (request.status >= 200 && request.status < 300) {
        const style = document.createElement("style");
        style.innerHTML = request.response;
        document.head.appendChild(style);
      } else {
        alert("加载css失败");
      }
    }
  };
  request.send();
};
getJS.onclick = () => {
  const request = new XMLHttpRequest();
  request.open("GET", "/demo.js");
  request.onload = () => {
    console.log("js成功");
    const script = document.createElement("script");
    script.innerHTML = request.response;
    document.body.appendChild(script);
  };
  request.onerror = () => {
    console.log("js失败");
  };
  // 发送请求
  request.send();
};

getHTML.onclick = () => {
  const request = new XMLHttpRequest();
  request.open("GET", "/dong.html");
  request.onload = () => {
    console.log("dong成功");
    const div = document.createElement("div");
    div.innerHTML = request.response;
    document.body.appendChild(div);
  };
  request.onerror = () => {
    console.log("dong失败");
  };
  // 发送请求
  request.send();
};
getXML.onclick = () => {
  const request = new XMLHttpRequest();
  request.open("GET", "/demo.xml");
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      if (request.status >= 200 && request.status < 300) {
        // dom对象
        const XML = request.responseXML;
        const text = XML.getElementsByTagName("warning")[0].textContent;
        console.log(text.trim());
      }
    }
  };
  request.send();
};
getJSON.onclick = () => {
  const request = new XMLHttpRequest();
  request.open("GET", "/demo.json");
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      if (request.status >= 200 && request.status < 300) {
        const person = JSON.parse(request.response);
        myName.textContent = person.name;
      }
    }
  };
  request.send();
};
let n = 1;
nextPage.onclick = () => {
  const request = new XMLHttpRequest();
  request.open("GET", `/page${n + 1}`);
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      if (request.status >= 200 && request.status < 300) {
        const array = JSON.parse(request.response);
        array.forEach((item) => {
          const li = document.createElement("li");
          li.textContent = item.id;
          pages.appendChild(li);
        });
        n += 1;
      }
    }
  };
  request.send();
};
