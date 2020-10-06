// 自执行匿名函数
(function(window, document, undefined) { // 传入window，document对象
var hearts = []; // 定义全局变量hearts，值为空数组

// 定义不同浏览器下的requestAnimationFrame函数实现，如果都没有，则用setTimeout实现
window.requestAnimationFrame = (function() {
    return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
        setTimeout(callback, 1000 / 60);
    }
})();

init(); // 执行初始化函数

// 定义初始化函数
function init() {
    css(".heart{z-index:100000000;width: 10px;height: 10px;position: fixed;background: #f00;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: absolute;}.heart:after{top: -5px;}.heart:before{left: -5px;}"); // 定义要生成的爱心的样式
    attachEvent(); // 添加点击事件（爱心生成）
    gameloop(); // 开始循环移除爱心（内含递归）
}

// 定义循环函数移除生成的爱心
function gameloop() {
    for(var i = 0; i < hearts.length; i++) { // 循环hearts数组
    if(hearts[i].alpha <= 0) { // 如果当前循环的heart对象的透明度为0或小于0
        document.body.removeChild(hearts[i].el); // 从body对象中移除当前循环的heart对象（通过指针）
        hearts.splice(i, 1); // 从heart数组中移除当前循环的heart对象（通过下标）
        continue; // 跳过当前循环，进入下一个循环
    }
    hearts[i].y--; // y轴自减1
    hearts[i].scale += 0.004; // 缩放增加0.004
    hearts[i].alpha -= 0.013; // 透明度减少0.013
    hearts[i].el.style.cssText = "left:" + hearts[i].x + "px;top:" + hearts[i].y + "px;opacity:" + hearts[i].alpha + ";transform:scale(" + hearts[i].scale + "," + hearts[i].scale + ") rotate(45deg);background:" + hearts[i].color;
    }
    requestAnimationFrame(gameloop); // 定时器定时执行，递归
}

// 定义点击事件函数
function attachEvent() {
    var old = typeof window.onclick === "function" && window.onclick;
    window.onclick = function(event) {
        old && old();
        createHeart(event);
    }
}

// 定义创建爱心函数
function createHeart(event) {
    var d = document.createElement("div"); // 创建一个div对象并赋值给变量d
    d.className = "heart"; // 给div对象添加类名
    hearts.push({ // 给hearts数组添加heart对象
        el: d, // div对象
        x: event.clientX - 5, // 鼠标当前位置x轴 - 5
        y: event.clientY - 5, // 鼠标当前位置y轴 - 5
        scale: 1, // 缩放
        alpha: 1, // 透明度
        color: randomColor() // 颜色（随机颜色）
    });
    document.body.appendChild(d); // 添加创建的div对象到body对象
}

// 定义生成样式函数
function css(css) {
    var style = document.createElement("style"); // 创建一个style对象并赋值给变量style
    style.type = "text/css"; // 给style对象添加属性并赋属性值
    try {
        style.appendChild(document.createTextNode(css));
    } catch(ex) {
        style.styleSheet.cssText = css;
    }
    document.getElementsByTagName('head')[0].appendChild(style); // 添加创建的style对象到head对象
}

// 定义生成随机颜色函数
function randomColor() {
    return "rgb(" + (~~(Math.random() * 255)) + "," + (~~(Math.random() * 255)) + "," + (~~(Math.random() * 255)) + ")";
}
})(window, document);
