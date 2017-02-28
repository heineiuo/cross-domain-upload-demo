# 跨域上传文件示例

## 使用步骤

1. clone或download仓库
2. 使用yarn（推荐）或npm安装依赖包
3. `npm start`
4. `npm start react-sh`
5. 浏览器打开`http://127.0.0.1:8085`

## 关键代码

```

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With');

```

第一个是允许请求域名，不解释

第二个是允许的请求方法，POST不解释，options是因为使用fetch接口会先发送options请求验证是否可用，然后再发起请求

第三个是允许的请求头，使用ajax(xhr)上传文件会发送 'X-Requested-With:XMLHttpRequest'的请求头

之后遇到其他跨域问题，可以通过增加二和三来解决。

## 授权

未经许可禁止转载