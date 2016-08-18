#基于jquery的购物车效果组件

使用方法：parabola.run(obj) obj参数如下：
 *      cart: {*|jQuery|HTMLElement} 购物车（目标）元素 默认：$("#cart")
 *      background {string} 商品元素背景 默认为background: "#1ae0ff"
 *      borderRadius {string} 商品元素圆角 默认：50%
 *      originW: {number} 商品元素原始宽度 默认：50px
 *      originH: {number} 商品元素原始高度 默认：50px
 *      minW: {number} 商品元素结束宽度 默认：20px
 *      minH: {number} 商品元素结束高度 默认：20px
 *      duration: {number} 持续时间(秒) 默认：1s
 *      a: {number} 曲率（y = a * x * x + b * x + c） 默认: -0.002
 *      startO: {number} 商品元素起始透明度 默认：1
 *      endO: {number} 商品元素结束透明度 默认：0.4
 *      offset: {Array} [起始商品left,起始商品top] 默认：[0,0]
 *      callback: {function} parabola.defaultOptions.callback 结束回调函数

很多不足，欢迎大家提出建议！

示例地址：https://ihinspiration.github.io/cart/examples/index.html
