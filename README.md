# SvgContainer
基于jQuery和bootstrap实现的svg容器，悬浮菜单放大、缩小、还原、全屏

```javascript
import { SVG } from "svg.js"
let svgContainer = new SVG($("#svgcontainer"));
```
***
*methods:*

1. load（svg,callback）
> 加载svg内容

2. zoomout ()
> 缩小

3. zoomin ()
> 放大

4. repeat ()
> 恢复原始尺寸

5. fullScreen ()
> 全屏

6. exitFullScreen ()
> 退出全屏
