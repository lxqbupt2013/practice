
### Project Overview

这是一个优达学城的课程浏览器，可以按照分类加载不同的课程列表。


### Catalog Preview

 - css
 icomoon.css: icon引入
 normalize.css: 规范adjust
 style.css: 主样式

 - fonts

 - jasmine
     - lib
     - spec
         - feedreader.js: 测试文件

 - js
   app.js: 主js文件

 - index.html


### Explanation

1. 查看测试的方法： 直接打开index.html，在页面底部显示测试结果。
2. 通过对body添加menu-hidden类和translate3d向页面左侧隐藏区域移动来实现菜单的隐藏。因此通过检测body是否有
   menu-hidden类来测试菜单的隐藏状态是否正确
3. loadFeed函数异步请求来自其他域的数据，因此通过添加done(function)参数保证异步执行完毕后再开始运行测试用例。