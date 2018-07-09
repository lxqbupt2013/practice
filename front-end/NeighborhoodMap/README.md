#### 项目启动方法
1. npm install
2. npm start

#### 尚未完成的操作，计划后续有空补上
1. 给fliter按钮绑定一个键盘回车事件
2. 给LocList的li绑定键盘回车事件

#### 有一些疑惑
1. input 和 button 是平级的元素，input绑定了onChange事件，button绑定了onClick事件，结果input的onChange事件会触发button的onClick事件，而点击button则不会触发onClick事件。
2. serviceWorker 的部分基本没懂
3. 维基百科API真的很难用，心疼我浪费在这里的时间


#### 踩了很多坑
1. fetch跨域取数据的问题，无论是将mode设为'cors'或'no-cors'都不好用，最终还是需要服务器端的支持，否则只能用jsonP
2. 关于汉堡图标在不同尺寸屏幕上的表现，用了媒体查询的方式，研究了一些移动屏幕的尺寸
3. 汉堡图标点击后更改父元素类的逻辑，差点就打算去操作DOM，后来还是用state来传递控制值实现
4. 这个项目写了一天半，主要的时间还是花在阅读google map的使用文档上，infoWindow花了很多时间，后来是查看了源码才搞明白