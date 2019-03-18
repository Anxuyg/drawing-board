/*必须用id*/
var div = document.getElementById('sss')

autoSetCanvasSize(div) //自动监听canvas画布的变化

listenToUser(div) //执行画笔状态

var lineWidth = 2 //画笔粗细

//必写，获取变量为canvas的二次元上下文
var context = div.getContext('2d')

/*-----------------------------------------------------*/

//橡皮擦 
var eraser = document.getElementById('erase')
var pen = document.getElementById("pen")
var actions = document.getElementById("actions")
var eraserEnables = false
pen.onclick = function() {
    eraserEnables = false
    pen.classList.add('actva')
    eraser.classList.remove('actva')
}
eraser.onclick = function() {
    eraserEnables = true
    eraser.classList.add('actva')
    pen.classList.remove('actva')
}

//清除画板上所有东西
var clear = document.getElementById('clear')
clear.onclick = function() {
    context.clearRect(0, 0, div.width, div.height)
}

//设置画板颜色与点击高亮
var red = document.getElementById('red')
var green = document.getElementById('green')
var blue = document.getElementById('blue')
var black = document.getElementById('black')

black.onclick = function() {
    context.fillStyle = 'black'
    context.strokeStyle = 'black'
    black.classList.add('actvas')
    red.classList.remove('actvas')
    green.classList.remove('actvas')
    blue.classList.remove('actvas')
}
red.onclick = function() {
    context.fillStyle = 'red'
    context.strokeStyle = 'red'
    red.classList.add('actvas')
    black.classList.remove('actvas')
    green.classList.remove('actvas')
    blue.classList.remove('actvas')
}
green.onclick = function() {
    context.fillStyle = 'green'
    context.strokeStyle = 'green'
    green.classList.add('actvas')
    red.classList.remove('actvas')
    blue.classList.remove('actvas')
    black.classList.remove('actvas')
}
blue.onclick = function() {
    context.fillStyle = 'blue'
    context.strokeStyle = 'blue'
    blue.classList.add('actvas')
    green.classList.remove('actvas')
    red.classList.remove('actvas')
    black.classList.remove('actvas')
}

//设置画笔粗细和点击高亮
var thin = document.getElementById('thin')
var thick = document.getElementById('thick')
var thintow = document.getElementById('thintow')
var thinthree = document.getElementById('thinthree')
thin.onclick = function() {
    lineWidth = 2
    thin.classList.add('actvass')
    thintow.classList.remove('actvass')
    thinthree.classList.remove('actvass')
    thick.classList.remove('actvass')
}
thintow.onclick = function() {
    lineWidth = 4
    thintow.classList.add('actvass')
    thin.classList.remove('actvass')
    thinthree.classList.remove('actvass')
    thick.classList.remove('actvass')
}
thinthree.onclick = function() {
    lineWidth = 6
    thinthree.classList.add('actvass')
    thin.classList.remove('actvass')
    thintow.classList.remove('actvass')
    thick.classList.remove('actvass')
}
thick.onclick = function() {
    lineWidth = 10
    thick.classList.add('actvass')
    thin.classList.remove('actvass')
    thintow.classList.remove('actvass')
    thinthree.classList.remove('actvass')
}

//下载
var download = document.getElementById('download')
download.onclick = function() {
        var url = div.toDataURL("image/png")
        var a = document.createElement('a')
        document.body.appendChild(a)
        a.href = url
        a.download = '我的画'
        a.target = '_blank'
        a.click()
    }
    /*--------------------------------------------------*/

function autoSetCanvasSize(div) {
    setCanvasSize() //先调用一次函数
        //.onresize 监听这个函数
    window.onresize = function() {
            setCanvasSize()
        }
        //设置画布宽高 
    function setCanvasSize() {
        //获取页面的宽高
        var pasWidth = document.documentElement.clientWidth
        var pasHeight = document.documentElement.clientHeight

        //给div宽高赋值
        div.width = pasWidth
        div.height = pasHeight
    }
}

/*----------------------------------------------------*/

//圆形制作
function drawCircle(x, y, radius) {
    //开始
    context.beginPath()
    context.arc(x, y, radius, 0, Math.PI * 2)
    context.fill()
}

//让圆跟圆连成一条直线
function drawline(x1, y1, x2, y2) {
    context.beginPath()
    context.moveTo(x1, y1) //起点
    context.lineWidth = lineWidth //线条宽度
    context.lineTo(x2, y2) //终点
    context.stroke()
    context.closePath() //结束
}

/*----------------------------------------------------*/

function listenToUser(div) {

    //imgs确认线条点击状态
    var imgs = false

    //设置lastPaint接收x,y参数
    var lastPaint = {
        x: undefined,
        y: undefined
    }

    //特性检测（检测设备是否是触屏或者pc端）
    if (document.body.ontouchstart !== undefined) {
        //触屏设备
        div.ontouchstart = function(a) {
            //注意：由于是触屏事件
            var x = a.touches[0].clientX
            var y = a.touches[0].clientY
            imgs = true
            if (eraserEnables) {
                context.clearRect(x - 5, y - 5, 10, 10) //清除
            } else {
                // 接收x,y值
                lastPaint = {
                    "x": x,
                    "y": y
                }
            }
        }
        div.ontouchmove = function(a) {
            var x = a.touches[0].clientX
            var y = a.touches[0].clientY
            if (!imgs) {
                return
            }
            if (eraserEnables) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                // 接收x,y值
                newPoint = {
                    "x": x,
                    "y": y
                }
                drawCircle(x, y, 1) //可以删除这行
                drawline(lastPaint.x, lastPaint.y, newPoint.x, newPoint.y)
                lastPaint = newPoint
            }
        }
        div.ontouchend = function(a) {
            imgs = false
        }
    } else {
        // 非触屏设备的pc端
        //点击状态
        div.onmousedown = function(a) {
                var x = a.clientX
                var y = a.clientY
                imgs = true
                if (eraserEnables) {
                    context.clearRect(x - 5, y - 5, 10, 10) //清除
                } else {
                    // 接收x,y值
                    lastPaint = {
                        "x": x,
                        "y": y
                    }
                }
                drawCircle(x, y, 1) //可以删除这行

            }
            //鼠标移动状态
        div.onmousemove = function(a) {
                var x = a.clientX
                var y = a.clientY
                if (!imgs) {
                    return
                }
                if (eraserEnables) {
                    context.clearRect(x - 5, y - 5, 10, 10)
                } else {
                    // 接收x,y值
                    newPoint = {
                        "x": x,
                        "y": y
                    }
                    drawCircle(x, y, 1) //可以删除这行
                    drawline(lastPaint.x, lastPaint.y, newPoint.x, newPoint.y)
                    lastPaint = newPoint
                }
            }
            //鼠标松开状态 
        div.onmouseup = function(a) {
            imgs = false
        }
    }
}
