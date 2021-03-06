/**
 * 购物车效果
 * @description 基于jquery的购物车效果
 * @author jackwang <wdmzjjm@163.com>
 * @blog http://www.notalent.cn
 * @git https://github.com/IhInspiration/cart
 * @date 2016/8/18 00:30:00
 * @version v1.0.0
 * @params (parabola.defaultParams)
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
 */
var parabola = {
    defaultParams:{
        cart: $("#cart"),
        background: "#1ae0ff",
        borderRadius: "50%",
        originW: 50,
        originH: 50,
        minW: 20,
        minH: 20,
        duration: 1,
        a: -0.002,
        startO: 1,
        endO: 0.4,
        offset: [0, 0],
        callback: function(){
            alert("成功添加到购物车！");
        }
    },
    lastElement: null,
    setParams: function(options){
        options = $.extend({}, this.defaultParams, options);
        if(options.cart.length <= 0){
            alert('无法获取购物车元素，默认为$("#cart")');
            return false;
        }
        options.obj = $("<div></div>");
        $("body").append(options.obj.css({
            "position": "absolute",
            "border-radius": options.borderRadius,
            "background": options.background,
            "width": options.originW + "px",
            "height": options.originH + "px",
            "left": options.offset[0],
            "top": options.offset[1]
        }));
        return options;
    },
    init: function(options) {
        options = this.setParams(options);
        this.a = options.a;
        this.startO = options.startO;
        this.endO = options.endO;
        this.duration = options.duration * 100;
        this.obj = options.obj;
        this.cart = options.cart;
        this.objL = options.offset[0];
        this.objT = options.offset[1];
        this.callback = options.callback;
        this.cartL = this.cart.offset().left;
        this.cartT = this.cart.offset().top;
        this.w = this.obj.width();
        this.h = this.obj.height();
        this.minW = options.minW;
        this.minH = options.minH;
        this.x2 = this.cartL - this.objL;
        this.y2 = this.objT - this.cartT;
        this.b = (this.y2 - this.a * this.x2 * this.x2) / this.x2;
        this.stepX = (this.cartL - this.objL) / this.duration;
        this.stepY = (this.cartT - this.objT) / this.duration;
        this.stepW = (this.w - this.minW) / this.duration;
        this.stepH = (this.h - this.minH) / this.duration;
        this.stepO = (this.startO - this.endO) / this.duration;
        this.x = this.objL;
        this.y = this.objT;
        return this;
    },
    calcY: function(x, a, b){
        return a * x * x + b * x;
    },
    run: function(options){
        if(this.lastElement != null){
            this.lastElement.remove();
        }
        this.init(options);
        this.lastElement = this.obj;
        var that = this;
        var sport = setInterval(function(){
            if(that.objL == that.cartL){
                that.y += that.stepY;
            }else{
                that.x += that.stepX;
                that.y = that.objT - that.calcY(that.x - that.objL, that.a, that.b);
            }
            that.w -= that.stepW;
            that.h -= that.stepH;
            that.startO -= that.stepO;
            that.obj.css({"left": that.x + "px", "top": that.y + "px", "width": that.w, "height": that.h, "opacity": that.startO});
            if(that.objL < that.cartL && that.x >= that.cartL){
                clearInterval(sport);
                that.obj.remove();
                that.callback();
            }else if(that.objL > that.cartL && that.x <= that.cartL){
                clearInterval(sport);
                that.obj.remove();
                that.callback();
            }
        }, 10);
    }
};