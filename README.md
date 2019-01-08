# 蓥石租赁

## 前提条件
- [Git 1.9+](http://git-scm.com/downloads)
- [nvm 1.1+](https://github.com/creationix/nvm)

### 前提条件 - 环境配置
执行以下命令,确认版本符合前提条件中指定的要求
```SHELL
git --version
nvm version
```

### 前提条件 - node
从 http://coreybutler.github.io/nodedistro/ 查询可供使用的node版本(建议使用node 4.2+)
执行以下命令配置node环境
```SHELL
nvm install 4.2.4
nvm use 4.2.4
nvm on
```

### 前提条件 - 依赖组件
执行以下命令安装依赖组件
```SHELL
npm install
```
提示: 在中国内地可以使用--registry参数来指定taobao的镜像来执行npm组件的安装
```SHELL
npm install -g bower gulp karma-cli --registry=http://registry.npm.taobao.org
npm install --registry=http://registry.npm.taobao.org
```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
## 技术栈
    vue2 + vuex + vue-router + axios + es6 + sass
## 目录结构
```
webpack
 |---build
 |---config
 |---static          #静态资源 images, styles, fonts
 |---src
    |---js       #全局公共libs
    	|---core       #全局公共libs
	        |---directives    #全局指令配置   调用方法 略
	        |---filters       #全局过滤配置   调用方法 略
	        |---utils         #全局libs配置   调用方法 同常量
	            |---baseService.js         #全局service配置   调用方法 略
	            |---dom.js                 #全局dom方法    调用方法 Vue(this)._hyDom[名称]
	            |---event.js               #全局events兼容 调用方法 Vue(this)._hyEvent[名称]
	            |---tool.js                #全局tool配置   调用方法 Vue(this)._hyTool[名称]
        	|---index.js      #libs对外api
        |---libs       #库
        |---mixins     #公共混合类
 	|---components  #组件
 		|---common     		#全局公共组件
 	|---page        #主view
 	|---router      #路由文件
 	|---images      #图标文件
 	|---styles      #sass文件
 		|---vars.scss      #scss变量文件
 		|---mixins.scss    #scss混合文件
 		|---common.scss    #公共文件
 	|---service     #service
 	 	|---baseService
......

  ```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
