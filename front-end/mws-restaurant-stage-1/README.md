### 完成的工作
1. 将页面样式设置为响应式
2. 为了便于查看修改了哪些内容，新增加的部分样式添加在new.css文件中。但因为有部分冲突，冲突的少数样式直接在styles.css中修改了
3. 为图片添加了alt属性
4. 添加了focus交互
5. 缓存了来自google的资源相应

### 尚存在的问题
部分带有token认证的google资源无法缓存。尝试自动将network中的request抓取下来，但是js好像做不到

### 项目查看方法
windows系统下运行命令：
- Python 2: python -m SimpleHTTPServer 8000 
- Python 3: python3 -m http.server 8000