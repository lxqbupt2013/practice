#### 请教老师
感谢老师上次的指导！但是我仍然有一个问题：
如果我把mapContent作为state传递，在componentDidMount里生成的话，就不能正确添加ref属性，会报错，参考链接：
https://reactjs.org/warnings/refs-must-have-owner.html
且当点击筛选按钮时，不能正确的更新props和map。

但如果我在render函数中构建mapContent时，又无法setState,会导致Maximum update depth exceeded错误，经搜索查阅资料，在render中是不建议对state直接进行修改的，而是通过事件传递参数在以外修改，比如onClick，但问题是Maker并没有一个类似onLoad之类的事件。

我还没有找到有效的解决办法

#### 项目介绍

优达学城的最后一个项目，用react实现了一个google map相关的应用。

>你将使用 React 构建一个单页应用，为你的社区或你想参观的社区构建一个地图。然后向此应用中添加功能，包括：表示热门地点或你想参观的地点的地图标记，轻松地发现这些地点的搜索功能，以及用于简单地浏览所有地点的列表视图。然后，研究并实现第三方API，用于添加关于每个地点的其他信息（例如街景图片、维基百科文章、Yelp 评论等）。


#### 项目启动方法
1. npm install
2. npm start


#### 尚未完成的操作，计划后续有空补上
1. 给fliter按钮绑定一个键盘回车事件
2. 给LocList的li绑定键盘回车事件


#### 有一些疑惑
1. input 和 button 是平级的元素，input绑定了onChange事件，button绑定了onClick事件，结果input的onChange事件会触发button的onClick事件，而点击button则不会触发onClick事件。


#### 踩了很多坑
1. fetch跨域取数据的问题，无论是将mode设为'cors'或'no-cors'都不好用，最终还是需要服务器端的支持，否则只能用jsonP
2. 关于汉堡图标在不同尺寸屏幕上的表现，用了媒体查询的方式，研究了一些移动屏幕的尺寸
3. 汉堡图标点击后更改父元素类的逻辑，差点就打算去操作DOM，后来还是用state来传递控制值实现
4. 这个项目写了一天半，主要的时间还是花在阅读google map的使用文档上，infoWindow花了很多时间，后来是查看了源码才搞明白