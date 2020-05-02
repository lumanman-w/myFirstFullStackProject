server -- 放 nodejs 代码，包括给后台管理界面 admin 提供的接口和给 web 界面提供的接口

web--前端界面
admin--后台管理界面

## 初始化 node 项目

1、初始化 node

```shell
npm init -y
```

2、生成了 package.json 文件

```json
{
  "name": "server",
  "version": "1.0.0",
  "description": "",
  "main": "index.js" /* 服务端入口文件 */,
  "scripts": {
    /* 自定义脚本 */
    "server": "nodemon index.js" /* node + demon => nodemon */,
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

3、安装 nodemon

```shell
npm i -g nodemon
```

## 创建 vue 项目

```shell
vue create filename
```

组织原生表单的提交

```html
<el-form label-width="120px" @submit.native.prevent="save"></el-form>
```

服务端安装依赖--
express--基于node的web平台开发框架
mongoose--连接数据库
cors--跨域使用

```shell
npm i express@next mongoose cors
```
