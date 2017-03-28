## FE-QA
前端知识点汇总 + demo或分析

### HTML
- 在页面上实现圆形可点击区域
```
1.map+area或者svg
  <img src="image.jpg" usemap="#map" />  
  <map name="map" id="map">
    <area shape="circle" coords="50,50,50" href="http://www.baidu.com" rel="nofollow" target="_blank"/>
  </map>

2.border-radius
  <div class="circle"></div>
  .circle {
    width:100px;
    height:100px;
    border-radius:50%;
  }
  
3.js实现
  document.onclick = function(e) {  
    var r = 50; 
    var x1 = 100;
    var y1 = 100;
    var x2= e.clientX;
    var y2= e.clientY;  
    var distance = Math.abs(Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)));  
    if (distance <= 50)
      alert("Yes!");  
  }
```

- 实现不使用 border 画出1px高的线
```
  <div style="height:1px;overflow:hidden;background:red"></div>
```

### CSS
- css优先级
```
1.根据权重
  !important >  id > class > tag
  !important 高于所有权重，包括内联
2.同权重
  内联样式表（标签内部）> 嵌入样式表（当前文件中）> 外部样式表（外部文件中）
```

- 绝对定位元素的居中（未知宽高）
```
未知容器的宽高，利用 `transform` 属性

 div {
 	position: absolute;
 	height:300px;
 	top: 50%;
 	left: 50%;
 	transform: translate(-50%, -50%);
 	background-color: pink;	

 }
```

- 利用flex水平垂直居中元素
```
利用 flex 布局
 实际使用时应考虑兼容性

 .container {
    display: flex;
    align-items: center; 		/* 垂直居中 */
    justify-content: center;	/* 水平居中 */

   }
 .container div {
    width: 100px;
    height: 100px;
    background-color: pink;
   }  
```
