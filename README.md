# dian-wp
点快-微信端

# 开发环境准备

```
cd [dian-wp]
npm install
bower install
```

# 运行调试

```
gulp serve
```

### 主页面
访问: http://127.0.0.1:3000

看到的是angular主页面

(对应线上地址：http://wp.diankuai.cn/)


### 独立页面
访问: http://127.0.0.1:3000/pages/register/index.html?code=[code]&state=[restaurant_openid]

看到的是独立页面（非angular，基于zepto）,是为了让2G网络也能快速打开的取号页面 

(对应线上地址：http://wp.diankuai.cn/register/)

其中：
* [code] - debug模式下随便写就好
* [restaurant_openid] - 需填写餐厅的openid

开发调试环境下，需手动指定以上参数，上线后，以上参数会是微信扫描或者点击菜单后，跳转时附上的参数。

### 调试小工具
额外的，访问：http://127.0.0.1:3001，有个小惊喜

# 目录说明(src)

```
src
├── app
│   ├── components
│   ├── index.js
│   ├── index.scss
│   ├── main
│   └── vendor.scss
├── assets
│   └── images
├── favicon.ico
├── index.html          -- angular主页面
└── pages               -- 非angular的单独页面
    └── register        -- 扫码后取号页面
```


# 编译打包

```
gulp
```

打包后文件位于dist目录下
